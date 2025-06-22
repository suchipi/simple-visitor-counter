import "./load-env";
import { app } from "./app";

const PORT = process.env.PORT || 3002;

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log(`Listening on port ${PORT}`);
  }
});
