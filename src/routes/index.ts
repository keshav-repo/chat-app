import { Express } from "express";
import { readdirSync } from "fs";
import { join } from "path";

const routesPath = join(__dirname, ".");

export default (app: Express): void => {
  readdirSync(routesPath).forEach((file) => {
    if (file !== "index.ts" && file.endsWith("Routes.ts")) {
      const route = require(join(routesPath, file)).default;
      app.use("/api", route);
    }
  });
};
