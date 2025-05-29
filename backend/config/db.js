const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'caregiver_db',
    password: 'nova_senha',
    port: 5432,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
