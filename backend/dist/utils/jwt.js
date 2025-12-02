"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET = process.env.JWT_SECRET || "change-me";
const signToken = (payload, expiresIn = "7d") => jsonwebtoken_1.default.sign(payload, SECRET, { expiresIn });
exports.signToken = signToken;
const verifyToken = (token) => jsonwebtoken_1.default.verify(token, SECRET);
exports.verifyToken = verifyToken;
