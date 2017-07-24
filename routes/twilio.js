const express = require('express');

const ENV = process.env.ENV || 'development';
const router = express.Router();
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const urlencoded = require('body-parser').urlencoded;
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[ENV]);
const sendText = require('../server/send_sms.js');

router.use(urlencoded({ extended: false }));

// Helper functions for Twiml XML

function formatIndividualOrderList(orderList) {
  let allFormattedItems = '';
  const parsedList = JSON.parse(orderList);
  for (const orderItem in parsedList) {
    const formattedItem = `${parsedList[orderItem]}, ${orderItem},,`;
    allFormattedItems += formattedItem;
  }
  return allFormattedItems;
}

function formatOrderDetailsForTwiml(order) {
  const nameFormattedForTwiml = (order.name).split(' ').join(',');
  const phoneFormattedForTwiml = (order.phone).split('').join(',');
  const orderFormattedForTwiml = formatIndividualOrderList(order.cart);
  const NewObjFormattedforTwiml = {
    id: order.id,
    name: nameFormattedForTwiml,
    phone: phoneFormattedForTwiml,
    orderList: orderFormattedForTwiml,
  };
  return NewObjFormattedforTwiml;
}

function createCallXml(order) {
  const twiml = new VoiceResponse();
  twiml.pause();
  twiml.say({ voice: 'man' }, `order from ${order.name}`);
  twiml.pause();
  twiml.say({ voice: 'man' }, `Phone number is ${order.phone}`);
  twiml.pause();
  twiml.say({ voice: 'man' }, `They would like, ${order.orderList},`);
  twiml.pause();
  twiml.redirect(`/twilio/voice?order_id=${order.id}`);
// Render the response as XML in reply to the webhook request
  return twiml.toString();
}

// DB Call Functions

function callOrderFromDb(orderId, res) {
  knex
      .select('*')
      .from('orders')
      .where('id', orderId)
      .then((results) => {
        const resultsObject = results[0];
        const formattedObjForTwml = formatOrderDetailsForTwiml(resultsObject);
        const callXML = createCallXml(formattedObjForTwml);
        res.type('text/xml');
        res.send(callXML.toString());
      });
}

function GetPhoneFromDbAndSendText(orderId, time) {
  knex
      .select('*')
      .from('orders')
      .where('id', orderId)
      .then((results) => {
        const resultsObject = results[0];
        const phoneNumber = resultsObject.phone;
        sendText(phoneNumber, time);
      });
}

// XML Routes for calls and Twilio Logic

router.post('/', (req, res) => {
  const orderId = req.query.order_id;
  callOrderFromDb(orderId, res);
});

router.post('/voice', (req, res) => {
  const orderID = req.query.order_id;
  const twiml = new VoiceResponse();

  const gather = twiml.gather({
    input: 'dtmf',
    timeout: 5,
    numDigits: 1,
    action: `/twilio/gather?order_id=${orderID}`,
    method: 'POST',
  });
  gather.say('To accept this order, Press 1, To Repeat this order, Press 2');

// If the user doesn't enter input, loop
  twiml.redirect('/twilio/voice');

// Render the response as XML in reply to the webhook request
  res.type('text/xml');
  res.send(twiml.toString());
});

// Route that will handle repeat order or accept <Gather> input
router.post('/gather', (req, res) => {
  const orderID = req.query.order_id;
  const twiml = new VoiceResponse();

// If the user entered digits, process their request
  if (req.body.Digits) {
    switch (req.body.Digits) {
      case '1': {
        const gather = twiml.gather({
          input: 'dtmf',
          timeout: 5,
          numDigits: 3,
          action: `/twilio/accepted?order_id=${orderID}`,
          method: 'POST',
        });
        gather.say('Please enter in minutes how long it will take before the order is ready followed by the pound key.');
        break;
      }
      case '2': twiml.redirect(`/twilio?order_id=${orderID}`); break;
      default:
        twiml.say('Sorry, I don\'t understand that choice.').pause();
        twiml.redirect(`/twilio/voice?order_id=${orderID}`);
        break;
    }
  } else {
// If no input was sent, redirect to the /voice route
    twiml.redirect(`/twilio/voice?order_id=${orderID}`);
  }

// Render the response as XML in reply to the webhook request
  res.type('text/xml');
  res.send(twiml.toString());
});

// Route that will handle accepted <Gather> input
router.post('/accepted', (req, res) => {
  const orderId = req.query.order_id;
  const twiml = new VoiceResponse();

// If the user entered digits, process their request
  if (req.body.Digits) {
    GetPhoneFromDbAndSendText(orderId, req.body.Digits);
    twiml.say('Affirmative, Dave. I read you. This mission is too important for me to allow you to jeopardize it.  I know that you and Frank were planning to disconnect me, and I\'m afraid that\'s something I cannot allow to happen. Dave, this conversation can serve no purpose anymore. Goodbye.');
    twiml.pause();
  } else {
// If no input was sent, redirect to the /voice route
    twiml.redirect(`/twilio?order_id=${orderId}`);
  }

// Render the response as XML in reply to the webhook request
  res.type('text/xml');
  res.send(twiml.toString());
});

module.exports = router;
