const twilio = require('twilio');
const dotenv = require('dotenv');
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export default async function sendSMS(to, body) {
  console.log(accountSid, authToken, twilioPhoneNumber)
  try {
    const message = await client.messages.create({
      body: body,
      from: twilioPhoneNumber,
      to: to,
    });

    console.log(`SMS sent with SID: ${message.sid}`);
  } catch (error) {
    console.error(`Error sending SMS: ${error.message}`);
  }
}

// Usage
// sendSMS('6136003977', 'Your order has been created. Thank you!');
