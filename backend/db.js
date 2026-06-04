// The dialect is chosen from DATABASE_URL so the same config works locally
// (blank → SQLite file) and on Render (Postgres connection string injected).
import { Sequelize } from "sequelize";

const url = process.env.DATABASE_URL;
const isPostgres = !!url && /^postgres(ql)?:\/\//.test(url);

export const dbKind = isPostgres ? "postgres" : "sqlite";

export const sequelize = isPostgres
  ? new Sequelize(url, {
      dialect: "postgres",
      logging: false,
      // Enable SSL only when the URL asks for it (e.g. Neon/Render ?sslmode=require).
      // The Coolify-internal Postgres has no SSL, so forcing it would fail the connection.
      dialectOptions: /sslmode=require/i.test(url)
        ? { ssl: { require: true, rejectUnauthorized: false } }
        : {},
    })
  : new Sequelize({
      dialect: "sqlite",
      storage: process.env.SQLITE_PATH || "./data.sqlite",
      logging: false,
    });
