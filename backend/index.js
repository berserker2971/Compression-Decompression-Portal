const express = require('express');
const cors = require('cors');
const path = require('path');
const fileRoutes = require('./routes/fileRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/downloads/compressed', express.static(path.join(__dirname, 'downloads/compressed')));
app.use('/downloads/decompressed', express.static(path.join(__dirname, 'downloads/decompressed')));


app.use('/api', fileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
