const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./Routes/userRoutes');
const articleRoutes = require('./Routes/articleRoutes');
const testRoutes = require("./Routes/testRouter");
const practiceRoutes = require("./Routes/practieRoutes");
const mixedTests = require("./Routes/mixedTestsRoutes"); // ✅ Faylni to'g'ri chaqirish
const cors = require('cors');

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/test', testRoutes);
app.use('/api/practice', practiceRoutes);
app.use('/api/mixed-tests', mixedTests); // ✅ Route ishlashi uchun to'g'ri ulanish

setInterval(() => fetch('https://historyuz-bot.onrender.com'), 50000);

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{ console.log(`Listening on port ${PORT} `) });
