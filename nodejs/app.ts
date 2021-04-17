var bodyParser = require("body-parser");
var express = require("express");
const cors = require("cors");
var app = express();
app.use(cors());

const port = 8082;
// parse incoming requests
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const swaggerRoute = `${__dirname}/api/router/routes.js`;
require(swaggerRoute)(app);

// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
