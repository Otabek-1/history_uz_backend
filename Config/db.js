const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://postgres.xqbhpmfdckbdssepvdlp:10010512111111497@aws-0-eu-central-1.pooler.supabase.com:6543/postgres',
    ssl: {
      rejectUnauthorized: false // SSL ulanishini yoqish
    }
  });

// Ulanish holatini tekshirish
pool.connect()
  .then(client => {
    console.log('Ulanish muvaffaqiyatli');
    client.release(); // Ulanishni yopish
  })
  .catch(err => {
    console.error('Ulanishda xato:', err.stack);
  });

module.exports = pool;