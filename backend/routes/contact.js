const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { sendContactMail } = require('../utils/mailer');

// POST /contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Semua field wajib diisi.' });
    }
    const contact = new Contact({ name, email, message });
    await contact.save();
    // Kirim email ke admin
    await sendContactMail({ name, email, message });
    res.status(201).json({ success: true, message: 'Pesan berhasil dikirim.' });
  } catch (err) {
    console.error('Gagal menyimpan pesan kontak:', err);
    res.status(500).json({ error: 'Terjadi kesalahan server.' });
  }
});

module.exports = router;
