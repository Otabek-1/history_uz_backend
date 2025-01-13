const express = require('express');
const { createUser, getUserByEmail, getUsers, getUserByToken } = require("../Models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // JWT qo'shildi
const router = express.Router();
const { protect } = require('../MiddleWares/AuthMiddleware');

// Token yaratish uchun funksiya
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,  // Environment variable (SECRET)
        { expiresIn: '1h' } // Token muddati 1 soat
    );
};

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await createUser(name, email, password);
        if (user == 'error_user_email') {
            return res.status(400).json({ message: 'Bu email orqali foydalanuvchi mavjud' });
        }
        const token = generateToken(user); // Tokenni yaratish
        return res.status(201).json({ message: 'Foydalanuvchi yaratildi', user, token });
    } catch (error) {
        return res.status(500).json({ message: `${error}` });
    }
});

router.get('/me', protect, async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const user = await getUserByToken(token);
    if (!user) {
        return res.status(401).json({ message: 'Invalid token or user not found' });
    }
    return res.status(200).json({ user });

});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Foydalanuvchini email orqali olish
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
        }

        // Parollarni taqqoslash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Parol noto\'g\'ri' });
        }

        // Tokenni yaratish
        const token = generateToken(user); // Tokenni yaratish
        return res.status(200).json({ message: 'Login muvaffaqiyatli', user, token }); // Tokenni yuborish

    } catch (error) {
        return res.status(500).json({ message: `${error}` });
    }
});

router.get('/users', protect, async (req, res) => {
    try {
        const users = await getUsers();
        return res.status(200).json({ users });
    } catch (error) {
        console.error('Error in /users route:', error.message);
        return res.status(500).json({ message: error.message });
    }
});


module.exports = router;
