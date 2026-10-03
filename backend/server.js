require("dotenv").config();

const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

async function startServer() {
  try {
    await connectDB();

    server.listen(PORT, () => {
      console.log("=================================");
      console.log("🚀 CloudSentinel AI Backend");
      console.log(`🌐 Server Running : http://localhost:${PORT}`);
      console.log("=================================");
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();