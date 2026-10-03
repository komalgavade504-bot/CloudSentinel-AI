const AIChat = require("../models/AIChat");
const CloudResource = require("../models/CloudResource");
const Threat = require("../models/Threat");
const Scan = require("../models/Scan");
const Compliance = require("../models/Compliance");

const askAI = async (question) => {
  const q = question.toLowerCase().trim();

  let answer =
    "Sorry, I couldn't understand your question. Try asking about EC2, S3, IAM, threats, vulnerabilities, scans, risk, security score, compliance, or your security overview.";

  // =====================================
  // HIGH / CRITICAL SEVERITY THREATS
  // MUST COME BEFORE GENERAL THREAT QUERY
  // =====================================
  if (
    q.includes("critical threats") ||
    q.includes("critical threat") ||
    q.includes("high severity threats") ||
    q.includes("high severity threat") ||
    q.includes("high-risk threats") ||
    q.includes("high risk threats") ||
    q.includes("show critical threats")
  ) {
    const threats = await Threat.find({
      severity: {
        $in: ["Critical", "High", "critical", "high"],
      },
    });

    if (threats.length === 0) {
      answer = `High Severity Threats:

No critical or high-severity threats are currently recorded in the system.

Continue monitoring your environment and run regular security scans.`;
    } else {
      const threatList = threats
        .map(
          (threat, index) =>
            `${index + 1}. ${threat.title || threat.name || "Unnamed Threat"} — ${
              threat.severity || "Unknown Severity"
            }`
        )
        .join("\n");

      answer = `High Severity Threats:

${threatList}

Recommended actions:

1. Investigate these threats immediately.
2. Identify affected cloud resources.
3. Contain compromised systems.
4. Remove unnecessary public access.
5. Apply the recommended security fixes.
6. Monitor for suspicious activity.`;
    }
  }

  // =====================================
  // BIGGEST SECURITY RISK
  // =====================================
  else if (
    q.includes("biggest security risk") ||
    q.includes("biggest risk") ||
    q.includes("highest risk") ||
    q.includes("main security risk")
  ) {
    const threats = await Threat.countDocuments();

    const scans = await Scan.find();

    const vulnerabilityFindings = scans.reduce(
      (sum, scan) => sum + (Number(scan.findings) || 0),
      0
    );

    const resources = await CloudResource.find();

    const lowSecurityResources = resources.filter(
      (resource) => Number(resource.securityScore) < 70
    ).length;

    answer = `Security Risk Analysis:

Recorded Threats: ${threats}
Vulnerability Findings: ${vulnerabilityFindings}
Resources with Low Security Score: ${lowSecurityResources}

Your highest priorities should be:

1. Critical and high-risk threats.
2. Publicly exposed cloud resources.
3. Weak IAM permissions.
4. Open or unnecessary network ports.
5. High-severity vulnerabilities.

Start with issues that could lead to unauthorized access or sensitive data exposure.`;
  }

  // =====================================
  // COMPLETE SECURITY OVERVIEW
  // =====================================
  else if (
    q.includes("complete security overview") ||
    q.includes("security overview") ||
    q.includes("overall security") ||
    q.includes("show my security overview")
  ) {
    const totalResources = await CloudResource.countDocuments();
    const totalThreats = await Threat.countDocuments();

    const scans = await Scan.find();

    const vulnerabilityFindings = scans.reduce(
      (sum, scan) => sum + (Number(scan.findings) || 0),
      0
    );

    const resources = await CloudResource.find();

    let securityScore = 0;

    if (resources.length > 0) {
      const totalScore = resources.reduce(
        (sum, resource) =>
          sum + (Number(resource.securityScore) || 0),
        0
      );

      securityScore = Math.round(
        totalScore / resources.length
      );
    }

    const compliance = await Compliance.find();

    let complianceScore = 0;

    if (compliance.length > 0) {
      const totalComplianceScore = compliance.reduce(
        (sum, item) => sum + (Number(item.score) || 0),
        0
      );

      complianceScore = Math.round(
        totalComplianceScore / compliance.length
      );
    }

    answer = `Complete Security Overview:

Cloud Resources: ${totalResources}
Recorded Threats: ${totalThreats}
Security Score: ${securityScore}%
Vulnerability Findings: ${vulnerabilityFindings}
Compliance Score: ${complianceScore}%

Recommended Priority:

1. Fix critical vulnerabilities first.
2. Investigate high-severity threats.
3. Secure publicly exposed cloud resources.
4. Restrict unnecessary network access.
5. Enable MFA and review IAM permissions.
6. Address compliance frameworks marked as Needs Review.
7. Run regular security scans and audits.`;
  }

  // =====================================
  // SPECIFIC COMPLIANCE FRAMEWORK
  // =====================================
  else if (
    q.includes("iso 27001") ||
    q.includes("iso compliance")
  ) {
    const compliance = await Compliance.findOne({
      framework: "ISO 27001",
    });

    if (!compliance) {
      answer =
        "ISO 27001 compliance data is currently not available.";
    } else {
      answer = `ISO 27001 Compliance Status:

Score: ${compliance.score}%
Status: ${compliance.status}
Passed Controls: ${compliance.passedControls} out of ${compliance.controls}

Your ISO 27001 compliance is ${
        compliance.status === "Compliant"
          ? "in good condition. Continue monitoring controls, security policies, risk management, and regular audits."
          : "not fully compliant. Review failed controls and improve the affected security areas."
      }`;
    }
  }

  else if (
    q.includes("pci dss") ||
    q.includes("pci compliance")
  ) {
    const compliance = await Compliance.findOne({
      framework: "PCI DSS",
    });

    if (!compliance) {
      answer =
        "PCI DSS compliance data is currently not available.";
    } else {
      answer = `PCI DSS Compliance Status:

Score: ${compliance.score}%
Status: ${compliance.status}
Passed Controls: ${compliance.passedControls} out of ${compliance.controls}

PCI DSS currently ${
        compliance.status === "Compliant"
          ? "meets the required compliance status."
          : "requires attention. Review failed controls and strengthen payment data security, access control, monitoring, and vulnerability management."
      }`;
    }
  }

  else if (
    q.includes("soc 2") ||
    q.includes("soc2")
  ) {
    const compliance = await Compliance.findOne({
      framework: "SOC 2",
    });

    if (!compliance) {
      answer =
        "SOC 2 compliance data is currently not available.";
    } else {
      answer = `SOC 2 Compliance Status:

Score: ${compliance.score}%
Status: ${compliance.status}
Passed Controls: ${compliance.passedControls} out of ${compliance.controls}

Continue reviewing access controls, monitoring, logging, and security policies.`;
    }
  }

  else if (
    q.includes("nist") ||
    q.includes("nist cybersecurity framework")
  ) {
    const compliance = await Compliance.findOne({
      framework: "NIST Cybersecurity Framework",
    });

    if (!compliance) {
      answer =
        "NIST Cybersecurity Framework data is currently not available.";
    } else {
      answer = `NIST Cybersecurity Framework Status:

Score: ${compliance.score}%
Status: ${compliance.status}
Passed Controls: ${compliance.passedControls} out of ${compliance.controls}

Focus on improving controls that are still in progress and continue regular security monitoring.`;
    }
  }

  // =====================================
  // GENERAL COMPLIANCE STATUS
  // =====================================
  else if (
    q.includes("compliance status") ||
    q.includes("my compliance") ||
    q.includes("what is my compliance") ||
    q.includes("compliance")
  ) {
    const compliance = await Compliance.find();

    if (compliance.length === 0) {
      answer =
        "No compliance data is currently available.";
    } else {
      const complianceList = compliance
        .map(
          (item) =>
            `${item.framework}: ${item.score}% — ${item.status}`
        )
        .join("\n");

      const averageScore = Math.round(
        compliance.reduce(
          (sum, item) => sum + (Number(item.score) || 0),
          0
        ) / compliance.length
      );

      answer = `Compliance Overview:

${complianceList}

Average Compliance Score: ${averageScore}%

Recommended actions:

1. Review frameworks marked "Needs Review".
2. Fix failed security controls.
3. Improve access control and IAM.
4. Maintain audit logs and security evidence.
5. Regularly review compliance status.`;
    }
  }

  // =====================================
  // WHAT SHOULD I FIX FIRST
  // =====================================
  else if (
    q.includes("fix first") ||
    q.includes("prioritize") ||
    q.includes("what should i fix") ||
    q.includes("what should i do first")
  ) {
    answer = `Recommended Security Priority:

1. Fix critical vulnerabilities.
2. Remove unnecessary public access from cloud resources.
3. Restrict exposed ports such as SSH.
4. Enable MFA for IAM users.
5. Rotate old or exposed access keys.
6. Patch vulnerable EC2 instances.
7. Review compliance issues.

Start with problems that could expose sensitive data or provide unauthorized access.`;
  }

  // =====================================
  // GENERAL THREATS
  // =====================================
  else if (
    q.includes("threat") ||
    q.includes("attack") ||
    q.includes("incident")
  ) {
    const total = await Threat.countDocuments();

    answer = `There are currently ${total} threats recorded in the system.

Recommended actions:

1. Review critical and high-severity threats first.
2. Check affected resources.
3. Investigate suspicious activity.
4. Contain exposed or compromised resources.
5. Apply the recommended security fixes.`;
  }

  // =====================================
  // RISK
  // =====================================
  else if (
    q.includes("risk") ||
    q.includes("danger") ||
    q.includes("risky")
  ) {
    const threats = await Threat.countDocuments();

    answer = `Your environment currently has ${threats} recorded threats.

Prioritize:

1. Critical and high-risk threats.
2. Publicly exposed cloud resources.
3. Weak IAM permissions.
4. Open or unnecessary network ports.
5. Vulnerabilities with high severity.`;
  }

  // =====================================
  // EC2 SECURITY
  // =====================================
  else if (
    q.includes("ec2") ||
    q.includes("server security") ||
    q.includes("instance security")
  ) {
    answer = `EC2 Security Recommendations:

1. Restrict SSH port 22 to trusted IP addresses.
2. Remove unnecessary inbound ports.
3. Use properly configured security groups.
4. Keep the operating system and applications updated.
5. Enable MFA for administrative access.
6. Avoid storing access keys directly on the server.
7. Use IAM roles instead of hard-coded credentials.
8. Monitor EC2 activity using logging and security monitoring tools.`;
  }

  // =====================================
  // S3 SECURITY
  // =====================================
  else if (
    q.includes("s3") ||
    q.includes("bucket") ||
    q.includes("public bucket")
  ) {
    answer = `S3 Security Recommendations:

1. Disable unnecessary public access.
2. Enable S3 Block Public Access.
3. Use IAM policies based on least privilege.
4. Enable encryption for sensitive data.
5. Enable logging and monitoring.
6. Review bucket permissions regularly.

A publicly accessible S3 bucket can expose sensitive or confidential data.`;
  }

  // =====================================
  // IAM SECURITY
  // =====================================
  else if (
    q.includes("iam") ||
    q.includes("access key") ||
    q.includes("password") ||
    q.includes("authentication") ||
    q.includes("mfa")
  ) {
    answer = `IAM Security Recommendations:

1. Enable Multi-Factor Authentication.
2. Follow the principle of least privilege.
3. Remove unused users and access keys.
4. Rotate access keys regularly.
5. Use strong password policies.
6. Avoid using the root account for daily operations.
7. Regularly review user permissions.`;
  }

  // =====================================
  // VULNERABILITIES
  // =====================================
  else if (
    q.includes("vulnerability") ||
    q.includes("vulnerabilities") ||
    q.includes("cve")
  ) {
    const scans = await Scan.find();

    const vulnerabilities = scans.reduce(
      (sum, scan) => sum + (Number(scan.findings) || 0),
      0
    );

    answer = `The system currently has approximately ${vulnerabilities} recorded vulnerability findings from security scans.

Recommended priority:

1. Fix critical vulnerabilities first.
2. Then address high-severity findings.
3. Secure publicly exposed resources.
4. Patch vulnerable systems.
5. Run another security scan after applying fixes.`;
  }

  // =====================================
  // SECURITY SCORE
  // =====================================
  else if (
    q.includes("security score") ||
    q.includes("score") ||
    q.includes("improve security")
  ) {
    const resources = await CloudResource.find();

    if (resources.length === 0) {
      answer =
        "No cloud resources are currently available to calculate the security score.";
    } else {
      const totalScore = resources.reduce(
        (sum, resource) =>
          sum + (Number(resource.securityScore) || 0),
        0
      );

      const averageScore = Math.round(
        totalScore / resources.length
      );

      answer = `Your average security score is ${averageScore}%.

To improve your security score:

1. Fix critical vulnerabilities.
2. Secure public cloud resources.
3. Enable MFA.
4. Rotate old access keys.
5. Patch vulnerable systems.
6. Apply least-privilege IAM policies.
7. Regularly run security scans.`;
    }
  }

  // =====================================
  // CLOUD RESOURCES
  // =====================================
  else if (
    q.includes("resource") ||
    q.includes("cloud infrastructure") ||
    q.includes("cloud resources")
  ) {
    const total = await CloudResource.countDocuments();

    answer = `You currently have ${total} cloud resources connected to CloudSentinel AI.

You can review their security status from the Cloud Resources and Dashboard sections.`;
  }

  // =====================================
  // SECURITY SCANS
  // =====================================
  else if (
    q.includes("scan") ||
    q.includes("scanning")
  ) {
    const total = await Scan.countDocuments();

    answer = `A total of ${total} security scans have been performed.

Run a new security scan to identify the latest vulnerabilities and review the findings based on their risk level.`;
  }

  // =====================================
  // SAVE CHAT
  // =====================================
  const chat = await AIChat.create({
    question,
    answer,
  });

  return chat;
};

// =====================================
// GET CHAT HISTORY
// =====================================
const getChatHistory = async () => {
  return await AIChat.find().sort({
    createdAt: 1,
  });
};

// =====================================
// CLEAR CHAT HISTORY
// =====================================
const clearChatHistory = async () => {
  await AIChat.deleteMany({});
};

module.exports = {
  askAI,
  getChatHistory,
  clearChatHistory,
};