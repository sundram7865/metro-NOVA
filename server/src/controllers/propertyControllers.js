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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProperty = exports.getProperty = exports.getProperties = void 0;
var client_1 = require("@prisma/client");
var wkt_1 = require("@terraformer/wkt");
var client_s3_1 = require("@aws-sdk/client-s3");
var lib_storage_1 = require("@aws-sdk/lib-storage");
var axios_1 = require("axios");
var prisma = new client_1.PrismaClient();
var s3Client = new client_s3_1.S3Client({
    region: process.env.AWS_REGION,
});
var getProperties = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, favoriteIds, priceMin, priceMax, beds, baths, propertyType, squareFeetMin, squareFeetMax, amenities, availableFrom, latitude, longitude, whereConditions, favoriteIdsArray, amenitiesArray, availableFromDate, date, lat, lng, radiusInKilometers, degrees, completeQuery, properties, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.query, favoriteIds = _a.favoriteIds, priceMin = _a.priceMin, priceMax = _a.priceMax, beds = _a.beds, baths = _a.baths, propertyType = _a.propertyType, squareFeetMin = _a.squareFeetMin, squareFeetMax = _a.squareFeetMax, amenities = _a.amenities, availableFrom = _a.availableFrom, latitude = _a.latitude, longitude = _a.longitude;
                whereConditions = [];
                if (favoriteIds) {
                    favoriteIdsArray = favoriteIds.split(",").map(Number);
                    whereConditions.push(client_1.Prisma.sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["p.id IN (", ")"], ["p.id IN (", ")"])), client_1.Prisma.join(favoriteIdsArray)));
                }
                if (priceMin) {
                    whereConditions.push(client_1.Prisma.sql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["p.\"pricePerMonth\" >= ", ""], ["p.\"pricePerMonth\" >= ", ""])), Number(priceMin)));
                }
                if (priceMax) {
                    whereConditions.push(client_1.Prisma.sql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["p.\"pricePerMonth\" <= ", ""], ["p.\"pricePerMonth\" <= ", ""])), Number(priceMax)));
                }
                if (beds && beds !== "any") {
                    whereConditions.push(client_1.Prisma.sql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["p.beds >= ", ""], ["p.beds >= ", ""])), Number(beds)));
                }
                if (baths && baths !== "any") {
                    whereConditions.push(client_1.Prisma.sql(templateObject_5 || (templateObject_5 = __makeTemplateObject(["p.baths >= ", ""], ["p.baths >= ", ""])), Number(baths)));
                }
                if (squareFeetMin) {
                    whereConditions.push(client_1.Prisma.sql(templateObject_6 || (templateObject_6 = __makeTemplateObject(["p.\"squareFeet\" >= ", ""], ["p.\"squareFeet\" >= ", ""])), Number(squareFeetMin)));
                }
                if (squareFeetMax) {
                    whereConditions.push(client_1.Prisma.sql(templateObject_7 || (templateObject_7 = __makeTemplateObject(["p.\"squareFeet\" <= ", ""], ["p.\"squareFeet\" <= ", ""])), Number(squareFeetMax)));
                }
                if (propertyType && propertyType !== "any") {
                    whereConditions.push(client_1.Prisma.sql(templateObject_8 || (templateObject_8 = __makeTemplateObject(["p.\"propertyType\" = ", "::\"PropertyType\""], ["p.\"propertyType\" = ", "::\"PropertyType\""])), propertyType));
                }
                if (amenities && amenities !== "any") {
                    amenitiesArray = amenities.split(",");
                    whereConditions.push(client_1.Prisma.sql(templateObject_9 || (templateObject_9 = __makeTemplateObject(["p.amenities @> ", ""], ["p.amenities @> ", ""])), amenitiesArray));
                }
                if (availableFrom && availableFrom !== "any") {
                    availableFromDate = typeof availableFrom === "string" ? availableFrom : null;
                    if (availableFromDate) {
                        date = new Date(availableFromDate);
                        if (!isNaN(date.getTime())) {
                            whereConditions.push(client_1.Prisma.sql(templateObject_10 || (templateObject_10 = __makeTemplateObject(["EXISTS (\n              SELECT 1 FROM \"Lease\" l \n              WHERE l.\"propertyId\" = p.id \n              AND l.\"startDate\" <= ", "\n            )"], ["EXISTS (\n              SELECT 1 FROM \"Lease\" l \n              WHERE l.\"propertyId\" = p.id \n              AND l.\"startDate\" <= ", "\n            )"])), date.toISOString()));
                        }
                    }
                }
                if (latitude && longitude) {
                    lat = parseFloat(latitude);
                    lng = parseFloat(longitude);
                    radiusInKilometers = 1000;
                    degrees = radiusInKilometers / 111;
                    whereConditions.push(client_1.Prisma.sql(templateObject_11 || (templateObject_11 = __makeTemplateObject(["ST_DWithin(\n          l.coordinates::geometry,\n          ST_SetSRID(ST_MakePoint(", ", ", "), 4326),\n          ", "\n        )"], ["ST_DWithin(\n          l.coordinates::geometry,\n          ST_SetSRID(ST_MakePoint(", ", ", "), 4326),\n          ", "\n        )"])), lng, lat, degrees));
                }
                completeQuery = client_1.Prisma.sql(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n      SELECT \n        p.*,\n        json_build_object(\n          'id', l.id,\n          'address', l.address,\n          'city', l.city,\n          'state', l.state,\n          'country', l.country,\n          'postalCode', l.\"postalCode\",\n          'coordinates', json_build_object(\n            'longitude', ST_X(l.\"coordinates\"::geometry),\n            'latitude', ST_Y(l.\"coordinates\"::geometry)\n          )\n        ) as location\n      FROM \"Property\" p\n      JOIN \"Location\" l ON p.\"locationId\" = l.id\n      ", "\n    "], ["\n      SELECT \n        p.*,\n        json_build_object(\n          'id', l.id,\n          'address', l.address,\n          'city', l.city,\n          'state', l.state,\n          'country', l.country,\n          'postalCode', l.\"postalCode\",\n          'coordinates', json_build_object(\n            'longitude', ST_X(l.\"coordinates\"::geometry),\n            'latitude', ST_Y(l.\"coordinates\"::geometry)\n          )\n        ) as location\n      FROM \"Property\" p\n      JOIN \"Location\" l ON p.\"locationId\" = l.id\n      ", "\n    "])), whereConditions.length > 0
                    ? client_1.Prisma.sql(templateObject_12 || (templateObject_12 = __makeTemplateObject(["WHERE ", ""], ["WHERE ", ""])), client_1.Prisma.join(whereConditions, " AND ")) : client_1.Prisma.empty);
                return [4 /*yield*/, prisma.$queryRaw(completeQuery)];
            case 1:
                properties = _b.sent();
                res.json(properties);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                res
                    .status(500)
                    .json({ message: "Error retrieving properties: ".concat(error_1.message) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getProperties = getProperties;
var getProperty = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, property, coordinates, geoJSON, longitude, latitude, propertyWithCoordinates, err_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                id = req.params.id;
                return [4 /*yield*/, prisma.property.findUnique({
                        where: { id: Number(id) },
                        include: {
                            location: true,
                        },
                    })];
            case 1:
                property = _b.sent();
                if (!property) return [3 /*break*/, 3];
                return [4 /*yield*/, prisma.$queryRaw(templateObject_14 || (templateObject_14 = __makeTemplateObject(["SELECT ST_asText(coordinates) as coordinates from \"Location\" where id = ", ""], ["SELECT ST_asText(coordinates) as coordinates from \"Location\" where id = ", ""])), property.location.id)];
            case 2:
                coordinates = _b.sent();
                geoJSON = (0, wkt_1.wktToGeoJSON)(((_a = coordinates[0]) === null || _a === void 0 ? void 0 : _a.coordinates) || "");
                longitude = geoJSON.coordinates[0];
                latitude = geoJSON.coordinates[1];
                propertyWithCoordinates = __assign(__assign({}, property), { location: __assign(__assign({}, property.location), { coordinates: {
                            longitude: longitude,
                            latitude: latitude,
                        } }) });
                res.json(propertyWithCoordinates);
                _b.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                err_1 = _b.sent();
                res
                    .status(500)
                    .json({ message: "Error retrieving property: ".concat(err_1.message) });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getProperty = getProperty;
var createProperty = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var files, _a, address, city, state, country, postalCode, managerCognitoId, propertyData, photoUrls, geocodingUrl, geocodingResponse, _b, longitude, latitude, location_1, newProperty, err_2;
    var _c, _d, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _g.trys.push([0, 5, , 6]);
                files = req.files;
                _a = req.body, address = _a.address, city = _a.city, state = _a.state, country = _a.country, postalCode = _a.postalCode, managerCognitoId = _a.managerCognitoId, propertyData = __rest(_a, ["address", "city", "state", "country", "postalCode", "managerCognitoId"]);
                return [4 /*yield*/, Promise.all(files.map(function (file) { return __awaiter(void 0, void 0, void 0, function () {
                        var uploadParams, uploadResult;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    uploadParams = {
                                        Bucket: process.env.S3_BUCKET_NAME,
                                        Key: "properties/".concat(Date.now(), "-").concat(file.originalname),
                                        Body: file.buffer,
                                        ContentType: file.mimetype,
                                    };
                                    return [4 /*yield*/, new lib_storage_1.Upload({
                                            client: s3Client,
                                            params: uploadParams,
                                        }).done()];
                                case 1:
                                    uploadResult = _a.sent();
                                    return [2 /*return*/, uploadResult.Location];
                            }
                        });
                    }); }))];
            case 1:
                photoUrls = _g.sent();
                geocodingUrl = "https://nominatim.openstreetmap.org/search?".concat(new URLSearchParams({
                    street: address,
                    city: city,
                    country: country,
                    postalcode: postalCode,
                    format: "json",
                    limit: "1",
                }).toString());
                return [4 /*yield*/, axios_1.default.get(geocodingUrl, {
                        headers: {
                            "User-Agent": "RealEstateApp (justsomedummyemail@gmail.com",
                        },
                    })];
            case 2:
                geocodingResponse = _g.sent();
                _b = ((_c = geocodingResponse.data[0]) === null || _c === void 0 ? void 0 : _c.lon) && ((_d = geocodingResponse.data[0]) === null || _d === void 0 ? void 0 : _d.lat)
                    ? [
                        parseFloat((_e = geocodingResponse.data[0]) === null || _e === void 0 ? void 0 : _e.lon),
                        parseFloat((_f = geocodingResponse.data[0]) === null || _f === void 0 ? void 0 : _f.lat),
                    ]
                    : [0, 0], longitude = _b[0], latitude = _b[1];
                return [4 /*yield*/, prisma.$queryRaw(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n      INSERT INTO \"Location\" (address, city, state, country, \"postalCode\", coordinates)\n      VALUES (", ", ", ", ", ", ", ", ", ", ST_SetSRID(ST_MakePoint(", ", ", "), 4326))\n      RETURNING id, address, city, state, country, \"postalCode\", ST_AsText(coordinates) as coordinates;\n    "], ["\n      INSERT INTO \"Location\" (address, city, state, country, \"postalCode\", coordinates)\n      VALUES (", ", ", ", ", ", ", ", ", ", ST_SetSRID(ST_MakePoint(", ", ", "), 4326))\n      RETURNING id, address, city, state, country, \"postalCode\", ST_AsText(coordinates) as coordinates;\n    "])), address, city, state, country, postalCode, longitude, latitude)];
            case 3:
                location_1 = (_g.sent())[0];
                return [4 /*yield*/, prisma.property.create({
                        data: __assign(__assign({}, propertyData), { photoUrls: photoUrls, locationId: location_1.id, managerCognitoId: managerCognitoId, amenities: typeof propertyData.amenities === "string"
                                ? propertyData.amenities.split(",")
                                : [], highlights: typeof propertyData.highlights === "string"
                                ? propertyData.highlights.split(",")
                                : [], isPetsAllowed: propertyData.isPetsAllowed === "true", isParkingIncluded: propertyData.isParkingIncluded === "true", pricePerMonth: parseFloat(propertyData.pricePerMonth), securityDeposit: parseFloat(propertyData.securityDeposit), applicationFee: parseFloat(propertyData.applicationFee), beds: parseInt(propertyData.beds), baths: parseFloat(propertyData.baths), squareFeet: parseInt(propertyData.squareFeet) }),
                        include: {
                            location: true,
                            manager: true,
                        },
                    })];
            case 4:
                newProperty = _g.sent();
                res.status(201).json(newProperty);
                return [3 /*break*/, 6];
            case 5:
                err_2 = _g.sent();
                res
                    .status(500)
                    .json({ message: "Error creating property: ".concat(err_2.message) });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.createProperty = createProperty;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15;
