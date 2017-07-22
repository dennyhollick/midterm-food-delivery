const express = require('express');

const router = express.Router();
const VoiceResponse = require('twilio').twiml.VoiceResponse;

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
      'Horchata': 2,
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

router.get('/', (req, res) => {
  const orderID = req.query.order_id;
  const order = GetOrderDetails(orderID);
  const twiml = new VoiceResponse();
  twiml.say({ voice: 'man' }, `order from ${order.name}`);
  twiml.pause();
  twiml.say({ voice: 'man' }, `Phone number is ${order.phone}`);
  twiml.pause();
  twiml.say({ voice: 'man' }, `They would like, ${order.orderList},`);
  twiml.pause();
  twiml.say({ voice: 'man' }, 'Press 1 to accept the order, 2 to repeat, and 3 to reject.');
  // Render the response as XML in reply to the webhook request
  res.type('text/xml');
  res.send(twiml.toString());
});

module.exports = router;

GetOrderDetails(1);
