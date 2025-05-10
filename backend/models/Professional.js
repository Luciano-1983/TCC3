const db = require('../config/db');

class Professional {
  static async create({ nome, email, senha, telefone, cidade, especialidade, registro }) {
    const query = `
      INSERT INTO profissionais (nome, email, senha, telefone, cidade, especialidade, registro)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`;
    const values = [nome, email, senha, telefone, cidade, especialidade, registro];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM profissionais WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT * FROM profissionais WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async authenticate(email, senha) {
    const query = 'SELECT * FROM profissionais WHERE email = $1 AND senha = $2';
    const result = await db.query(query, [email, senha]);
    return result.rows[0];
  }
}

module.exports = Professional;

