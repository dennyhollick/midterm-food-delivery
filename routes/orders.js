"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/orders/:id", (req, res) => {
    const orderId = req.params.id;
    knex
      .select("*")
      .from("orders")
      .where('id', orderId)
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}
