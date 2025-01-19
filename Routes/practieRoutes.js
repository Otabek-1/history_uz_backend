// practieRoutes.js
const express = require("express");
const { grade5Tests } = require("../data/data"); // grade5Tests ni to'g'ri import qilish
const router = express.Router();

const getTests = async (grade5Tests, questionId, questionCount, userId) => {
  const answer = [];

  while (answer.length < questionCount) {
    const randomIndex = Math.floor(Math.random() * grade5Tests.length); // grade5Tests massivining uzunligi
    const test = grade5Tests[randomIndex];
    if (
      !answer.some((a) => a.id === test.id) &&
      test.id !== questionId &&
      test.id !== userId
    ) {
      answer.push(test);
    }
  }
  return answer;
};

router.get("/", async (req, res) => {
  try {
    // query parametrlarini olish
    const questionId = parseInt(req.query.questionId);
    const questionCount = parseInt(req.query.questionCount);
    const userId = parseInt(req.query.userId);

    // getTests funksiyasini chaqirish
    const tests = await getTests(
      grade5Tests,
      questionId,
      questionCount,
      userId
    );
    return res.status(200).json({ tests }); // JSON formatida javob qaytarish
  } catch (error) {
    console.log(error); // xatolikni konsolga chiqarish
    return res.status(500).json({ message: error.message }); // xatolik haqida javob qaytarish
  }
});

module.exports = router; // routeni eksport qilish
