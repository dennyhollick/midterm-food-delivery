"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  router.post("/cart/place_order", (req, res) => {
    knex
      .insert([{
        name: req.body.name,
        phone: req.body.phone,
        userid: item(), 
      }])
      .into("orders")
      .then((results) => {})
  });

  return router;
}
