import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";

const config: SqliteConnectionOptions = {
  type: "sqlite",
  database: "db",
  entities: ["dist/src/repository/**/*.entity.js"],
  synchronize: true, // turn off for prod, use migrations instead
};

export default config;
