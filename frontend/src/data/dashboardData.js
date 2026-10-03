export const dashboardStats = {
  totalResources: 1,
  runningResources: 1,
  stoppedResources: 0,
  criticalResources: 0,
  averageSecurityScore: 95,
};

export const threatActivity = [
  { day: "Mon", threats: 0 },
  { day: "Tue", threats: 0 },
  { day: "Wed", threats: 1 },
  { day: "Thu", threats: 0 },
  { day: "Fri", threats: 1 },
  { day: "Sat", threats: 0 },
  { day: "Sun", threats: 1 },
];

export const recentActivities = [
  {
    id: 1,
    title: "Security scan completed",
    description: "Production EC2 scan completed successfully.",
    time: "10 minutes ago",
    status: "Completed",
  },
  {
    id: 2,
    title: "Suspicious login detected",
    description: "Multiple failed login attempts were detected.",
    time: "25 minutes ago",
    status: "Warning",
  },
  {
    id: 3,
    title: "Cloud resource updated",
    description: "Production EC2 resource is currently running.",
    time: "1 hour ago",
    status: "Normal",
  },
];

export const aiInsights = [
  {
    id: 1,
    title: "Security Looks Good",
    description: "No critical threats require immediate attention.",
    priority: "Low",
  },
];

export const cloudStatus = {
  status: "Protected",
  resources: 1,
  running: 1,
  stopped: 0,
};