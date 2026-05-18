import path from "path";

export default ({ env }) => {
  const client = env("DATABASE_CLIENT", "sqlite");

  if (client === "postgres") {
    return {
      connection: {
        client: "postgres",
        connection: {
          connectionString: env("DATABASE_URL"),
          ssl: env.bool("DATABASE_SSL", true)
            ? { rejectUnauthorized: env.bool("DATABASE_SSL_REJECT_UNAUTHORIZED", false) }
            : false,
        },
        pool: { min: 0, max: 10 },
      },
    };
  }

  return {
    connection: {
      client: "sqlite",
      connection: {
        filename: path.resolve(process.cwd(), env("DATABASE_FILENAME", ".tmp/data.db")),
      },
      useNullAsDefault: true,
    },
  };
};
