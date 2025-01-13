const jwt = require('jsonwebtoken');

// Token yaratish
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email }, // User ma'lumotlarini o'z ichiga olgan payload
        process.env.JWT_SECRET,  // Maxfiy kalit
        { expiresIn: '1h' } // Tokenning muddati 1 soat
    );
};

module.exports = { generateToken };
