// This function initiates the sms to the person ordering.
// Use .env file to store Twilio account credentials and number to call.
// Number format should be string (eg. '+17789981234')
// While in development environment, need to download and configure NGROK in order to make
// the localhost sever availible to the twilio API. Configure URL in .env


require('dotenv').config({ path: '../.env' });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
const recipient = process.env.NUMBER_TO_CALL;

const client = require('twilio')(accountSid, authToken);

module.exports = function sendClientNotifications(phone, orderTime) {
// Create options to send the message
  const options = {
    to: phone,
    from: twilioPhone,
/* eslint-disable max-len */
    body: `Your order has been confirmed! You can pick it up in ${orderTime} minutes`,
/* eslint-enable max-len */
  };

// Send the message!
  client.messages.create(options, (err) => {
    if (err) {
      console.error(err);
    } else {
// Log the last few digits of a phone number
      let masked = recipient.substr(0,
                    recipient.length - 5);
      masked += '*****';
      console.log(`Confirmed order and sent to ${masked}`);
    }
  });
};

