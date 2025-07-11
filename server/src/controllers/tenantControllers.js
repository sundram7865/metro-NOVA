"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
exports.removeFavoriteProperty = exports.addFavoriteProperty = exports.getCurrentResidences = exports.updateTenant = exports.createTenant = exports.getTenant = void 0;
var client_1 = require("@prisma/client");
var wkt_1 = require("@terraformer/wkt");
var prisma = new client_1.PrismaClient();
var getTenant = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cognitoId, tenant, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                cognitoId = req.params.cognitoId;
                return [4 /*yield*/, prisma.tenant.findUnique({
                        where: { cognitoId: cognitoId },
                        include: {
                            favorites: true,
                        },
                    })];
            case 1:
                tenant = _a.sent();
                if (tenant) {
                    res.json(tenant);
                }
                else {
                    res.status(404).json({ message: "Tenant not found" });
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res
                    .status(500)
                    .json({ message: "Error retrieving tenant: ".concat(error_1.message) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getTenant = getTenant;
var createTenant = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, cognitoId, name_1, email, phoneNumber, tenant, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, cognitoId = _a.cognitoId, name_1 = _a.name, email = _a.email, phoneNumber = _a.phoneNumber;
                return [4 /*yield*/, prisma.tenant.create({
                        data: {
                            cognitoId: cognitoId,
                            name: name_1,
                            email: email,
                            phoneNumber: phoneNumber,
                        },
                    })];
            case 1:
                tenant = _b.sent();
                res.status(201).json(tenant);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                res
                    .status(500)
                    .json({ message: "Error creating tenant: ".concat(error_2.message) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createTenant = createTenant;
var updateTenant = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cognitoId, _a, name_2, email, phoneNumber, updateTenant_1, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                cognitoId = req.params.cognitoId;
                _a = req.body, name_2 = _a.name, email = _a.email, phoneNumber = _a.phoneNumber;
                return [4 /*yield*/, prisma.tenant.update({
                        where: { cognitoId: cognitoId },
                        data: {
                            name: name_2,
                            email: email,
                            phoneNumber: phoneNumber,
                        },
                    })];
            case 1:
                updateTenant_1 = _b.sent();
                res.json(updateTenant_1);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                res
                    .status(500)
                    .json({ message: "Error updating tenant: ".concat(error_3.message) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateTenant = updateTenant;
var getCurrentResidences = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cognitoId, properties, residencesWithFormattedLocation, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                cognitoId = req.params.cognitoId;
                return [4 /*yield*/, prisma.property.findMany({
                        where: { tenants: { some: { cognitoId: cognitoId } } },
                        include: {
                            location: true,
                        },
                    })];
            case 1:
                properties = _a.sent();
                return [4 /*yield*/, Promise.all(properties.map(function (property) { return __awaiter(void 0, void 0, void 0, function () {
                        var coordinates, geoJSON, longitude, latitude;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, prisma.$queryRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SELECT ST_asText(coordinates) as coordinates from \"Location\" where id = ", ""], ["SELECT ST_asText(coordinates) as coordinates from \"Location\" where id = ", ""])), property.location.id)];
                                case 1:
                                    coordinates = _b.sent();
                                    geoJSON = (0, wkt_1.wktToGeoJSON)(((_a = coordinates[0]) === null || _a === void 0 ? void 0 : _a.coordinates) || "");
                                    longitude = geoJSON.coordinates[0];
                                    latitude = geoJSON.coordinates[1];
                                    return [2 /*return*/, __assign(__assign({}, property), { location: __assign(__assign({}, property.location), { coordinates: {
                                                    longitude: longitude,
                                                    latitude: latitude,
                                                } }) })];
                            }
                        });
                    }); }))];
            case 2:
                residencesWithFormattedLocation = _a.sent();
                res.json(residencesWithFormattedLocation);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res
                    .status(500)
                    .json({ message: "Error retrieving manager properties: ".concat(err_1.message) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getCurrentResidences = getCurrentResidences;
var addFavoriteProperty = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, cognitoId, propertyId, tenant, propertyIdNumber_1, existingFavorites, updatedTenant, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.params, cognitoId = _a.cognitoId, propertyId = _a.propertyId;
                return [4 /*yield*/, prisma.tenant.findUnique({
                        where: { cognitoId: cognitoId },
                        include: { favorites: true },
                    })];
            case 1:
                tenant = _b.sent();
                if (!tenant) {
                    res.status(404).json({ message: "Tenant not found" });
                    return [2 /*return*/];
                }
                propertyIdNumber_1 = Number(propertyId);
                existingFavorites = tenant.favorites || [];
                if (!!existingFavorites.some(function (fav) { return fav.id === propertyIdNumber_1; })) return [3 /*break*/, 3];
                return [4 /*yield*/, prisma.tenant.update({
                        where: { cognitoId: cognitoId },
                        data: {
                            favorites: {
                                connect: { id: propertyIdNumber_1 },
                            },
                        },
                        include: { favorites: true },
                    })];
            case 2:
                updatedTenant = _b.sent();
                res.json(updatedTenant);
                return [3 /*break*/, 4];
            case 3:
                res.status(409).json({ message: "Property already added as favorite" });
                _b.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_4 = _b.sent();
                res
                    .status(500)
                    .json({ message: "Error adding favorite property: ".concat(error_4.message) });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.addFavoriteProperty = addFavoriteProperty;
var removeFavoriteProperty = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, cognitoId, propertyId, propertyIdNumber, updatedTenant, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.params, cognitoId = _a.cognitoId, propertyId = _a.propertyId;
                propertyIdNumber = Number(propertyId);
                return [4 /*yield*/, prisma.tenant.update({
                        where: { cognitoId: cognitoId },
                        data: {
                            favorites: {
                                disconnect: { id: propertyIdNumber },
                            },
                        },
                        include: { favorites: true },
                    })];
            case 1:
                updatedTenant = _b.sent();
                res.json(updatedTenant);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _b.sent();
                res
                    .status(500)
                    .json({ message: "Error removing favorite property: ".concat(err_2.message) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.removeFavoriteProperty = removeFavoriteProperty;
var templateObject_1;
