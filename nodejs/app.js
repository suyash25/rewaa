var bodyParser = require("body-parser");
var express = require("express");
var cors = require("cors");
var app = express();
app.use(cors());
var port = 8082;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
var swaggerRoute = __dirname + "/api/router/routes.js";
require(swaggerRoute)(app);
app.listen(port, function () {
    console.log("server started at http://localhost:" + port);
});
//# sourceMappingURL=app.js.map