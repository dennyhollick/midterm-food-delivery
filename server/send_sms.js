require('dotenv').config({ path: '../.env' });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
const recipient = process.env.NUMBER_TO_CALL;

const client = require('twilio')(accountSid, authToken);

const order = [
  {
    name: 'John Doe',
    phone: '6046661258',
    orderlist: {
      Coke: 2,
      alPastor: 2,
      Horchata: 2,
    },
  },
];

function sendClientNotifications(phone, orderTime) {
        // Create options to send the message
  const options = {
    to: recipient,
    from: twilioPhone,
            /* eslint-disable max-len */
    body: 'Your order has been confirmed! You can pick it up in 30 minutes.',
            /* eslint-enable max-len */
  };

        // Send the message!
  client.messages.create(options, (err, response) => {
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
}

    // Don't wait on success/failure, just indicate all messages have been
    // queued for delivery
  // if (callback) {
  //   callback.call();
  // }

sendClientNotifications(order);
