const pool = require('../Config/db');

// Test sessiyasi yaratish
const createTestSession = async (title, description, authorId, startsAt, endsAt, tests) => {
    try {
        const result = await pool.query(
            `INSERT INTO test_sessions (title, description, participants, starts_at, ends_at, tests)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [
              title, 
              description, 
              "[]",
              startsAt, 
              endsAt, 
              tests, 
            ]
          );
                       
        return result.rows[0];
    } catch (error) {
        console.error("Error in createTestSession: ", error);
        throw new Error(error.message);
    }
};


// Barcha test sessiyalarni olish 
const getAllTestSessions = async () => {
    try {
        const result = await pool.query(`SELECT * FROM test_sessions`);
        return result.rows;
    } catch (error) {
        console.error("Error in getAllTestSessions: ", error);
        throw new Error(error.message);
    }
};

// Bitta test sessiyasini olish (ID bo'yicha)
const getTestSessionById = async (id) => {
    try {
        const result = await pool.query(`SELECT * FROM test_sessions WHERE id = $1`, [id]);
        return result.rows[0];
    } catch (error) {
        console.error("Error in getTestSessionById: ", error);
        throw new Error(error.message);
    }
};

// Qatnashuvchi qo'shish
const addParticipant = async (sessionId, participantId) => {
    try {
        const participants = await pool.query(`SELECT * FROM test_sessions WHERE id = $1`,[sessionId]);
        const arr = participants.rows[0].participants;
        
        if(arr.includes(participantId)){
            return null;
        }
        arr.push(participantId);
        const result = await pool.query(`UPDATE test_sessions SET participants = $1 WHERE id = $2`,[arr, sessionId]);
        return result.rows[0];
    } catch (error) {
        return error.message;
    }
};

const removeParticipants = async (sessionId, participantId) => {
    try {
        const participants = await pool.query(`SELECT * FROM test_sessions WHERE id = $1`,[sessionId]);
        const arr = participants.rows[0].participants;
        
        if(!arr.includes(participantId)){
            return null;
        }
        const filtered = arr.filter(num => num != participantId);
        const result = await pool.query(`UPDATE test_sessions SET participants = $1 WHERE id = $2`,[filtered, sessionId]);
        return result.rows[0];
    } catch (error) {
        return error.message;
    }
};

// Natija qo'shish
const addResult = async (sessionId, name, score) => {
    try {
        const newResult = { name, score };
        const result = await pool.query(
            `UPDATE test_sessions
             SET results = results || $1::jsonb
             WHERE id = $2
             RETURNING *`,
            [JSON.stringify([newResult]), sessionId]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error in addResult: ", error);
        throw new Error(error.message);
    }
};


// Add result object directly from request
const addResultsForSession = async (sessionId, newResults) => {
    try {
        const results = await pool.query(`SELECT* FROM test_sessions WHERE id = $1`,[sessionId]);
        const arr = results.rows[0].results;
        arr.push(newResults);
        const result = await pool.query(`UPDATE test_sessions SET results = $1 WHERE id = $2`,[arr, sessionId]);
        return result.rows[0];
    } catch (error) {
        return error.message;
    }
    
}; 

module.exports = {
    createTestSession,
    getAllTestSessions,
    getTestSessionById,
    addParticipant,
    addResult,
    addResultsForSession,
    removeParticipants,
};
