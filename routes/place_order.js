'use strict';

const express = require('express');
const twilio = require('../server/make_call.js');

const router = express.Router();

module.exports = (knex) => {
  router.post('/cart/place_order', (req, res) => {
    console.log(req.body);
    knex
      .insert([{
        name: JSON.parse(req.body.data).name,
        phone: JSON.parse(req.body.data).phone,
        cart: JSON.parse(req.body.data).cart,
      }])
      .returning('id')
      .into('orders')
      .then((id) => {
        twilio(id);
      });
  });

  return router;
};
