import AddRecord from "../Service/addRecord.js";
export default class IngestController {
  responseSchema = {
    message: "the.record.has.been.inserted",
    status: true,
    data: [],
    error: null,
    error_no: null,
  };

  constructor() {
    this.service = new AddRecord();
  }

  async record(req) {
    let response = await this.service.add(req.body);
    let json = this.responseSchema;
    json.data = { id: response._id };
    return json;
  }
}
