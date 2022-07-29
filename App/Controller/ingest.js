import AddRecord from "../Service/addRecord.js";
export default class IngestController {
  service = new AddRecord();
  record(req) {
    let response = this.service.add(req);
  }
}
