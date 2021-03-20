// Write your "actions" router here!
const { Router } = require("express");
const { get } = require("./actions-model");

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

// Put returns updated action

// Delete returns nothing

module.exports = actions;
