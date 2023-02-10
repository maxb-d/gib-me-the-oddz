const sqlite3 = require('sqlite3')
const path = require('path')

const db_name = path.join(__dirname, ".." , "data", "universe.db");
const db = new sqlite3.Database(db_name, err => {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Connexion réussie à la base de données ${path.basename(db_name)}`);
  });

module.exports = db