// Shape of the JSON we expose for health checks (easy to extend later, e.g. DB ping).
interface HealthStatus {
  status: string;
  uptime: number;
  timestamp: string;
}

// Pure logic + data — no Express types. Easier to test and reuse than logic inside a route handler.
const getHealthStatus = (): HealthStatus => {
  return {
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };
};

export { getHealthStatus };
