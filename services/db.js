const Sequelize = require('sequelize');

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:binh0968101798@localhost:5432/doanweb'
const db = new Sequelize(connectionString);

module.exports = db;