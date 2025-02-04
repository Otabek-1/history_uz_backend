const express = require("express");
const { getMixedTests } = require("../Models/mixedTests");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const count = parseInt(req.query.testCount);

    if (isNaN(count) || count <= 0) {
      return res.status(400).json({ message: "Invalid test count" });
    }

    const result = await getMixedTests(count);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error in getMixedTests" });
    console.log(error);
  }
});

module.exports = router; // Routerni eksport qilish
