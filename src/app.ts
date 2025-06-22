import express from "express";
import nocache from "nocache";
import cors from "cors";
import { db } from "./db";

export const app = express();

app.use(nocache());
app.use(cors());

app.use((req, res, next) => {
  res.contentType("text/javascript");
});

app.get("/counter/:name", (req, res, next) => {
  const name = req.params.name;
  db.findOne({ name }, (err, doc) => {
    if (err) {
      next(err);
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

    res.status(200).send(
      `if (document.currentScript) document.currentScript.replaceWith(document.createTextNode(${JSON.stringify(
        // count + 1 cause it's about to get incremented
        String(count + 1)
      )}));`
    );
  });
});

// Fallback
app.use((req, res, next) => {
  res.status(404).send("throw new Error('404 not found');");
  res.end();
  next();
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
    res.status(500).send("throw new Error('500 internal server error');");
    next();
  }
);
