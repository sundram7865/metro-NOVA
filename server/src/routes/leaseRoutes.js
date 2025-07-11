"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authMiddleware_1 = require("../middleware/authMiddleware");
var leaseControllers_1 = require("../controllers/leaseControllers");
var router = express_1.default.Router();
router.get("/", (0, authMiddleware_1.authMiddleware)(["manager", "tenant"]), leaseControllers_1.getLeases);
router.get("/:id/payments", (0, authMiddleware_1.authMiddleware)(["manager", "tenant"]), leaseControllers_1.getLeasePayments);
exports.default = router;
