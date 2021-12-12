import express from "express";
import config from "config";
import connect from "./utils/connect";
import log from "./utils/logger";
import routes from "./routes";
import pullUserDetails from "./middleware/pullUserFromRequest";

const port = config.get<number>("port");

const app = express();

app.use(express.json());
//pull user auth details
app.use(pullUserDetails);

app.listen(port, async () => {
  log.info(`Simple CRM - Server - Started on port ${port}`);
  await connect();
  //Call the routes
  routes(app);
});
