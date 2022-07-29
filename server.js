import Application from "./App/App.js";
const app = new Application();
try {
  app.run();
} catch (err) {
  console.log(err);
}
