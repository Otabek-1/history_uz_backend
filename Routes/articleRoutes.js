const express = require('express');
const multer = require('multer');
const { getArticles, getArticleById, getArticleBySlug, getNewestArticles, createArticle, updateArticle, deleteArticle, updateViews, updateLikes } = require('../Models/articleModel');
const { protect } = require('../MiddleWares/AuthMiddleware');
const router = express.Router();

// Multer configuration for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the folder to store images
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Naming convention for files
    }
});

const upload = multer({ storage: storage });

// Barcha maqolalarni olish
router.get('/', async (req, res) => {
    try {
        const articles = await getArticles();
        return res.status(200).json({ articles });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Ma'lum bir maqolani ID orqali olish
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const article = await getArticleById(id);
        if (!article) {
            return res.status(404).json({ message: 'Maqola topilmadi' });
        }
        return res.status(200).json({ article });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Slug orqali maqolani olish
router.get('/slug/:slug', async (req, res) => {
    const { slug } = req.params;
    try {
        const article = await getArticleBySlug(slug);
        if (!article) {
            return res.status(404).json({ message: 'Maqola topilmadi' });
        }
        return res.status(200).json({ article });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Yangi maqola yaratish (faqat autentifikatsiya qilingan foydalanuvchilar uchun)
router.post('/', protect, upload.single('image'), async (req, res) => {
    const { title, content, author_id } = req.body;
    const userId = author_id;
    const image = req.file ? req.file.path : null; // Image path if image is uploaded

    try {
        const newArticle = await createArticle(title, content, userId, image);
        return res.status(201).json({ message: 'Maqola yaratildi', article: newArticle });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Maqolani yangilash (faqat autentifikatsiya qilingan foydalanuvchilar uchun)
router.put('/:id', protect, upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { title, content, category, tags } = req.body;
    const userId = req.user.id;
    const image = req.file ? req.file.path : null; // Image path if image is uploaded

    try {
        const updatedArticle = await updateArticle(id, title, content, category, tags, userId, image);
        if (!updatedArticle) {
            return res.status(404).json({ message: 'Maqola topilmadi yoki yangilashda xato' });
        }
        return res.status(200).json({ message: 'Maqola yangilandi', article: updatedArticle });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Maqolani o'chirish (faqat autentifikatsiya qilingan foydalanuvchilar uchun)
router.delete('/:id', protect, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const deletedArticle = await deleteArticle(id, userId);
        if (!deletedArticle) {
            return res.status(404).json({ message: 'Maqola topilmadi yoki o\'chirishda xato' });
        }
        return res.status(200).json({ message: 'Maqola o\'chirildi', article: deletedArticle });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Viewsni yangilash
router.patch('/:id/views', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedViews = await updateViews(id);
        return res.status(200).json({ message: 'Views yangilandi', views: updatedViews });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Likesni yangilash
router.patch('/:id/likes', protect, async (req, res) => {
    const { id } = req.params;
    const {userId} = req.body;

    try {
        const updatedLikes = await updateLikes(id, userId);
        return res.status(200).json({ message: 'Likes yangilandi', likes: updatedLikes });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
