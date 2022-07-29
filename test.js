import appJson from "./App/Config/App.json" assert { type: "json" };
import mongoose from "mongoose";
// import welcomeController from "./App/Contoller/welcomeController.js";
// const test = ["welcomeController", "greetUser"];

// let klass = eval(test[0]);
// let klassIns = new klass();
// console.log(klassIns[test[1]]());

export default class Database {
  getConnectionString() {
    let username = appJson["dbms"]["username"];
    let password = appJson["dbms"]["password"];
    let host = appJson["dbms"]["host"];
    let db = "test";
    // return `mongodb+srv://report:qXF1EM3P4FA3FufH@cluster0.xz96p.mongodb.net/${db}?retryWrites=true&w=majority`;
    // console.log(`mongodb://${username}:${password}@${host}/${db}`);
    return `mongodb://${host}/${db}`;
  }

  async connect() {
    let url = this.getConnectionString();
    await mongoose.connect(url, {
      authSource: "admin",
      user: appJson["dbms"]["username"],
      pass: appJson["dbms"]["password"],
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const database = mongoose.connection;
    database.on("error", (error) => {
      console.log(error);
    });
    database.once("success", () => {
      console.log("success");
    });
  }

  createModel(schema, data) {
    this.connect();
    const modelSchema = new mongoose.Schema(appJson[schema]);
    const Model = mongoose.model(schema, modelSchema);
    return new Model({
      ip: data.ip,
      date: data.date,
      databases: data.databases,
      location: data.location,
      name: data.name,
      filename: data.filename,
    });
  }

  async insert(req) {
    const record = this.createModel("db_backup", req.body);
    try {
      return await record.save();
    } catch (error) {
      console.log(error);
      return {
        message: "insert.action.failed",
        status: false,
        error: error,
        error_no: 500,
        data: [],
      };
    }
  }
}

let ins = new Database();
let result = await ins.insert({
  body: {
    ip: "test",
    name: "test",
    date: "test",
    databases: "test, test",
    location: "/some",
    filename: "test.gz",
  },
});
console.log(result);
