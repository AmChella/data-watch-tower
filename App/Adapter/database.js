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
    return mongoose.connect(url, {
      authSource: "admin",
      user: appJson["dbms"]["username"],
      pass: appJson["dbms"]["password"],
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}
