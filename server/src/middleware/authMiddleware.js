"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var authMiddleware = function (allowedRoles) {
    return function (req, res, next) {
        var _a;
        var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        try {
            var decoded = jsonwebtoken_1.default.decode(token);
            var userRole = decoded["custom:role"] || "";
            req.user = {
                id: decoded.sub,
                role: userRole,
            };
            var hasAccess = allowedRoles.includes(userRole.toLowerCase());
            if (!hasAccess) {
                res.status(403).json({ message: "Access Denied" });
                return;
            }
        }
        catch (err) {
            console.error("Failed to decode token:", err);
            res.status(400).json({ message: "Invalid token" });
            return;
        }
        next();
    };
};
exports.authMiddleware = authMiddleware;
