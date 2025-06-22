import "./load-env";
import * as repl from "node:repl";
import { db } from "./db";

globalThis.db = db;

repl.start("> ").on("close", () => {
  db.persistence.stopAutocompaction();
});
