import mongoose from "mongoose";
import appJson from "../Config/App.json" assert { type: "json" };
export default class Database {
  getConnectionString() {
    let username = appJson["dbms"]["username"];
    let password = appJson["dbms"]["password"];
    let host = appJson["dbms"]["host"];
    let db = "test";
    console.log(`mongodb://${username}:${password}@${host}/${db}`);
    return `mongodb://${username}:${password}@${host}/${db}`;
  }

  connect() {
    let url = this.getConnectionString();
    mongoose.connect(url);
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
    const record = this.createModel("record", req.body);
    try {
      const dataSaved = await record.save();
      return dataSaved;
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
