import 'dotenv/config'

export const env = {
    BUILD_MODE: process.env.NODE_ENV || 'dev',
    PORT: process.env.APP_PORT || 3000,
    HOST: process.env.APP_HOST || 'localhost',

    // environment variables mysql database
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASS: process.env.DB_PASS || '',
    DB_NAME: process.env.DB_NAME || 'testdb',
    DB_PORT: process.env.DB_PORT || 3306,

    // environment variables jwt
    JWT_SECRET: process.env.JWT_SECRET_KEY,
    JWT_EXPIRES: process.env.JWT_EXPIRES || '1d',

    // environment variables redis
    REDIS_HOST: process.env.REDIS_HOST || 'localhost',
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    REDIS_PASS: process.env.REDIS_PASS || '',
    REDIS_DB: process.env.REDIS_DB || 0,

    // environment variables google
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,

    //Password
    PASSWORD_DEFAULT: process.env.PASSWORD_DEFAULT
}

