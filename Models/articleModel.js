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
      'INSERT INTO articles (title, content, category, slug, tags, author_id, image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, content, category, slug, tags, authorId, image]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

// Maqolani yangilash
const updateArticle = async (id, title, content, image) => {
  const slug = slugify(title, { lower: true });
  try {
    const result = await pool.query(
      'UPDATE articles SET title = $1, content = $2,  slug = $3,image = $4 WHERE id = $5 RETURNING *',
      [title, content, slug, image, id]
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
    const likes = await pool.query(`SELECT * FROM articles WHERE id = $1`, [id]);
    const arr = likes.rows[0].likes;

    if (arr.includes(userId)) {
      return null;
    }
    arr.push(userId);
    const result = await pool.query(`UPDATE articles SET likes = $1 WHERE id = $2`, [arr, id]);
    return result.rows[0];
  } catch (error) {
    return error;
  }
};

const getArticleById = async (id) => {
  try {
    const result = await pool.query(`SELECT * FROM articles WHERE id = $1`, [id]);
    return result.rows[0];
  } catch (error) {
    return error;
    console.log(error);
  }
}

const deleteArticle = async (id) => {
  try {
    const result = await pool.query(`DELETE * FROM articles WHERE id = $1`, [id]);
    return result;
  } catch (error) {
    console.error('Xatolik:', error);  // console.log o'rniga console.error ishlatiladi.
    return error;  // Buni faqat qaytarishingiz kerak bo'lsa qoldiring.
  }
};


module.exports = {
  getArticles,
  getArticleBySlug,
  createArticle,
  updateArticle,
  updateViews,
  updateLikes,
  upload,
  deleteArticle,
  getArticleById
};
