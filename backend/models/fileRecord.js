const mongoose = require('mongoose');

const fileRecordSchema = new mongoose.Schema({
  filename: String,
  originalName: String,
  sizeBefore: Number,
  sizeAfter: Number,
  algorithm: String,
  operation: String, // 'compress' or 'decompress'
  timestamp: { type: Date, default: Date.now },
  filePath: String
});

module.exports = mongoose.model('FileRecord', fileRecordSchema);
