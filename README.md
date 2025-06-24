# 🗜️ Data Compression & Decompression Portal

A full-stack web application that enables users to compress and decompress files using popular data compression algorithms. This portal demonstrates the practical efficiency of each algorithm through real-time compression statistics and helps users understand how different algorithms behave with various file types.

This project is ideal for learning how compression works at a systems level and how to build a robust file-handling web app from scratch.

---

## ✨ Key Features

- 📁 **File Upload**  
  Upload any text, binary, or image file for compression or decompression.

- 📦 **Compression Algorithms**  
  Choose from 3 industry-relevant algorithms:
  - **Huffman Coding** (statistical compression)
  - **Run-Length Encoding (RLE)** (pattern-based)
  - **LZ77** (dictionary-based sliding window)

- 📉 **Compression Statistics**  
  For each operation, users can view:
  - Original file size
  - Compressed file size
  - Compression ratio (%)
  - Processing time (in seconds)

- 📥 **Download Options**  
  Users can download compressed or decompressed files directly.

- 🧹 **Clear Functionality**  
  Instantly remove all uploads and downloads with one click.

- 📘 **Algorithm Explanations**  
  Built-in expandable sections that explain how each algorithm works.

- 🎨 **Modern UI**  
  A responsive, animated, dark-themed interface built with React.

---

## 🧠 Algorithm Overview

### 🔢 Huffman Coding
A lossless compression algorithm that builds a binary tree based on the frequency of symbols. Frequently occurring characters use shorter binary codes. Works well for textual data with non-uniform symbol distribution.

### 🔁 Run-Length Encoding (RLE)
Replaces sequences of the same value (e.g., `"AAAA"`) with a value and count (`"A4"`). Best for repetitive data (like simple images or large whitespace).

### 🪟 LZ77
Uses a sliding window to find repeated sequences and replaces them with references to earlier matches. Great for larger and more complex files, especially text.

---

## 🛠 Tech Stack

### Frontend
- ⚛️ React.js
- 🎯 Axios for HTTP requests
- 🎨 Custom CSS (Dark theme)
- 🗂 FileReader API

### Backend
- 🧠 Node.js + Express
- 📦 Multer (file uploads)
- 🧾 Custom algorithm implementations (Huffman, RLE, LZ77)
- 🧱 `fs` module for file I/O

### Hosting
- 🔼 Vercel (Frontend)
- ⚙️ Render (Backend)

---

## 🚀 Live Demo

- 🌐 **Frontend**: [https://compression-decompression-portal-fr.vercel.app/](https://compression-decompression-portal-fr.vercel.app/)  
- 🔧 **Backend**: [https://compression-decompression-portal-backend.onrender.com](https://compression-decompression-portal-backend.onrender.com)  
- 📹 **Demo Video**: [Google Drive / YouTube Link](#)

---

## 🔧 Local Development

### 🧪 Backend

```bash
cd backend
npm install
node index.js
```

> Backend runs at: `http://localhost:5000`

---

### 🎯 Frontend

```bash
cd ../frontend
npm install
npm start
```

> Create a `.env` file in `frontend/`:
```
REACT_APP_API_BASE_URL=http://localhost:5000
```

> Frontend runs at: `http://localhost:3000`

---

## 🧼 Folder Cleanup

To avoid disk space clutter, the portal includes a **"Clear Downloads Folder"** button.  
This removes uploaded, compressed, and decompressed files from the server.

---

## 📁 Folder Structure

```
compression-portal/
├── backend/
│   ├── routes/          # Express routes for upload/decompress/clear
│   ├── utils/           # Huffman, RLE, LZ77 implementations
│   ├── uploads/         # Uploaded raw files
│   ├── downloads/       # Compressed and decompressed files
│   └── index.js         # Main server file
├── frontend/
│   ├── src/
│   │   └── App.js       # React frontend logic
│   ├── public/
│   └── .env             # API base URL
└── README.md
```

---

## 🛤️ Future Improvements

- 🌐 Add multilingual support
- 📊 Visualize compression ratios using Chart.js
- 🗃 Add user history with database (MongoDB)
- 🔐 User authentication (login + saved files)

---


## 🙋 Author

**Sparsh Gautam**  
[GitHub](https://github.com/berserker2971)
