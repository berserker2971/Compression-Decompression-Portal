# 🗜️ Data Compression & Decompression Portal

A full-stack web application that allows users to upload, compress, and decompress files using various popular algorithms. Built for both learning and utility, this project demonstrates how lossless data compression works and gives users hands-on experience with real-time compression feedback and file handling operations.

This project is ideal for learning how compression works at a systems level and how to build a robust file-handling web app from scratch.

---

## 🚀 Live Demo

- 🌐 Frontend: [https://compression-decompression-portal-fr.vercel.app/](https://compression-decompression-portal-fr.vercel.app/)
- ⚙️ Backend: [https://compression-decompression-portal-backend.onrender.com](https://compression-decompression-portal-backend.onrender.com)
- 🎥 Demo Video: [Google Drive / YouTube](https://youtu.be/Pm5WaJlZUfs)

---

## ✨ Key Features

### 📂 File Upload & Handling
- Users can upload **any type of file** (text, image, binary).
- Uses robust upload handling with validation for empty files or missing algorithm selection.

### 🧠 Multiple Compression Algorithms
- **Huffman Coding**: Frequency-based binary encoding for lossless text compression.
- **Run-Length Encoding (RLE)**: Encodes repetitive patterns into compact form, best for simple image/text data.
- **LZ77**: Uses a sliding window to compress repeated sequences by referencing earlier occurrences.

### 📉 Real-Time Compression Statistics
- See meaningful data post-compression:
  - **Original file size**
  - **Compressed file size**
  - **Compression ratio** (percentage)
  - **Time taken to compress/decompress**
- These stats are displayed live after each operation.

### 📥 Download Processed Files
- Users can instantly download compressed or decompressed files.
- Browser-safe download links, supporting multiple file types.

### 💡 Algorithm Explanations
- Expandable `<details>` sections explain the logic behind each algorithm in simple terms.
- Useful for students and developers curious about how the algorithms differ.

### 🧹 Clear Downloads & Uploads Folder
- A single button on the frontend allows users to delete all uploads, compressed, and decompressed files on the server.
- The button becomes disabled after clearing to avoid accidental clicks.

### 🎨 Modern Responsive UI
- Fully responsive UI built with React.
- Dark theme with clean layout and clear call-to-actions.
- CSS animations and transitions provide a smooth user experience.

### 🛠️ Robust Backend Architecture
- Express.js server with modular route handling (`/upload`, `/decompress`, `/clear-downloads`).
- Uses `Multer` for file handling and `fs` for local disk operations.
- Compression algorithms are modular and built in custom JavaScript files for extensibility.

### 🔐 Safe & Controlled Operations
- Files are never permanently stored.
- The server enforces error handling, feedback on unsupported formats, and validation on every API.

### 🌐 Deployment Ready
- Backend deployed on **Render**
- Frontend deployed on **Vercel**
- Works in production without any additional setup

---

## 🧠 How the Algorithms Work

### 🔢 Huffman Coding
- Builds a binary tree based on symbol frequencies.
- Assigns shorter codes to frequent symbols and longer ones to rare symbols.
- Great for natural language text and any non-uniform character set.

### 🔁 Run-Length Encoding (RLE)
- Encodes repeating sequences as a single value and count.
- Ideal for data with many consecutive repetitions (e.g., `"AAAAA"` → `"A5"`).
- Works well for simple black/white images or structured text data.

### 🪟 LZ77
- Dictionary-based method that looks for recurring data patterns.
- Maintains a "sliding window" to find and replace duplicates with references.
- Works efficiently on large files with recurring sequences.

---

## 🧪 Running Locally
### 1. Clone the Repository

```bash
git clone https://github.com/berserker2971/Compression-Decompression-Portal
cd Compression-Decompression-Portal
```

### 2. Backend

```bash
cd backend
node index.js
```

### 3. Frontend

```bash
cd frontend
npm install -D vite
```

### 4. Edit .env file to 
```bash
VITE_API_BASE_URL=http://localhost:5000
```

### 5. Go back to bash
```bash
npm run build
npm run dev
```
---

## 🧼 Folder Cleanup Feature

The "🧹 Clear Downloads Folder" button removes:
- `/uploads`
- `/downloads/compressed`
- `/downloads/decompressed`

Prevents unnecessary file buildup on the server.

---

## 📁 Project Structure

```
compression-portal/
├── backend/
│   ├── routes/
│   ├── utils/
│   ├── uploads/
│   ├── downloads/
│   └── index.js
├── frontend/
│   ├── public/
│   ├── src/
│   └── App.js
└── README.md
```

---

## 🙋 Author

**Sparsh Gautam**  
[GitHub](https://github.com/berserker2971)  
[LinkedIn](#)
