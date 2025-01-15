const pool = require('../Config/db');
const slugify = require('slugify');
const multer = require('multer');
const path = require('path');


// Faylni saqlash uchun konfiguratsiya
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Fayllar 'uploads' papkasiga saqlanadi
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Fayl nomini o'zgartiramiz
  },
});
const upload = multer({ storage: storage });

// Barcha maqolalarni olish
const getArticles = async () => {
  try {
    const result = await pool.query('SELECT * FROM articles');
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ID bo'yicha maqolani olish
const getArticleBySlug = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM articles WHERE slug = $1', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

// Yangi maqola yaratish
const createArticle = async (title, content, authorId, image) => {
  const slug = slugify(title, { lower: true });
  try {
    const result = await pool.query(
      'INSERT INTO articles (title, content , author_id, image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, content, authorId, image]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

// Maqolani yangilash
const updateArticle = async (id, title, content, category, tags, authorId, image) => {
  const slug = slugify(title, { lower: true });
  try {
    const result = await pool.query(
      'UPDATE articles SET title = $1, content = $2, category = $3, slug = $4, tags = $5, image = $6 WHERE id = $7 AND author_id = $8 RETURNING *',
      [title, content, category, slug, tags, image, id, authorId]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

// Viewsni yangilash
const updateViews = async (id) => {
  try {
    const result = await pool.query(
      'UPDATE articles SET views = views + 1 WHERE id = $1 RETURNING views',
      [id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

// Likesni yangilash
const updateLikes = async (id, userId) => {
    try {
        const likes = await pool.query(`SELECT * FROM articles WHERE id = $1`,[id]);
        const arr = likes.rows[0].likes;
        
        if(arr.includes(userId)){
            return null;
        }
        arr.push(userId);
        const result = await pool.query(`UPDATE articles SET likes = $1 WHERE id = $2`,[arr, id]);
        return result.rows[0];        
    } catch (error) {
        return error;
    }
  };
  

module.exports = { 
  getArticles, 
  getArticleBySlug, 
  createArticle, 
  updateArticle, 
  updateViews, 
  updateLikes, 
  upload 
};
