"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const router = (0, express_1.Router)();
/**
 * @route GET /admin/users
 * @desc Get all users
 */
router.get('/users', admin_controller_1.getAllUsers);
/**
 * @route PUT /admin/users/role
 * @desc Update a user's role
 */
router.put('/users/role', admin_controller_1.updateUserRole);
/**
 * @route GET /admin/sellers/pending
 * @desc Get all pending seller applications
 */
router.get('/sellers/pending', admin_controller_1.getPendingSellers);
/**
 * @route PUT /admin/sellers/status
 * @desc Approve or reject a seller
 */
router.put('/sellers/status', admin_controller_1.approveSeller);
/**
 * @route GET /admin/dashboard
 * @desc Get admin dashboard summary
 */
router.get('/dashboard', admin_controller_1.getAdminDashboard);
exports.default = router;
//# sourceMappingURL=admin.routes.js.map