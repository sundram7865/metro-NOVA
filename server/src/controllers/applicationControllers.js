"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateApplicationStatus = exports.createApplication = exports.listApplications = void 0;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var listApplications = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    function calculateNextPaymentDate(startDate) {
        var today = new Date();
        var nextPaymentDate = new Date(startDate);
        while (nextPaymentDate <= today) {
            nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
        }
        return nextPaymentDate;
    }
    var _a, userId, userType, whereClause, applications, formattedApplications, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.query, userId = _a.userId, userType = _a.userType;
                whereClause = {};
                if (userId && userType) {
                    if (userType === "tenant") {
                        whereClause = { tenantCognitoId: String(userId) };
                    }
                    else if (userType === "manager") {
                        whereClause = {
                            property: {
                                managerCognitoId: String(userId),
                            },
                        };
                    }
                }
                return [4 /*yield*/, prisma.application.findMany({
                        where: whereClause,
                        include: {
                            property: {
                                include: {
                                    location: true,
                                    manager: true,
                                },
                            },
                            tenant: true,
                        },
                    })];
            case 1:
                applications = _b.sent();
                return [4 /*yield*/, Promise.all(applications.map(function (app) { return __awaiter(void 0, void 0, void 0, function () {
                        var lease;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, prisma.lease.findFirst({
                                        where: {
                                            tenant: {
                                                cognitoId: app.tenantCognitoId,
                                            },
                                            propertyId: app.propertyId,
                                        },
                                        orderBy: { startDate: "desc" },
                                    })];
                                case 1:
                                    lease = _a.sent();
                                    return [2 /*return*/, __assign(__assign({}, app), { property: __assign(__assign({}, app.property), { address: app.property.location.address }), manager: app.property.manager, lease: lease
                                                ? __assign(__assign({}, lease), { nextPaymentDate: calculateNextPaymentDate(lease.startDate) }) : null })];
                            }
                        });
                    }); }))];
            case 2:
                formattedApplications = _b.sent();
                res.json(formattedApplications);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                res
                    .status(500)
                    .json({ message: "Error retrieving applications: ".concat(error_1.message) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.listApplications = listApplications;
var createApplication = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, applicationDate_1, status_1, propertyId_1, tenantCognitoId_1, name_1, email_1, phoneNumber_1, message_1, property_1, newApplication, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, applicationDate_1 = _a.applicationDate, status_1 = _a.status, propertyId_1 = _a.propertyId, tenantCognitoId_1 = _a.tenantCognitoId, name_1 = _a.name, email_1 = _a.email, phoneNumber_1 = _a.phoneNumber, message_1 = _a.message;
                return [4 /*yield*/, prisma.property.findUnique({
                        where: { id: propertyId_1 },
                        select: { pricePerMonth: true, securityDeposit: true },
                    })];
            case 1:
                property_1 = _b.sent();
                if (!property_1) {
                    res.status(404).json({ message: "Property not found" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, prisma.$transaction(function (prisma) { return __awaiter(void 0, void 0, void 0, function () {
                        var lease, application;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, prisma.lease.create({
                                        data: {
                                            startDate: new Date(), // Today
                                            endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // 1 year from today
                                            rent: property_1.pricePerMonth,
                                            deposit: property_1.securityDeposit,
                                            property: {
                                                connect: { id: propertyId_1 },
                                            },
                                            tenant: {
                                                connect: { cognitoId: tenantCognitoId_1 },
                                            },
                                        },
                                    })];
                                case 1:
                                    lease = _a.sent();
                                    return [4 /*yield*/, prisma.application.create({
                                            data: {
                                                applicationDate: new Date(applicationDate_1),
                                                status: status_1,
                                                name: name_1,
                                                email: email_1,
                                                phoneNumber: phoneNumber_1,
                                                message: message_1,
                                                property: {
                                                    connect: { id: propertyId_1 },
                                                },
                                                tenant: {
                                                    connect: { cognitoId: tenantCognitoId_1 },
                                                },
                                                lease: {
                                                    connect: { id: lease.id },
                                                },
                                            },
                                            include: {
                                                property: true,
                                                tenant: true,
                                                lease: true,
                                            },
                                        })];
                                case 2:
                                    application = _a.sent();
                                    return [2 /*return*/, application];
                            }
                        });
                    }); })];
            case 2:
                newApplication = _b.sent();
                res.status(201).json(newApplication);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                res
                    .status(500)
                    .json({ message: "Error creating application: ".concat(error_2.message) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createApplication = createApplication;
var updateApplicationStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, status_2, application, newLease, updatedApplication, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 9, , 10]);
                id = req.params.id;
                status_2 = req.body.status;
                console.log("status:", status_2);
                return [4 /*yield*/, prisma.application.findUnique({
                        where: { id: Number(id) },
                        include: {
                            property: true,
                            tenant: true,
                        },
                    })];
            case 1:
                application = _a.sent();
                if (!application) {
                    res.status(404).json({ message: "Application not found." });
                    return [2 /*return*/];
                }
                if (!(status_2 === "Approved")) return [3 /*break*/, 5];
                return [4 /*yield*/, prisma.lease.create({
                        data: {
                            startDate: new Date(),
                            endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                            rent: application.property.pricePerMonth,
                            deposit: application.property.securityDeposit,
                            propertyId: application.propertyId,
                            tenantCognitoId: application.tenantCognitoId,
                        },
                    })];
            case 2:
                newLease = _a.sent();
                // Update the property to connect the tenant
                return [4 /*yield*/, prisma.property.update({
                        where: { id: application.propertyId },
                        data: {
                            tenants: {
                                connect: { cognitoId: application.tenantCognitoId },
                            },
                        },
                    })];
            case 3:
                // Update the property to connect the tenant
                _a.sent();
                // Update the application with the new lease ID
                return [4 /*yield*/, prisma.application.update({
                        where: { id: Number(id) },
                        data: { status: status_2, leaseId: newLease.id },
                        include: {
                            property: true,
                            tenant: true,
                            lease: true,
                        },
                    })];
            case 4:
                // Update the application with the new lease ID
                _a.sent();
                return [3 /*break*/, 7];
            case 5: 
            // Update the application status (for both "Denied" and other statuses)
            return [4 /*yield*/, prisma.application.update({
                    where: { id: Number(id) },
                    data: { status: status_2 },
                })];
            case 6:
                // Update the application status (for both "Denied" and other statuses)
                _a.sent();
                _a.label = 7;
            case 7: return [4 /*yield*/, prisma.application.findUnique({
                    where: { id: Number(id) },
                    include: {
                        property: true,
                        tenant: true,
                        lease: true,
                    },
                })];
            case 8:
                updatedApplication = _a.sent();
                res.json(updatedApplication);
                return [3 /*break*/, 10];
            case 9:
                error_3 = _a.sent();
                res
                    .status(500)
                    .json({ message: "Error updating application status: ".concat(error_3.message) });
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.updateApplicationStatus = updateApplicationStatus;
