const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const { rleCompress, rleDecompress } = require('../utils/rle');
const huffman  = require('../utils/huffman');
const lz77 = require('../utils/lz77');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
  const algorithm = req.body.algorithm;
  if (!req.file || !algorithm) {
    return res.status(400).json({ error: 'File or algorithm missing.' });
  }

  const originalPath = req.file.path;
  const originalSize = req.file.size;

  const outputDir = path.join(__dirname, '../downloads/compressed');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const compressedFilename = `${Date.now()}-${algorithm}-${req.file.originalname}.cmp`;
  const compressedPath = path.join(outputDir, compressedFilename);

  try {
    const start = Date.now();

    if (algorithm === 'rle') {
      rleCompress(originalPath, compressedPath);
    } else if (algorithm === 'huffman') {
      huffman.compress(originalPath, compressedPath);
    } else if (algorithm === 'lz77') {
      lz77.compress(originalPath, compressedPath);
    } else {
      return res.status(400).json({ error: 'Unsupported algorithm.' });
    }

    const end = Date.now();
    const processingTime = (end - start) / 1000; // in seconds

    const compressedSize = fs.statSync(compressedPath).size;
    const ratio = ((compressedSize / originalSize) * 100).toFixed(2) + '%';

    res.json({
      message: 'Compression successful',
      algorithm,
      originalName: req.file.originalname,
      originalSize,
      compressedSize,
      ratio,
      processingTime: `${processingTime.toFixed(3)}s`,
      downloadUrl: `/downloads/compressed/${compressedFilename}`,
    });
  } catch (err) {
    console.error('Compression failed:', err);
    res.status(500).json({ error: 'Compression failed.' });
  }
});

router.get('/download-file/:type/:filename', (req, res) => {
  const { type, filename } = req.params;
  const filePath = path.join(__dirname, '..', 'downloads', type, filename);

  res.download(filePath, filename, (err) => { 
    if (err) {
      console.error('Download error:', err);
      res.status(404).send('File not found.');
    }
  });
});

router.post('/decompress', upload.single('file'), async (req, res) => {
  const algorithm = req.body.algorithm;
  if (!req.file || !algorithm) {
    return res.status(400).json({ error: 'File or algorithm missing.' });
  }

  const inputPath = req.file.path;
  const outputDir = path.join(__dirname, '../downloads/decompressed');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  const outputFilename = `${Date.now()}-${algorithm}-${req.file.originalname.replace('.cmp', '')}`;
  const outputPath = path.join(outputDir, outputFilename);

  try {
    const start = Date.now();

    if (algorithm === 'rle') {
      rleDecompress(inputPath, outputPath);
    } else if (algorithm === 'huffman') {
      huffman.decompress(inputPath, outputPath);
    } else if (algorithm === 'lz77') {
      lz77.decompress(inputPath, outputPath);
    } else {
      return res.status(400).json({ error: 'Unsupported algorithm for decompression.' });
    }
    const decompressedSize = fs.statSync(outputPath).size;
    const end = Date.now();
    const processingTime = (end - start) / 1000;

    res.json({
      message: 'Decompression successful',
      algorithm,
      processingTime: `${processingTime.toFixed(3)}s`,
      downloadUrl: `/downloads/decompressed/${outputFilename}`,
    });
  } catch (err) {
    console.error('Decompression failed:', err);
    res.status(500).json({ error: 'Decompression failed.' });
  }

});

router.post('/clear-downloads', async (req, res) => {
  const folders = [
    path.join(__dirname, '../uploads'),
    path.join(__dirname, '../downloads/compressed'),
    path.join(__dirname, '../downloads/decompressed')
  ];

  try {
    folders.forEach(folder => {
      if (fs.existsSync(folder)) {
        fs.readdirSync(folder).forEach(file => {
          fs.unlinkSync(path.join(folder, file));
        });
      }
    });

    res.json({ message: 'Uploads and downloads.' });
  } catch (err) {
    console.error('Failed to clear downloads/uploads:', err);
    res.status(500).json({ error: 'Failed to clear files.' });
  }
});


module.exports = router;