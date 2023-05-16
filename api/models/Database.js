module.exports = class Database {
  constructor(db) {
    this.db = db;
  }

  async query(query, params) {
    return await this.db.query(query, params);
  }
};
