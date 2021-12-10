import mongoose from "mongoose";
import config from "config";
import log from "./logger";

const connect = () => {
  const dbConnectStr = config.get<string>("dbUri");

  return mongoose
    .connect(dbConnectStr)
    .then(() => {
      log.info("Mongoose Connected to Mongo Database successfully");
    })
    .catch((error) => {
      log.error(`Could not connect to Mongo Database: ${error}`);
      process.exit(1);
    });
};
export default connect;
