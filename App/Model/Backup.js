import mongoose from "mongoose";
import BackupModel from "../Config/BackupModel.json" assert { type: "json" };
export default class ModelBackup {
  async getModel(data) {
    let Model =
      mongoose.models.Backup ||
      mongoose.model("Backup", new mongoose.Schema(BackupModel));
    return new Model({
      ip: data.ip,
      datetime: data.datetime,
      databases: data.databases,
      location: data.location,
      name: data.name,
      filename: data.filename,
    });
  }
}
