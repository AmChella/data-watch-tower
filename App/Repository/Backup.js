import ModelBackup from "../Model/Backup.js";
import Database from "../Adapter/database.js";
import mongoose from "mongoose";
export default class Backup extends ModelBackup {
  static connection;
  constructor() {
    super();
    this.db = new Database();
  }

  async makeConnection() {
    let dbConnection = await this.db.connect();
    const con = dbConnection.connection;
    con.on("error", (error) => {
      throw new Error("Error.in.connecting", error);
    });

    con.once("success", () => {
      console.log("db.connection.success");
    });
  }

  closeConnection() {
    if (this.connection) {
      this.connection.close();
    }
  }

  async insert(data) {
    await this.makeConnection();
    let record = await this.getModel(data);
    let dataSaved = await record.save();
    return dataSaved;
  }
}
