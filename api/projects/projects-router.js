// Write your "projects" router here!
const { Router } = require("express");
const {
  getProjectActions,
  get,
  insert,
  update,
  remove,
} = require("./projects-model");

const projects = Router();

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
    res.json(data);
  });
});

projects.get("/:id", (req, res) => {
  const id = req.params.id;

  get(id).then((data) => {
    if (!data) {
      res.status(404).end();
      return;
    }

    res.status(200).json(data);
  });
});

projects.post("/", (req, res) => {
  const info = req.body;
  if (!!info.name && !!info.description && info.completed !== undefined) {
    insert(req.body).then((data) => {
      res.status(200).json(data);
    });
  } else {
    res.status(400).eng();
  }
});

projects.put("/:id", (req, res) => {
  const id = req.params.id;

  const info = req.body;

  if (!!info.name && !!info.description && info.completed !== undefined) {
    update(id, info).then((data) => {
      res.status(200).json(data);
    });
  } else {
    res.status(400).end();
  }
});

projects.delete("/:id", (req, res) => {
  const id = req.params.id;
  remove(id).then((data) => {
    if (!data) {
      res.status(404).end();
      return;
    }
    res.status(200).end();
  });
});

module.exports = projects;
