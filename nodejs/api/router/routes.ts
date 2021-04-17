import * as parser from "body-parser";
import { Application, Router } from "express";
import products from "../controllers/product.controller";

module.exports = (app: Application) => {
  const router: Router = Router();
  router.use(parser.json({ type: "application/json" }));

  router.get("/productlist", products.getProductDetails.bind(products));
  router.post("/users/authenticate", products.getUserDetails.bind(products));
  router.delete("/users/:id/delete", products.deleteUser.bind(products));
  router.delete("/users/delete", products.deleteAllusers.bind(products));
  app.use("/api", router);
};
