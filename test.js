import IngestController from "./App/Controller/ingest.js";
// import welcomeController from "./App/Contoller/welcomeController.js";
// const test = ["welcomeController", "greetUser"];

// let klass = eval(test[0]);
// let klassIns = new klass();
// console.log(klassIns[test[1]]());
const inst = new IngestController();
let result = await inst.record({
  body: {
    ip: "test",
    name: "test",
    datetime: "01/02/2022 00:04:00",
    databases: "test, test",
    location: "/some",
    filename: "test.gz",
  },
});
console.log(result);
