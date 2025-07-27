"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminDashboard = exports.approveSeller = exports.getPendingSellers = exports.updateUserRole = exports.getAllUsers = void 0;
const admin_service_1 = require("../services/admin.service");
const utils_1 = require("@shared/utils");
/**
 * GET /api/admin/users
 * Fetch all users
 */
const getAllUsers = async (_, res, next) => {
    try {
        const users = await admin_service_1.adminService.getAllUsers();
        return (0, utils_1.sendSuccess)(res, '✅ All users fetched successfully', users);
    }
    catch (err) {
        return next(err);
    }
};
exports.getAllUsers = getAllUsers;
/**
 * PATCH /api/admin/users/role
 * Update a user’s role
 */
const updateUserRole = async (req, res, next) => {
    try {
        const { userId, role } = req.body;
        if (!userId || !role) {
            return (0, utils_1.sendError)(res, '❌ userId and role are required.', 400);
        }
        const updatedUser = await admin_service_1.adminService.updateUserRole(userId, role);
        return (0, utils_1.sendSuccess)(res, '✅ User role updated successfully', updatedUser);
    }
    catch (err) {
        return next(err);
    }
};
exports.updateUserRole = updateUserRole;
/**
 * GET /api/admin/sellers/pending
 * Fetch all pending sellers
 */
const getPendingSellers = async (_, res, next) => {
    try {
        const pending = await admin_service_1.adminService.getPendingSellers();
        return (0, utils_1.sendSuccess)(res, '✅ Pending sellers fetched successfully', pending);
    }
    catch (err) {
        return next(err);
    }
};
exports.getPendingSellers = getPendingSellers;
/**
 * PATCH /api/admin/sellers/approve
 * Approve or reject a seller based on admin input
 */
const approveSeller = async (req, res, next) => {
    try {
        const { sellerId, approve } = req.body;
        if (!sellerId || typeof approve !== 'boolean') {
            return (0, utils_1.sendError)(res, '❌ sellerId and approve (boolean) are required.', 400);
        }
        const result = await admin_service_1.adminService.updateSellerStatus(sellerId, approve);
        return (0, utils_1.sendSuccess)(res, `✅ Seller ${approve ? 'approved' : 'rejected'} successfully`, result);
    }
    catch (err) {
        return next(err);
    }
};
exports.approveSeller = approveSeller;
/**
 * GET /api/admin/dashboard
 * Get admin dashboard stats (users, vendors, orders, etc.)
 */
const getAdminDashboard = async (_, res, next) => {
    try {
        const stats = await admin_service_1.adminService.getDashboardSummary();
        return (0, utils_1.sendSuccess)(res, '✅ Admin dashboard stats fetched', stats);
    }
    catch (err) {
        return next(err);
    }
};
exports.getAdminDashboard = getAdminDashboard;
//# sourceMappingURL=admin.controller.js.map