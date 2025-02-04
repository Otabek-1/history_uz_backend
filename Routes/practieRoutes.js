// practieRoutes.js
const express = require("express");
const { getTests } = require("../data/data"); // grade5Tests ni to'g'ri import qilish
const router = express.Router();



router.get("/", async (req, res) => {
  try {
    const questionId = parseInt(req.query.id);
    const questionCount = parseInt(req.query.testCount);
    const themes = req.query.themes ? req.query.themes.split(':').map(Number) : []; // Split and convert to numbers
    const userId = parseInt(req.query.userId);

    console.log(`Themes: ${themes}`); // Check the themes in the console

    const tests = await getTests(
      getTests,
      questionId,
      questionCount,
      userId,
      themes // Pass themes to the function
    );
    return res.status(200).json({ tests });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});



module.exports = router; // routeni eksport qilish
