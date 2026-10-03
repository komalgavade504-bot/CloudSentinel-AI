const express = require("express");

const router = express.Router();

/* Authentication */
router.use("/auth", require("./authRoutes"));

/* Dashboard */
router.use("/dashboard", require("./dashboardRoutes"));

/* Cloud Resources */
router.use("/cloud-resources", require("./cloudRoutes"));

/* Security Scanner */
router.use("/scanner", require("./scannerRoutes"));

/* Threat Feed */
router.use("/threats", require("./threatRoutes"));

/* Reports */
router.use("/reports", require("./reportRoutes"));

/* Compliance */
router.use("/compliance", require("./complianceRoutes"));

/* Profile */
router.use("/profile", require("./ProfileRoutes"));

/* Settings */
router.use("/settings", require("./settingsRoutes"));

/* AI Copilot */
router.use("/ai", require("./aiRoutes"));

module.exports = router;