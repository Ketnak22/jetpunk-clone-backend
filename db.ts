import sqlite3 from 'sqlite3';

const db = new sqlite3.Database("./db.db", (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to SQLite database.');
    }
});

function addMapToDb(name: string, jsonFilename: string, svgFilename: string) {
    db.run("INSERT INTO games (name, type, json_filename, svg_filename) VALUES (?, 'map', ?, ?)", [name, jsonFilename, svgFilename])
}   

export { addMapToDb };

/*
CREATE TABLE games (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(10) NOT NULL,
  json_filename VARCHAR(100) NOT NULL,
  svg_filename VARCHAR(100)
);
*/