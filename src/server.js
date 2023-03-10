import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import passport from "passport";
import mongoose from "mongoose";
import {
  badRequestHandler,
  notFoundHandler,
  genericErrorHandler,
} from "./errorHandlers.js";
import usersRouter from "./api/users/index.js";
import accommodationsRouter from "./api/accommodations/index.js";

const server = express();
const port = process.env.PORT || 3002;

// MIDDLEWARES
server.use(cors());
server.use(express.json());
server.use(passport.initialize());

//  ENDPOINTS
server.use("/users", usersRouter);
server.use("/accommodations", accommodationsRouter);
// ERROR HANDLERS
server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to Mongo!");
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`Server is running on port ${port}`);
  });
});
