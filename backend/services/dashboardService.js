const CloudResource = require("../models/CloudResource");

const getDashboardStats = async () => {
  const totalResources = await CloudResource.countDocuments();

  const runningResources = await CloudResource.countDocuments({
    status: "Running",
  });

  const stoppedResources = await CloudResource.countDocuments({
    status: "Stopped",
  });

  const criticalResources = await CloudResource.countDocuments({
    riskLevel: "High",
  });

  const resources = await CloudResource.find();

  let averageSecurityScore = 0;

  if (resources.length > 0) {
    const totalScore = resources.reduce(
      (sum, resource) => sum + resource.securityScore,
      0
    );

    averageSecurityScore = Math.round(
      totalScore / resources.length
    );
  }

  return {
    totalResources,
    runningResources,
    stoppedResources,
    criticalResources,
    averageSecurityScore,
  };
};

module.exports = {
  getDashboardStats,
};