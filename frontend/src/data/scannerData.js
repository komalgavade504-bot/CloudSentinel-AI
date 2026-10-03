export const vulnerabilities = [
  {
    id: 1,
    severity: "Critical",
    service: "EC2",
    issue: "SSH Port 22 Open",
    cve: "CVE-2026-1123",
    status: "Open",
  },
  {
    id: 2,
    severity: "High",
    service: "S3",
    issue: "Public Bucket Access",
    cve: "-",
    status: "Open",
  },
  {
    id: 3,
    severity: "Medium",
    service: "IAM",
    issue: "Weak Password Policy",
    cve: "-",
    status: "Review",
  },
  {
    id: 4,
    severity: "Low",
    service: "Lambda",
    issue: "Old Runtime Version",
    cve: "-",
    status: "Resolved",
  },
];

export const scanHistory = [
  {
    id: 1,
    date: "Today",
    duration: "3 min",
    findings: 12,
    status: "Completed",
  },
  {
    id: 2,
    date: "Yesterday",
    duration: "2 min",
    findings: 8,
    status: "Completed",
  },
  {
    id: 3,
    date: "2 Days Ago",
    duration: "4 min",
    findings: 15,
    status: "Completed",
  },
];