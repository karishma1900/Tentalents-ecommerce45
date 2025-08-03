import express from 'express';
import refundRoutes from '../src/app/routes/refund.routes';
import { setupSwagger } from '@shared/middlewares/swagger/src/index';
import { errorHandler } from '@shared/middlewares/error/src/index';

const app = express();

// 🧩 JSON Parsing Middleware
app.use(express.json());

// 📚 Swagger API Docs
setupSwagger(app, {
  title: 'Refund Service',
  version: '1.0.0',
  path: '/api/docs/refund',
});

// 🚦 API Routes
app.use('/api/refunds', refundRoutes);

// 🩺 Health Check
app.get('/healthz', (_req, res) => res.send('✅ Refund Service healthy'));

// 🛠 Global Error Handler
app.use(errorHandler);

export default app;
