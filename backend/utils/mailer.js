const nodemailer = require('nodemailer');

// Konfigurasi transporter Gmail
// GANTI 'MASUKKAN_APP_PASSWORD_ANDA_DI_SINI' DENGAN APP PASSWORD YANG ANDA BUAT DI GOOGLE
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'majuberkahsantosa@gmail.com',
    pass: 'dpqy tueb plkt ezni' // <-- GANTI DI SINI
  }
});

/**
 * Kirim email kontak
 * @param {Object} param0
 * @param {string} param0.name
 * @param {string} param0.email
 * @param {string} param0.message
 */
async function sendContactMail({ name, email, message }) {
  await transporter.sendMail({
    from: 'majuberkahsantosa@gmail.com',
    to: 'majuberkahsantosa@gmail.com',
    replyTo: email,
    subject: `Pesan Kontak Website dari ${name}`,
    html: `<p><b>Nama:</b> ${name}<br/><b>Email:</b> ${email}<br/><b>Pesan:</b><br/>${message}</p>`
  });
}

module.exports = { sendContactMail };
