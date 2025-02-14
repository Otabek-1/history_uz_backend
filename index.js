const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const userRoutes = require('./Routes/userRoutes');
const articleRoutes = require('./Routes/articleRoutes');
const testRoutes = require("./Routes/testRouter");
const practiceRoutes = require("./Routes/practieRoutes");
const mixedTests = require("./Routes/mixedTestsRoutes");
const { dailyCompetition } = require("./data/data.js");
// PostgreSQL ulanishi (pool allaqachon mavjud deb faraz qilamiz)
const pool = require('./Config/db');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/test', testRoutes);
app.use('/api/practice', practiceRoutes);
app.use('/api/mixed-tests', mixedTests);

/**
 * Email jo‘natish funksiyasi
 * @param {string} toEmail - Qabul qiluvchi email
 * @param {string} code - Jo‘natiladigan tasdiqlash kodi
 */
async function sendEmail(toEmail, code) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "burhonovotabek5@gmail.com", // ⚠️ O‘zgartiring
            pass: "qopr lrub afci mysp"     // ⚠️ O‘zgartiring (Gmail App Password ishlating)
        },
    });

    const mailOptions = {
        from: 'burhonovotabek5@gmail.com', // ⚠️ O‘zgartiring
        to: toEmail,
        subject: 'Parol tiklash uchun kod',
        text: `Sizning parolni tiklash uchun kodingiz: ${code}`
    };

    return transporter.sendMail(mailOptions);
}

/**
 * Emailga kod yuborish va 2 daqiqalik cheklov bilan saqlash
 * @param {string} email - Foydalanuvchi email manzili
 */
async function sendCode(email) {
    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6 xonali kod
    const currentTime = new Date();
    const twoMinutesAgo = new Date(currentTime.getTime() - 2 * 60 * 1000);

    try {
        const info = await pool.query(`SELECT * FROM sent_codes WHERE email = $1`, [email]);

        if (info.rowCount > 0) {
            const createdAt = new Date(info.rows[0].created_at);
            if (createdAt > twoMinutesAgo) {
                return { success: false, message: "Kod allaqachon yuborilgan, qayta yuborish uchun 2 daqiqa kuting!" };
            }
            await pool.query(`UPDATE sent_codes SET code = $1, created_at = $2 WHERE email = $3`, [generatedCode, currentTime, email]);
        } else {
            await pool.query(`INSERT INTO sent_codes (email, code, created_at) VALUES ($1, $2, $3)`, [email, generatedCode, currentTime]);
        }

        await sendEmail(email, generatedCode);
        return { success: true, message: "Kod yuborildi!" };
    } catch (error) {
        return { success: false, message: "Xatolik yuz berdi", error };
    }
}

// 📌 Kod jo‘natish endpointi
app.post("/send-code", async (req, res) => {
    const { email } = req.body;
    try {
        const response = await sendCode(email);
        res.json(response);
    } catch (error) {
        res.status(500).json({ success: false, message: "Xatolik yuz berdi", error });
    }
});

app.post("/check-code", async (req, res) => {
    const { email, code } = req.body;

    try {
        const result = await pool.query(`SELECT * FROM sent_codes WHERE email = $1`, [email]);

        if (result.rowCount === 0) {
            return res.status(400).json({ message: "Kod topilmadi yoki eskirgan" });
        }

        if (result.rows[0].code === code) {
            await pool.query(`DELETE FROM sent_codes WHERE email = $1`, [email]);
            return res.status(200).json({ success: true, message: "Kod to‘g‘ri" });
        } else {
            return res.status(400).json({ success: false, message: "Kod noto‘g‘ri" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server xatosi", error });
    }
});

app.put('/change-password', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Foydalanuvchini topish
        const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

        if (user.rowCount === 0) {
            return res.status(400).json({ success: false, message: "Foydalanuvchi topilmadi" });
        }

        // 2. Parolni yangilash
        await pool.query(`UPDATE users SET password = $1 WHERE email = $2`, [password, email]);

        return res.status(200).json({ success: true, message: "Parol muvaffaqiyatli o'zgartirildi" });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server xatosi", error });
    }
});

app.put('/daily-participate', async (req, res) => {
    try {
        const { id } = req.body;

        // Foydalanuvchini bazadan olish
        const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);

        if (user.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Foydalanuvchi topilmadi' });
        }

        let ticket = user.rows[0].ticket;

        // Ticket yetarli ekanligini tekshirish
        if (ticket <= 0) {
            return res.status(400).json({ success: false, message: 'Sizda ticket qolmagan' });
        }

        // Ticketni kamaytirish
        const result = await pool.query(`UPDATE users SET ticket = ticket - 1 WHERE id = $1 RETURNING ticket`, [id]);

        // Yangilangan ticket qiymatini olish
        if (result.rowCount > 0) {
            return res.status(200).json({ success: true, message: 'Sizning ticketingiz yangilandi', ticket: result.rows[0].ticket });
        } else {
            return res.status(500).json({ success: false, message: 'Server xatosi' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Ichki server xatosi' });
    }
});

app.put('/add-ticket',async(req,res)=>{
    const { id, tgid } = req.body;
    const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    const inviteds= user.invited;
    if(user.rows.length === 0 ){
        if(inviteds.includes(tgid)){
            return res.status(400).json({ success: false, message: 'Foydalanuvchi mavjud!' });
        }
        return res.status(404).json({ success: false, message: 'Foydalanuvchi topilmadi' });
    }
    const result = await pool.query(`UPDATE users SET ticket = ticket + 1 WHERE id = $1 RETURNING ticket`, [id]);
    if(result.rowCount > 0){
        await pool.query(`UPDATE users SET invited = $1 WHERE id = $2`, [inviteds.push(tgid), tgid]);
        return res.status(200).json({ success: true, message: 'Sizning ticketingiz yangilandi', ticket: result.rows[0].ticket });
    }
})


app.get('/daily-compet-question', (req, res) => {
    const question = dailyCompetition[Math.floor(Math.random() * dailyCompetition.length)];
    return res.status(200).json(question);
})

app.post('/daily-result', async (req,res)=>{
    const {uid,name, result} = req.body;
    try {
        const user = await pool.query(`SELECT * FROM daily_results WHERE user_id = ${uid}`);
        if(user.rowCount > 0){
            await pool.query(`UPDATE daily_results SET result = $1 WHERE user_id = $2`, [result, uid]);
        } else {
            await pool.query(`INSERT INTO daily_results (user_id, name, result) VALUES ($1, $2, $3)`, [uid, name, result]);
        }
        return res.status(200).json({success: true, message: "Natija muvaffaqiyatli saqlandi"});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }    
})




// Botni aktiv saqlash uchun request jo‘natish (30 soniyada bir marta)
setInterval(() => fetch('https://historyuz-bot.onrender.com'), 30000);

// Test API
app.get('/test', (req, res) => {
    res.send('API is working');
});

// Serverni ishga tushirish
const PORT = 7000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
