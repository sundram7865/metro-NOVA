"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var body_parser_1 = require("body-parser");
var cors_1 = require("cors");
var helmet_1 = require("helmet");
var morgan_1 = require("morgan");
var authMiddleware_1 = require("./middleware/authMiddleware");
/* ROUTE IMPORT */
var tenantRoutes_1 = require("./routes/tenantRoutes");
var managerRoutes_1 = require("./routes/managerRoutes");
var propertyRoutes_1 = require("./routes/propertyRoutes");
var leaseRoutes_1 = require("./routes/leaseRoutes");
var applicationRoutes_1 = require("./routes/applicationRoutes");
/* CONFIGURATIONS */
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
/* ROUTES */
app.get("/", function (req, res) {
    res.send("This is home route");
});
app.use("/applications", applicationRoutes_1.default);
app.use("/properties", propertyRoutes_1.default);
app.use("/leases", leaseRoutes_1.default);
app.use("/tenants", (0, authMiddleware_1.authMiddleware)(["tenant"]), tenantRoutes_1.default);
app.use("/managers", (0, authMiddleware_1.authMiddleware)(["manager"]), managerRoutes_1.default);
/* SERVER */
var port = Number(process.env.PORT) || 3002;
app.listen(port, "0.0.0.0", function () {
    console.log("Server running on port ".concat(port));
});
