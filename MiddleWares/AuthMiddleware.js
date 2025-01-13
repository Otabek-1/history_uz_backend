const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/jwt'); // Token yaratish uchun funksiya (agarda alohida faylda bo'lsa)

const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Authorization header formatini tekshirish

    if (!token) {
        return res.status(401).json({ message: 'Token taqdim etilmadi' });
    }

    try {
        // Tokenni tekshirish
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // Har safar yangi token yaratish
        const newToken = generateToken(req.user); // Yangi tokenni yaratish

        // Yangi tokenni javobda yuborish
        res.setHeader('Authorization', `Bearer ${newToken}`); // Yangi tokenni headerda yuborish

        next(); // Keyingi middleware yoki route handlerga o'tish
    } catch (error) {
        return res.status(401).json({ message: `Token noto'g'ri yoki muddati o'tgan. Error: ${error}` });
    }
};

module.exports = { protect };
