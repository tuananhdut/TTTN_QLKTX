import mysql from 'mysql2/promise';
import { env } from './environment';

const MYSQL_CONFIG = {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}

const pool = mysql.createPool(MYSQL_CONFIG)

const connectDB = async () => {
    try {
        const connection = await pool.getConnection()
        // eslint-disable-next-line no-console
        console.log('✅ MySQL connected successfully')
        connection.release()
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('❌ MySQL connection error:', error)
        process.exit(1)
    }
}

// Kiểm tra số kết nối đang hoạt động mỗi 5 giây
setInterval(async () => {
    try {
        const [connections] = await pool.query("SHOW STATUS LIKE 'Threads_connected'")
        // eslint-disable-next-line no-console
        console.log(`🔗 Active connections: ${connections[0].Value}`)
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('⚠️ Error fetching connection status:', error)
    }
}, 5000)

process.on('SIGINT', async () => {
    try {
        await pool.end()
        // eslint-disable-next-line no-console
        console.log('🛑 MySQL pool closed due to app termination')
        process.exit(0)
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('⚠️ Error closing MySQL pool:', error)
        process.exit(1)
    }
})

module.exports = { pool, connectDB }
