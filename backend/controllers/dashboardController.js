const CloudResource = require("../models/CloudResource");
const Threat = require("../models/Threat");
const Scan = require("../models/Scan");
const Compliance = require("../models/Compliance");

const getDashboardStats = async (req, res) => {
  try {
    // =========================
    // CLOUD RESOURCES
    // =========================

    const totalResources =
      await CloudResource.countDocuments();

    const runningResources =
      await CloudResource.countDocuments({
        status: "Running",
      });

    const stoppedResources =
      await CloudResource.countDocuments({
        status: "Stopped",
      });

    // =========================
    // THREATS
    // =========================

    const totalThreats =
      await Threat.countDocuments();

    const criticalResources =
      await Threat.countDocuments({
        severity: "Critical",
      });

    // =========================
    // SECURITY SCORE
    // =========================

    const resources =
      await CloudResource.find();

    let averageSecurityScore = 0;

    if (resources.length > 0) {
      const totalScore = resources.reduce(
        (sum, resource) =>
          sum +
          (Number(resource.securityScore) || 0),
        0
      );

      averageSecurityScore = Math.round(
        totalScore / resources.length
      );
    }

    // =========================
    // VULNERABILITY FINDINGS
    // =========================

    const scans = await Scan.find();

    const vulnerabilityFindings =
      scans.reduce(
        (sum, scan) =>
          sum +
          (Number(scan.findings) || 0),
        0
      );

    // =========================
    // COMPLIANCE SCORE
    // =========================

    const compliance =
      await Compliance.find();

    let complianceScore = 0;

    if (compliance.length > 0) {
      const totalComplianceScore =
        compliance.reduce(
          (sum, item) =>
            sum +
            (Number(item.score) || 0),
          0
        );

      complianceScore = Math.round(
        totalComplianceScore /
          compliance.length
      );
    }

    // =========================
    // SEND RESPONSE
    // =========================

    res.status(200).json({
      success: true,

      data: {
        // Overview Cards
        totalResources,
        runningResources,
        stoppedResources,
        criticalResources,
        averageSecurityScore,

        // Extra Dashboard Data
        totalThreats,
        vulnerabilityFindings,
        complianceScore,
      },
    });

  } catch (error) {
    console.error(
      "Dashboard error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to load dashboard data.",
    });
  }
};

module.exports = {
  getDashboardStats,
};