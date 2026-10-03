const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const routes = require("./routes");

const app = express();

/* ===========================
   Middlewares
=========================== */

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ===========================
   Health Check
=========================== */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 CloudSentinel AI Backend Running",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    message: "Backend Healthy",
  });
});

/* ===========================
   API Routes
=========================== */

app.use("/api", routes);

/* ===========================
   404 Handler
=========================== */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

module.exports = app;