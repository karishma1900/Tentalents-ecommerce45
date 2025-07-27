"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const admin_routes_1 = __importDefault(require("./app/routes/admin.routes"));
const swagger_1 = require("@shared/swagger");
const error_1 = require("@shared/error");
const auth_1 = require("@shared/auth");
const logger_1 = require("@shared/logger");
const app = (0, express_1.default)();
// 🔒 Global Middlewares — Security + Parsing
app.use((0, cors_1.default)()); // Allow cross-origin requests (if needed for dashboard frontend)
app.use((0, helmet_1.default)()); // Apply standard security headers
app.use(express_1.default.json()); // Parse incoming JSON requests
// 🔐 Protected Admin Routes — RBAC: admin, super_admin
// Handles: seller approvals, product moderation, user role management, and logs
app.use('/api/admin', (0, auth_1.authMiddleware)(['admin', 'super_admin']), // Only admins/super_admins allowed
admin_routes_1.default);
// ✅ Health Check — Basic liveness probe for Kubernetes / Docker
app.get('/healthz', (req, res) => {
    logger_1.logger.info('[Health] /healthz pinged');
    return res.status(200).send('✅ Admin Service healthy');
});
// ✅ Readiness Check — Optional checks (e.g., DB, Kafka) for orchestration
app.get('/readiness', async (_req, res) => {
    try {
        // TODO: Check DB, Redis, or Kafka client connections here
        return res.status(200).send('🟢 Ready');
    }
    catch (error) {
        logger_1.logger.error('[Readiness] Check failed', error);
        return res.status(500).send('🔴 Not Ready');
    }
});
// 📘 Swagger UI — API docs for Admin endpoints
(0, swagger_1.setupSwagger)(app, {
    title: 'Admin Service',
    version: '1.0.0',
    path: '/api/docs/admin',
});
// ⚠️ Catch-all for Unknown Routes
app.use((_req, res) => {
    logger_1.logger.warn('⚠️ Unknown route requested');
    return res.status(404).json({ error: 'Route not found' });
});
// 🧯 Global Error Handling — Uncaught errors and failed routes
app.use((err, _req, res, _next) => {
    logger_1.logger.error('[Global Error]', err.message);
    return res.status(500).json({ error: 'Internal Server Error' });
});
// ♻️ Optional: Centralized shared error handler (from shared lib)
app.use(error_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map