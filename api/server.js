const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");

// Routes
const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");

// Complete your server here!
// Do NOT `server.listen()` inside this file!
const server = express();

const logger = (req, _, next) => {
  console.log(`[${req.method}] - ${req.path}`);
  next();
};

// middlewares
server.use(logger);
server.use(helmet());
server.use(cors());
server.use(bodyParser.json());

server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

module.exports = server;
