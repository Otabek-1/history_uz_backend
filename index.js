// STARTING PROGRAMM
const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./Routes/userRoutes');
const articleRoutes = require('./Routes/articleRoutes');
const testRoutes = require("./Routes/testRouter");
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{ console.log(`Listening on port ${PORT} `) });