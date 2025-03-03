import { env } from "./environment";
import Redis from "ioredis";

// Cấu hình kết nối Redis
const redisClient = new Redis({
    host: env.REDIS_HOST || "127.0.0.1",
    port: env.REDIS_PORT || 6379,
    password: env.REDIS_PASS || null,
    db: env.REDIS_DB || 0,
    retryStrategy: (times) => {
        console.log(`Redis kết nối lại... (Lần thử: ${times})`);
        return Math.min(times * 50, 2000); // Tăng dần thời gian kết nối lại
    },
});

// Xử lý lỗi kết nối Redis
redisClient.on("connect", () => {
    console.log("✅ Kết nối Redis thành công!");
});

redisClient.on("error", (err) => {
    console.error("❌ Lỗi Redis:", err);
});

module.exports = redisClient;
