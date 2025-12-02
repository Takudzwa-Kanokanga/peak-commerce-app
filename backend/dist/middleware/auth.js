"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = exports.authenticate = void 0;
const jwt_1 = require("../utils/jwt");
const prisma_1 = require("../prisma");
const authenticate = async (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth?.startsWith("Bearer "))
        return res.status(401).json({ error: "No token" });
    const token = auth.split(" ")[1];
    try {
        const payload = (0, jwt_1.verifyToken)(token);
        const user = await prisma_1.prisma.user.findUnique({ where: { id: payload.id } });
        if (!user)
            return res.status(401).json({ error: "User not found" });
        req.user = { id: user.id, role: user.role };
        next();
    }
    catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
};
exports.authenticate = authenticate;
const requireAdmin = (req, res, next) => {
    if (!req.user)
        return res.status(403).json({ error: "Not authenticated" });
    if (req.user.role !== "ADMIN")
        return res.status(403).json({ error: "Forbidden" });
    next();
};
exports.requireAdmin = requireAdmin;
