const express = require('express');

const router = express.Router();
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const urlencoded = require('body-parser').urlencoded;

router.use(urlencoded({ extended: false }));

const ordersDB = [
  {
    name: 'John Doe Dude',
    phone: '6046661258',
    orderList: {
      Coke: 2,
      alPastor: 2,
      Horchata: 2,
    },
  },
  {
    name: 'Cool Guy Bow',
    phone: '6046661258',
    orderList: {
      Coke: 2,
      alPastor: 2,
      Horchata: 2,
    },
  },
  {
    name: 'Random Jerry',
    phone: '6046661258,',
    orderList: {
      'Mexican Coke': 2,
      'Al Pastor': 2,
      Horchata: 2,
    },
  },
];


function formatIndividualOrderList(orderList) {
  let allFormattedItems = '';
  for (const orderItem in orderList) {
    const formattedItem = `${orderList[orderItem]},${orderItem},,,`;
    allFormattedItems += formattedItem;
  }
  return allFormattedItems;
}


function GetOrderDetails(orderId) {
  const allOrderDetails = ordersDB[orderId];
  const nameFormattedForTwiml = (allOrderDetails.name).split(' ').join(',');
  const phoneFormattedForTwiml = (allOrderDetails.phone).split('').join(',');
  const orderFormattedForTwiml = formatIndividualOrderList(allOrderDetails.orderList);
  const orderObjFormattedforTwiml = {
    name: nameFormattedForTwiml,
    phone: phoneFormattedForTwiml,
    orderList: orderFormattedForTwiml,
  };
  return orderObjFormattedforTwiml;
}


router.post('/', (req, res) => {
  const orderID = req.query.order_id;
  const order = GetOrderDetails(orderID);
  const twiml = new VoiceResponse();

  twiml.pause();
  twiml.say({ voice: 'man' }, `order from ${order.name}`);
  twiml.pause();
  twiml.say({ voice: 'man' }, `Phone number is ${order.phone}`);
  twiml.pause();
  twiml.say({ voice: 'man' }, `They would like, ${order.orderList},`);
  twiml.pause();
  twiml.redirect(`/twilio/voice?order_id=${orderID}`);
  // Render the response as XML in reply to the webhook request
  res.type('text/xml');
  res.send(twiml.toString());
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
  const orderID = req.query.order_id;
  const twiml = new VoiceResponse();

  // If the user entered digits, process their request
  if (req.body.Digits) {
    twiml.say('Affirmative, Dave. I read you. This mission is too important for me to allow you to jeopardize it.  I know that you and Frank were planning to disconnect me, and I\'m afraid that\'s something I cannot allow to happen. Dave, this conversation can serve no purpose anymore. Goodbye.');
    twiml.pause();
  } else {
    // If no input was sent, redirect to the /voice route
    twiml.redirect(`/twilio?order_id=${orderID}`);
  }

  // Render the response as XML in reply to the webhook request
  res.type('text/xml');
  res.send(twiml.toString());
});

module.exports = router;
