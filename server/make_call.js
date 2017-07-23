
// This function initiates the call to a restaurant with an orderID as the input.

require('dotenv').config({ path: '../.env' });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

const client = require('twilio')(accountSid, authToken);

function startCall(orderId) {
  client.calls.create({

    url: `http://b5f5fbb1.ngrok.io/twilio?order_id=${orderId}`,
    to: '+17783864605',
    from: twilioPhone,
  }, (err, call) => {
    process.stdout.write(call.sid);
  });
}

// startCall(2);
