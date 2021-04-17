import { MongoClient } from "mongodb";

export const Collection = "productsList";
export const dbName = "products-list";
export const getMongoClient = async (uri: string): Promise<MongoClient> => {
  try {
    // connecting to mongo
    const connection = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    return connection;
  } catch (err) {
    console.error(err);

    throw err;
  }
};

export const getCollection = async () => {
  const config = "mongodb://localhost:27017/";
  const client = await getMongoClient(config);
  const col = client.db("product-list").collection("productsList");
  return await col.find({}).toArray();
};

export const getUserInfo = async () => {
  const config = "mongodb://localhost:27017/";
  const client = await getMongoClient(config);
  const col = client.db("product-list").collection("Users");
  return await col.find({}).toArray();
};
export const deleteUserInfo = async (userInfo) => {
  const config = "mongodb://localhost:27017/";
  const client = await getMongoClient(config);
  const col = client.db("product-list").collection("productsList");
  //const filter=await col.find({Name:userInfo});
  return await col.deleteOne({ Name: userInfo });
};

export const deleteAllUser = async () => {
  const config = "mongodb://localhost:27017/";
  const client = await getMongoClient(config);
  const col = client.db("product-list").collection("productsList");
  return await col.deleteMany({});
};
