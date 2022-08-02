import Backup from "../Repository/Backup.js";
export default class AddRecord {
  constructor() {
    this.repository = new Backup();
  }
  add(req) {
    return this.repository.insert(req);
  }
}
