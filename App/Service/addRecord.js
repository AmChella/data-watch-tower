import Database from "../Adapter/database.js";
const dbAdapter = new Database();
export default class AddRecord {
  add(req) {
    return dbAdapter.insert(req);
  }
}
