const express = require("express");
const { loliClient } = require("./loliClient");
const loliRouter = express.Router();

loliRouter.get("/", (req, res) => {
  loliClient.getLolis(null, (err, lolis) => {
    return res.json(lolis);
  });
});

loliRouter.get("/:_id", (req, res) => {
  const { _id } = req.params;
  const request = { _id };
  loliClient.getLoli(request, (err, loli) => {
    return res.json(loli);
  });
});

loliRouter.post("/", (req, res) => {
  const { firstName, lastName, age, isLewded } = req.body;

  const loli = {
    firstName,
    lastName,
    age,
    isLewded,
  };

  console.log(loli);

  loliClient.addLoli(loli, (err, loli) => {
    console.log(loli);
    return res.json(loli);
  });

  // return res.json({ message: "IN  PROGRESS" });
});

loliRouter.put("/:_id", (req, res) => {
  const { _id } = req.params;
  const { firstName, lastName, age, isLewded } = req.body;

  const loli = {
    _id,
    firstName,
    lastName,
    age,
    isLewded,
  };

  loliClient.updateLoli(loli, (err, updatedLoli) => {
    return res.json(updatedLoli);
  });
});

loliRouter.delete("/:_id", (req, res) => {
  const { _id } = req.params;

  loliClient.deleteLoli({ _id }, (err, response) => {
    return res.json(response);
  });

  // return res.json({ message: "TEMP" });
});

module.exports = { loliRouter };
