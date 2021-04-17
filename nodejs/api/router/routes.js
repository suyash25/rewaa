"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parser = require("body-parser");
var express_1 = require("express");
var product_controller_1 = require("../controllers/product.controller");
module.exports = function (app) {
    var router = express_1.Router();
    router.use(parser.json({ type: "application/json" }));
    router.get("/productlist", product_controller_1.default.getProductDetails.bind(product_controller_1.default));
    router.post("/users/authenticate", product_controller_1.default.getUserDetails.bind(product_controller_1.default));
    router.delete("/users/:id/delete", product_controller_1.default.deleteUser.bind(product_controller_1.default));
    router.delete("/users/delete", product_controller_1.default.deleteAllusers.bind(product_controller_1.default));
    app.use("/api", router);
};
//# sourceMappingURL=routes.js.map