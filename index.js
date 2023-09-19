const express = require('express');
const app = express();
const port = 3000;

// import route posts
const mahasiswaRouter = require('./routes/mahasiswa'); // sesuaikan path dengan lokasi file mahasiswa.js

// Gunakan mahasiswaRouter, bukan mhsRouter
app.use('/api/mhs', mahasiswaRouter);

// listen express.js kedalam port
app.listen(port, () => {
    console.log(`aplikasi akan berjalan di http://localhost:${port}`);
});
