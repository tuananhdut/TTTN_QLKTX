import { Sequelize } from "sequelize";
import { env } from "./environment";

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialect: "mysql",
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ MySQL connected successfully");
    } catch (error) {
        console.error("❌ MySQL connection error:", error);
        process.exit(1);
    }
};

module.exports = { connectDB, sequelize };

