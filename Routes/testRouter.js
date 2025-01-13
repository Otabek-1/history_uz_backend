const express = require('express');
const { 
    createTestSession, 
    getAllTestSessions, 
    getTestSessionById, 
    addParticipant, 
    addResultsForSession,
    removeParticipants,
} = require('../Models/testModel');
const router = express.Router();
const { protect } = require('../MiddleWares/AuthMiddleware');

// Barcha test sessiyalarni olish
router.get('/', async (req, res) => {
    try {
        const sessions = await getAllTestSessions();
        res.status(200).json({ sessions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Test sessiyalarini olishda xatolik", error: error.message });
    }
});

// Bitta test sessiyasini ID orqali olish
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const session = await getTestSessionById(id);
        if (session) {
            res.status(200).json(session);
        } else {
            res.status(404).json({ message: "Sessiya topilmadi" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Sessiyani olishda xatolik", error: error.message });
    }
});

// Test sessiyasi yaratish
router.post('/add', protect, async (req, res) => {
    const { title, description, authorId, startsAt, endsAt, tests } = req.body;
    try {
        const newSession = await createTestSession(title, description, authorId, startsAt, endsAt, tests);
        res.status(201).json(newSession);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Test sessiyasini yaratishda xatolik", error: error.message });
    }
});

// Qatnashuvchini test sessiyasiga qo'shish
router.post('/:id/participants', protect, async (req, res) => {
    const { id } = req.params;
    const { participantId } = req.body;
    try {
        const updatedSession = await addParticipant(id, participantId);
        res.status(200).json(updatedSession);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Qatnashuvchini qo'shishda xatolik", error: error.message });
    }
});

router.post('/:id/remove', protect, async (req, res) => {
    const { id } = req.params;
    const { participantId } = req.body;
    try {
        const updatedSession = await removeParticipants(id, participantId);
        res.status(200).json(updatedSession);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Qatnashuvchini qo'shishda xatolik", error: error.message });
    }
});

// Natijalarni test sessiyasiga qo'shish
router.post('/:id/results', protect, async (req, res) => {
    const { id } = req.params;
    const  newResults  = req.body;
    try {
        const updatedSession = await addResultsForSession(id, newResults);
        res.status(200).json(updatedSession);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Natijalarni qo'shishda xatolik", error: error.message });
    }
});

module.exports = router;