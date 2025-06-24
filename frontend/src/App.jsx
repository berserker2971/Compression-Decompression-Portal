import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [file, setFile] = useState(null);
  const [algorithm, setAlgorithm] = useState('huffman');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const [compressedFile, setCompressedFile] = useState(null);
  const [decompressed, setDecompressed] = useState(null);
  const [decompError, setDecompError] = useState('');
  
  const [downloadsCleared, setDownloadsCleared] = useState(false);

  const handleUpload = async () => {
    if (!file) return setError('Please select a file');
    setError('');
    setResponse(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('algorithm', algorithm);

    try {
      const res = await axios.post(`${API_BASE}/api/upload`, formData);
      setResponse(res.data);
    } catch (err) {
      console.error(err);
      setError('Upload failed. Please try again.');
    }
  };

  const handleDecompress = async () => {
    if (!compressedFile) return setDecompError('Please select a compressed file');
    setDecompError('');
    setDecompressed(null);

    const formData = new FormData();
    formData.append('file', compressedFile);
    formData.append('algorithm', algorithm);

    try {
      const res = await axios.post(`${API_BASE}/api/decompress`, formData);
      setDecompressed(res.data);
    } catch (err) {
      console.error(err);
      setDecompError('Decompression failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>🗜️ Data Compression & Decompression Portal</h1>

      <section>
        <h2>Compress File</h2>
        <label>Select a file</label>
        <input type="file" onChange={(e) => {
          setFile(e.target.files[0]);
          setDownloadsCleared(false);
        }} />
        <label>Compression Algorithm</label>
        <select onChange={(e) => setAlgorithm(e.target.value)} value={algorithm}>
          <option value="huffman">Huffman</option>
          <option value="rle">Run-Length Encoding (RLE)</option>
          <option value="lz77">LZ77</option>
        </select>
        <button onClick={handleUpload}>Compress</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {response && (
          <div className="status-box">
            <p><strong>✅ Compression successful!</strong></p>
            <p>Original Size: {response.originalSize} bytes</p>
            <p>Compressed Size: {response.compressedSize} bytes</p>
            <p>Compression Ratio: {response.ratio}</p>
            <p>Processing Time: {response.processingTime}</p>
            <a
              href={`${API_BASE}${response.downloadUrl}`}
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Compressed File
            </a>
          </div>
        )}
      </section>

      <section>
        <h2>Decompress File</h2>
        <label>Select a compressed file</label>
        <input type="file" onChange={(e) => {
          setCompressedFile(e.target.files[0]);
          setDownloadsCleared(false);
        }} />
        <label>Decompression Algorithm</label>
        <select onChange={(e) => setAlgorithm(e.target.value)} value={algorithm}>
          <option value="huffman">Huffman</option>
          <option value="rle">Run-Length Encoding (RLE)</option>
          <option value="lz77">LZ77</option>
        </select>
        <button onClick={handleDecompress}>Decompress</button>

        {decompError && <p style={{ color: 'red' }}>{decompError}</p>}
        {decompressed && (
          <div className="status-box">
            <p><strong>✅ Decompression successful!</strong></p>
            <p>Processing Time: {decompressed.processingTime}</p>
            <a
              href={`${API_BASE}${decompressed.downloadUrl}`}
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Decompressed File
            </a>
          </div>
        )}
      </section>

      <hr style={{ margin: '2rem 0' }} />
      <div style={{ marginBottom: '2rem' }}>
        <button
          style={{
            backgroundColor: downloadsCleared ? '#5cb85c' : '#d9534f',
            cursor: downloadsCleared ? 'not-allowed' : 'pointer'
          }}
          disabled={downloadsCleared}
          onClick={async () => {
            if (downloadsCleared) return;
            try {
              const res = await axios.post(`${API_BASE}/api/clear-downloads`);
              alert(res.data.message);
              setDownloadsCleared(true);
            } catch (err) {
              alert('Failed to clear downloads');
            }
          }}
        >
          {downloadsCleared ? '✅ Already Cleared' : '🧹 Clear Downloads Folder'}
        </button>
      </div>

      <h2>🧠 How the Algorithms Work</h2>

      <details style={{ marginBottom: '1rem' }}>
        <summary><strong>Huffman Coding</strong></summary>
        <p style={{ marginTop: '0.5rem' }}>
          Huffman coding is a lossless data compression algorithm that assigns variable-length binary codes to characters based on their frequencies.
          More frequent characters use shorter codes, which leads to better compression.
        </p>
      </details>

      <details style={{ marginBottom: '1rem' }}>
        <summary><strong>Run-Length Encoding (RLE)</strong></summary>
        <p style={{ marginTop: '0.5rem' }}>
          RLE works by replacing sequences of the same value (like "AAAA") with a single value and count (like "A4").
          It's simple and efficient for data with lots of repetition.
        </p>
      </details>

      <details style={{ marginBottom: '1rem' }}>
        <summary><strong>LZ77</strong></summary>
        <p style={{ marginTop: '0.5rem' }}>
          LZ77 replaces repeated occurrences of data with references to a previous occurrence. It uses a sliding window and look-ahead buffer
          to find and encode repeated patterns efficiently.
        </p>
      </details>
    </div>
  );
}

export default App;
