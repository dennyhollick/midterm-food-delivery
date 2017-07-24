// This module is not used, but can be to retrieve all orders.

const express = require('express');

const router = express.Router();

module.exports = (knex) => {
  router.get('/orders', (req, res) => {
    knex
      .select('*')
      .from('orders')
      .then((results) => {
        res.json(results);
      });
  });
  return router;
};
