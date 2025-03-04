require('dotenv').config(); // Load biến môi trường từ .env

module.exports = {
    development: {
        username: process.env.DB_USER || "root",
        password: process.env.DB_PASS || "",
        database: process.env.DB_NAME || "qlktx",
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || "3306",
        dialect: "mysql",
        define: { freezeTableName: true },
        logging: false
    },
    test: {
        username: process.env.DB_USER || "root",
        password: process.env.DB_PASS || "",
        database: process.env.DB_NAME || "database_test",
        host: process.env.DB_HOST || "127.0.0.1",
        port: process.env.DB_PORT || "3306",
        dialect: "mysql"
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || "3306",
        dialect: "mysql"
    }
};
