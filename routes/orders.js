"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/orders", (req, res) => {
    knex
      .select("*")
      .from("orders")
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}
