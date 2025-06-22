import express from "express";
import nocache from "nocache";
import cors from "cors";
import { db } from "./db";

export const app = express();

app.use(nocache());
app.use(cors());

app.get("/counter/:name", (req, res, next) => {
  const name = req.params.name;
  db.findOne({ name }, (err, doc) => {
    if (err) {
      next(err);
      return;
    }
    if (doc == null) {
      res
        .status(404)
        .contentType("text/javascript")
        .send(`throw new Error('No such counter:', ${JSON.stringify(name)});`);
      return;
    }
    const count = doc.count;
    if (!Number.isInteger(count)) {
      next(new Error("count is non-numeric"));
    }

    db.update({ name }, { $inc: { count: 1 } }, {}, (err) => {
      if (err) {
        next(err);
      }
    });

    res
      .status(200)
      .contentType("text/javascript")
      .send(
        `if (document.currentScript) document.currentScript.replaceWith(document.createTextNode(${JSON.stringify(
          // count + 1 cause it's about to get incremented
          String(count + 1)
        )}));`
      );
  });
});

// Fallback
app.use((req, res, next) => {
  res
    .status(404)
    .contentType("text/javascript")
    .send("throw new Error('404 not found');");
});

// Error handler
app.use(
  (
    err: Error,
    req: express.Request<any>,
    res: express.Response<any>,
    next: express.NextFunction
  ) => {
    console.error(err);
    res
      .status(500)
      .contentType("text/javascript")
      .send("throw new Error('500 internal server error');");
  }
);
