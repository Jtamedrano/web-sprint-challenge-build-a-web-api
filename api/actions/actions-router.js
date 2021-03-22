// Write your "actions" router here!
const { Router } = require("express");
const { get, insert, update, remove } = require("./actions-model");

const actions = Router();

// Get an array of actions
actions.get("/", (req, res) => {
  console.log("get triggered");
  get().then((data) => {
    if (!data || data.length === 0) {
      res.status(404).json([]);
      return;
    }
    res.status(200).json(data);
  });
});

// Get an action with the given 'id'
actions.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log("get triggered with id " + id);
  get(Number(id)).then((data) => {
    if (!data || data.length === 0) {
      res.status(404).json({ data: [] });
      return;
    }
    res.status(200).json(data);
  });
});

// Post returns newly created action
actions.post("/", (req, res) => {
  const newUserInfo = req.body;

  if (
    newUserInfo.completed !== undefined &&
    newUserInfo.notes !== undefined &&
    newUserInfo.description !== undefined &&
    newUserInfo.project_id !== undefined
  ) {
    insert(newUserInfo).then((data) => {
      res.status(200).json(data);
    });
  } else {
    res.status(400).json({ message: "Not Complete" });
    return;
  }
});
// Put returns updated action
actions.put("/:id", (req, res) => {
  const id = req.params.id;
  if (
    req.body.completed !== undefined &&
    req.body.notes !== undefined &&
    req.body.description !== undefined &&
    req.body.project_id !== undefined
  ) {
    update(id, req.body).then((data) => {
      res.status(201).json(data);
    });
  } else {
    res.status(400).end();
  }
});

// Delete returns nothing
actions.delete("/:id", (req, res) => {
  const id = req.params.id;

  remove(id).then(() => {
    res.status(200).end();
  });
});

module.exports = actions;
