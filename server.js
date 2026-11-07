const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware agar add-on bisa diakses dari aplikasi luar
app.use(cors());
app.use(express.json());

// 1. Endpoint Manifest (Informasi Add-on ke BitChord)
app.get('/manifest.json', (req, res) => {
    res.json({
        id: "com.custom.hires.lossless",
        name: "Lossless Hi-Res Source",
        version: "1.0.0",
        description: "Add-on penyedia lagu FLAC & Hi-Res Lossless untuk BitChord",
        types: ["music"]
    });
});

// 2. Endpoint Health Check
app.get('/ping', (req, res) => {
    res.status(200).send('OK');
});

// 3. Endpoint Resolve Track (Pencarian & URL Streaming Audio)
app.get('/resolve', async (req, res) => {
    const { title, artist } = req.query;

    if (!title) {
        return res.status(400).json({ error: "Parameter 'title' wajib diisi." });
    }

    try {
        // Ganti URL audio di bawah ini dengan tautan direct link (.flac) milik Anda
        return res.json({
            status: "success",
            match: true,
            track: {
                title: title,
                artist: artist || "Unknown Artist",
                format: "FLAC",
                quality: "24-bit/96kHz",
                url: "https://example.com/stream/sample-audio.flac"
            }
        });
    } catch (error) {
        console.error("Error pada resolve:", error);
        return res.status(500).json({ error: "Gagal mengambil data audio lossless." });
    }
});

// Jalankan Server
app.listen(PORT, () => {
    console.log(`Add-on server BitChord aktif pada port ${PORT}`);
});
