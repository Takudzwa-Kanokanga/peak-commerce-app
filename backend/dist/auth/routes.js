"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../prisma");
const jwt_1 = require("../utils/jwt");
const schemas_1 = require("../validation/schemas");
const router = express_1.default.Router();
router.post("/signup", async (req, res) => {
    try {
        const parsed = schemas_1.userRegisterSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: "Invalid data", details: parsed.error });
        }
        const { email, password, name } = parsed.data;
        // Check if user already exists
        const existingUser = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }
        const hash = await bcrypt_1.default.hash(password, 10);
        const user = await prisma_1.prisma.user.create({
            data: { email, password: hash, name: name || null }
        });
        const token = (0, jwt_1.signToken)({ id: user.id, email: user.email });
        res.status(201).json({
            token,
            user: { id: user.id, email: user.email, name: user.name, role: user.role }
        });
    }
    catch (err) {
        res.status(500).json({ error: "Signup failed", details: err });
    }
});
router.post("/login", async (req, res) => {
    try {
        const parsed = schemas_1.userLoginSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: "Invalid data", details: parsed.error });
        }
        const { email, password } = parsed.data;
        const user = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const ok = await bcrypt_1.default.compare(password, user.password);
        if (!ok) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = (0, jwt_1.signToken)({ id: user.id, email: user.email });
        res.json({
            token,
            user: { id: user.id, email: user.email, name: user.name, role: user.role }
        });
    }
    catch (err) {
        res.status(500).json({ error: "Login failed", details: err });
    }
});
exports.default = router;
