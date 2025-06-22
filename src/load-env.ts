import fs from "node:fs";
import path from "node:path";
import * as dotenv from "dotenv";

const dotEnvPath = process.env.DOTENV_PATH || path.join(process.cwd(), ".env");
if (fs.existsSync(dotEnvPath)) {
  const content = fs.readFileSync(dotEnvPath);
  const vars = dotenv.parse(content);
  Object.assign(process.env, vars);
}
