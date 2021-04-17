import {
  getCollection,
  getUserInfo,
  deleteUserInfo,
  deleteAllUser,
} from "./mongo.controller";

class products {
  constructor() {}

  public async getProductDetails(req, res, next): Promise<any> {
    try {
      const prodLists = await getCollection();
      res.send(prodLists);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  public async deleteUser(req, res, next): Promise<any> {
    try {
      let userId = req.params.id;
      const prodLists = await deleteUserInfo(userId);
      res.send(prodLists);
    } catch (err) {
      console.error(err);
      res.send(err);
    }
  }
  public async deleteAllusers(req, res, next): Promise<any> {
    try {
      const prodLists = await deleteAllUser();
      res.send(prodLists);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  public async getUserDetails(req, res, next): Promise<any> {
    try {
      const userLists = await getUserInfo();
      let user;
      let valueCheck = userLists.findIndex((elem, index) => {
        if (
          elem.name === req.body.username &&
          elem.password === req.body.password
        ) {
          user = elem;
          return true;
        }
      });
      if (valueCheck > -1) {
        res.send(user);
      } else {
        res.status(500).send({ error: "Username or password is incorrect" });
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
export default new products();
