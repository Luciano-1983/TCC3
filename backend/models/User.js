const db = require('../config/db');

class User {
    static async create({ nome, email, senha }) {
        const query = 'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *';
        const values = [nome, email, senha];
        const result = await db.query(query, values);
        return result.rows[0];
    }

    static async findByEmail(email) {
        const query = 'SELECT * FROM usuarios WHERE email = $1';
        const result = await db.query(query, [email]);
        return result.rows[0];
    }

    static async findById(id) {
        const query = 'SELECT * FROM usuarios WHERE id = $1';
        const result = await db.query(query, [id]);
        return result.rows[0];
    }

    static async authenticate(email, senha) {
        const query = 'SELECT * FROM usuarios WHERE email = $1 AND senha = $2';
        const result = await db.query(query, [email, senha]);
        return result.rows[0];
    }
}

module.exports = User;
