import Routing from "./Router/Routing.js";
import express from "express";
const app = new express();
const route = new Routing();
export default class Application {
  async run() {
    route.run(app);
    app.listen(5000);
  }
}
