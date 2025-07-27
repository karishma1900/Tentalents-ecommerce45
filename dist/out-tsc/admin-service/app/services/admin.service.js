"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminService = void 0;
const client_1 = require("@prisma/client"); // ✅ FIXED
const prisma = new client_1.PrismaClient();
exports.adminService = {
    getAllUsers: async () => {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                role: true,
                seller: {
                    select: {
                        status: true,
                    },
                },
            },
        });
        return users.map((user) => ({
            id: user.id,
            email: user.email,
            role: user.role,
            sellerStatus: user.seller?.status ?? null,
        }));
    },
    updateUserRole: async (userId, role) => {
        const validRoles = Object.values(client_1.UserRole);
        if (!validRoles.includes(role)) {
            throw new Error(`Invalid user role: ${role}`);
        }
        return prisma.user.update({
            where: { id: userId },
            data: { role },
        });
    },
    getPendingSellers: async () => {
        return prisma.seller.findMany({
            where: { status: client_1.SellerStatus.PENDING },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                    },
                },
            },
        });
    },
    updateSellerStatus: async (sellerId, approve) => {
        const newStatus = approve
            ? client_1.SellerStatus.APPROVED
            : client_1.SellerStatus.REJECTED;
        const seller = await prisma.seller.findUnique({
            where: { id: sellerId },
        });
        if (!seller) {
            throw new Error(`Seller not found with ID: ${sellerId}`);
        }
        return prisma.seller.update({
            where: { id: sellerId },
            data: { status: newStatus },
        });
    },
    getDashboardSummary: async () => {
        const [userCount, sellerCount] = await Promise.all([
            prisma.user.count(),
            prisma.seller.count(),
        ]);
        return { userCount, sellerCount };
    },
};
// npm install @prisma/client
//# sourceMappingURL=admin.service.js.map