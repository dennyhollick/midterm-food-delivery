"use strict";

const express = require('express');

const router = express.Router();

module.exports = (knex) => {

  router.post("/cart/place_order", (req, res) => {
    knex
      .insert([{
        name: JSON.parse(req.body.data).name,
        phone: JSON.parse(req.body.data).phone,
        cart: JSON.parse(req.body.data).cart,
      }])
      .into("orders")
      .then((results) => {})
  });

  return router;
}
