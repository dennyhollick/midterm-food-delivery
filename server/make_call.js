// This function initiates the call to a restaurant with an orderID as the input.
// Use .env file to store Twilio account credentials and number to call.
// Number format should be string (eg. '+17789981234')

require('dotenv').config({ path: '../.env' });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
const recipient = process.env.NUMBER_TO_CALL;

const client = require('twilio')(accountSid, authToken);

function startCall(orderId) {
  client.calls.create({

    url: `http://b5f5fbb1.ngrok.io/twilio?order_id=${orderId}`,
    to: recipient,
    from: twilioPhone,
  }, (err, call) => {
    process.stdout.write(call.sid);
  });
}

// startCall(2);
