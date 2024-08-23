// src/database/database.ts
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db: Database<sqlite3.Database, sqlite3.Statement>;

export async function initDatabase(): Promise<
  Database<sqlite3.Database, sqlite3.Statement>
> {
  db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS alerts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      website_url TEXT,
      type TEXT,
      description TEXT
    );
  `);

  return db;
}

export function getDatabase(): Database<sqlite3.Database, sqlite3.Statement> {
  return db;
}
