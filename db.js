// db.js
const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'2004',
    database:'apiquarta'
}).promise(); // ← ESSENCIAL para usar async/await

module.exports = conexao;
