import object from "../Config/Routes.json" assert { type: "json" };
import express from "express";
import welcomeController from "../Controller/welcome.js";
import ingestController from "../Controller/ingest.js";
const router = express.Router();
const templateResponse = {
  message: "Welcome to rest service monitoring",
  status: true,
  error: null,
  eror_no: null,
  data: [],
};
export default class Routing {
  async runController(req, res, item) {
    let service = item["service"].split("->");
    let klass = eval(service[0]);
    let klassIns = new klass();
    return await klassIns[service[1]](req);
  }

  run(app) {
    router.use((req, res, next) => {
      console.log("Time :", Date.now());
      next();
    });

    object.forEach((item) => {
      switch (item["method"]) {
        case "get":
          router.get(item["path"], (req, res) => {
            let response = this.runController(req, res, item);
            res.json(response);
          });
          break;
        case "post":
          router.post(item["path"], async (req, res) => {
            let response = await this.runController(req, res, item);
            res.json(response);
          });
          break;
        case "put":
          router.put(item["path"], (req, res) => {
            res.json(templateResponse);
          });
          break;
        case "delete":
          router.delete(item["path"], (req, res) => {
            res.json(templateResponse);
          });
          break;
        default:
          console.log(item["path"]);
          throw Error("error on routing");
      }
    });
    app.use(express.json());
    app.use(router);
  }
}
