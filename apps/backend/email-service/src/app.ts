import express from 'express';
import { setupSwagger } from '@shared/swagger';
import { errorHandler, notFoundHandler } from '@shared/error';
import { logger } from '@shared/logger';
import {
  corsMiddleware,
  helmetMiddleware,
  rateLimiter,
  requestLogger,
} from '@shared/middlewares';

import emailRoutes from './app/routes/email.routes';

const app = express();

// 🪵 Boot Log
logger.info('📨 Initializing Email Service');

// 🛡️ Global Middlewares
app.use(express.json());
app.use(corsMiddleware);
app.use(helmetMiddleware);
app.use(rateLimiter);
app.use(requestLogger);

// 📬 Routes
app.use('/api/email', emailRoutes);

// 📚 Swagger Docs
setupSwagger(app, {
  title: 'Email Service',
  version: '1.0.0',
  description: 'Handles transactional and notification emails',
  path: '/api/docs/email',
});

// 🩺 Health Check
app.get('/healthz', (_req, res) => {
  return res.status(200).send('✅ Email Service healthy');
});

// ❌ Fallback for unknown routes
app.use(notFoundHandler);

// ❗ Centralized Error Handler
app.use(errorHandler);

export default app;
