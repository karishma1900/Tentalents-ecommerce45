import express from 'express';
import { setupSwagger } from '@shared/swagger';
import { errorHandler, notFoundHandler } from '@shared/error';
import { loggerMiddleware } from '@shared/logger';
import { authMiddleware } from '@shared/auth';
import vendorRoutes from './app/routes/vendor.routes';
import cors from 'cors'; 
const app = express();

// 🌐 Global Middleware
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3001',  // Frontend URL (adjust if necessary)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow necessary methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
}));
app.use(loggerMiddleware);
// 📚 Swagger API Docs (public, before auth middleware)
setupSwagger(app, {
  title: 'Vendor Service',
  version: '1.0.0',
  path: '/api/docs/vendor',
});

// 🩺 Health Check Endpoint (public, no auth required)
app.get('/healthz', (_req, res) => {
  return res.status(200).send('✅ Vendor Service healthy');
});

// 🔐 Auth Middleware (protect all routes below)
app.use(authMiddleware());

// 🛣️ Service Routes
app.use('/api/vendor', vendorRoutes);

// 🚫 404 Handler
app.use(notFoundHandler);

// ❌ Centralized Error Handler
app.use(errorHandler);

export default app;
