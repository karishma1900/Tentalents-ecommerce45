import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cmsRoutes from './src/app/routes/cms.routes';
import { setupSwagger } from '@shared/middlewares/swagger/src/index';
import { errorHandler } from '@shared/middlewares/error/src/index';
import { loggerMiddleware } from '@shared/middlewares/logger/src/index';

const app = express();

// 🌐 Security & Logging Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// 📚 Swagger API Docs setup (before routes)
setupSwagger(app, {
  title: 'CMS Service',
  version: '1.0.0',
  path: '/api/docs/cms',
});

// ✅ CMS Routes
app.use('/api/cms', cmsRoutes);

// 🩺 Health Check
app.get('/healthz', (_req, res) =>
  res.status(200).send('✅ CMS Service healthy')
);

// 🛑 Global Error Handler
app.use(errorHandler);

export default app;
