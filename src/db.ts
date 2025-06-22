import Datastore from "nedb";
import path from "node:path";

const DB_FILE_PATH =
  process.env.DB_FILE_PATH || path.join(process.cwd(), "./dbdata.jsonl");

export const db = new Datastore({
  filename: DB_FILE_PATH,
  autoload: true,
});

db.persistence.setAutocompactionInterval(24 * 60 * 60 * 1000);

db.ensureIndex({ fieldName: "name", unique: true }, (err) => {
  if (err) {
    console.error("db.ensureIndex failed:", err);
    process.exit(1);
  }
});
