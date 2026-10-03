require("dotenv").config();

const mongoose = require("mongoose");
const Compliance = require("./models/Compliance");

const complianceData = [
  {
    framework: "ISO 27001",
    score: 92,
    status: "Compliant",
    controls: 114,
    passedControls: 105,
    lastAudit: new Date("2026-08-15"),
  },
  {
    framework: "SOC 2",
    score: 85,
    status: "Compliant",
    controls: 64,
    passedControls: 55,
    lastAudit: new Date("2026-08-12"),
  },
  {
    framework: "PCI DSS",
    score: 68,
    status: "Needs Review",
    controls: 78,
    passedControls: 53,
    lastAudit: new Date("2026-08-10"),
  },
  {
    framework: "NIST Cybersecurity Framework",
    score: 76,
    status: "In Progress",
    controls: 108,
    passedControls: 82,
    lastAudit: new Date("2026-08-18"),
  },
];

async function seedCompliance() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    // Remove old compliance data
    await Compliance.deleteMany({});

    // Insert new sample data
    await Compliance.insertMany(complianceData);

    console.log("Compliance sample data added successfully!");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding compliance data:", error);

    process.exit(1);
  }
}

seedCompliance();