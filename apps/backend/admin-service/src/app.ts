import express, { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';

import adminRoutes from './app/routes/admin.routes';
import { setupSwagger } from '@shared/swagger';
import { errorHandler } from '@shared/error';
import { authMiddleware } from '@shared/auth';
import { logger } from '@shared/logger';

const app: Express = express();

// 🔒 Global Middlewares — Security + Parsing
app.use(cors()); // Allow cross-origin requests (if needed for dashboard frontend)
app.use(helmet()); // Apply standard security headers
app.use(express.json()); // Parse incoming JSON requests

// 🔐 Protected Admin Routes — RBAC: admin, super_admin
// Handles: seller approvals, product moderation, user role management, and logs
app.use(
  '/api/admin',
  authMiddleware(['admin', 'super_admin']), // Only admins/super_admins allowed
  adminRoutes
);

// ✅ Health Check — Basic liveness probe for Kubernetes / Docker
app.get('/healthz', (req: Request, res: Response): void => {
  logger.info('[Health] /healthz pinged');
  return res.status(200).send('✅ Admin Service healthy');
});

// ✅ Readiness Check — Optional checks (e.g., DB, Kafka) for orchestration
app.get('/readiness', async (_req: Request, res: Response): Promise<void> => {
  try {
    // TODO: Check DB, Redis, or Kafka client connections here
    return res.status(200).send('🟢 Ready');
  } catch (error) {
    logger.error('[Readiness] Check failed', error);
    return res.status(500).send('🔴 Not Ready');
  }
});

// 📘 Swagger UI — API docs for Admin endpoints
setupSwagger(app, {
  title: 'Admin Service',
  version: '1.0.0',
  path: '/api/docs/admin',
});

// ⚠️ Catch-all for Unknown Routes
app.use((_req: Request, res: Response): void => {
  logger.warn('⚠️ Unknown route requested');
  return res.status(404).json({ error: 'Route not found' });
});

// 🧯 Global Error Handling — Uncaught errors and failed routes
app.use(
  (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
    logger.error('[Global Error]', err.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
);

// ♻️ Optional: Centralized shared error handler (from shared lib)
app.use(errorHandler);

export default app;
