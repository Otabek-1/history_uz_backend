const pool = require('../Config/db');



const createUser = async (name, email, password) => {
    try {
        // Parolni hash qilish
        const hashedPassword =password; // 10 - salt round
        const checkByEmail = await pool.query(`SELECT * FROM users WHERE email = $1`,[email]);

        if(checkByEmail.rowCount > 0) {
            return('error_user_email'); // Agar elektron pochta orqali foydalanuvchi mavjud, xato tashlash
        }
        // Foydalanuvchini yaratish va parolni xavfsiz saqlash
        const result = await pool.query(
            `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
            [name, email, hashedPassword]
        );

        return result.rows[0];
    } catch (error) {
        return error;
    }
};

const getUserByEmail = async (email) => {
    try {
        const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        return result.rows[0]; // Birinchi natijani qaytaradi
    } catch (error) {
        return error; // Xatoni qaytaradi
    }
};

const getUserByToken = async (token) => {
    if (!token) {
      console.error('Token is missing');
      return null;
    }
    
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join('')
      );
      const parsedToken = JSON.parse(jsonPayload);
      const email = parsedToken.email;  // Faqat email ni olamiz
      if (!email) {
        throw new Error('Email not found in token');
      }
  
      const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
      return result.rows[0];  // Foydalanuvchi ma'lumotlarini qaytarish
    } catch (error) {
      console.error('Invalid token or database error', error);
      return null;
    }
  };
  
  
  

const getUsers = async () => {
    try {
        const result = await pool.query(`SELECT * FROM users`);
        if (result.rows.length === 0) {
            throw new Error('Foydalanuvchilar topilmadi'); // Agar foydalanuvchilar bo'lmasa, xato tashlash
        }
        return result.rows;
    } catch (error) {
        console.error('Error getting users:', error.message); // Xatolikni konsolga chiqarish
        throw new Error(error.message); // Xatolikni tashlash
    }
};




module.exports = { createUser, getUserByEmail, getUsers, getUserByToken };