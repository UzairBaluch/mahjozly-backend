import type { RequestHandler } from 'express';
import { getHealthStatus } from '../services/health.service.js';

// HTTP layer only: call the service, send status + JSON. No DB or business rules here.
const getHealth: RequestHandler = (_req, res) => {
  const payload = getHealthStatus();
  res.status(200).json(payload);
};

export { getHealth };
