// Write your "projects" router here!
const { Router } = require("express");
const { getProjectActions, get, remove } = require("./projects-model");

const projects = Router();

const groupExist = (req, res, next) => {
  if (!req.params.id) {
    res.status(404);
    return;
  }
  get(Number(req.params.id)).then((data) => {
    if (!data) {
      res.status(404);
      return;
    }

    if (data) {
      next();
    }
  });
};

projects.get("/", (req, res) => {
  get().then((data) => {
    res.status(200).json(data);
  });
});

projects.get("/:id/actions", (req, res) => {
  const id = req.params.id;
  console.log(id);

  getProjectActions(Number(id)).then((data) => {
    console.log(data);
    if (!data || data.length === 0) {
      res.status(404).json([]);
      return;
    }
    res.json(data);
  });
});

projects.delete("/:id", groupExist, async (req, _) => {
  const id = req.params.id;
  remove(id);
  return;
});

module.exports = projects;
