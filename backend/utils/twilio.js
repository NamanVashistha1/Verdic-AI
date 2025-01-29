const twilio = require("twilio");
const dotenv = require("dotenv");
dotenv.config();

const accountSid = process.env.TWILIO_ACC_SID;
const tauthToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, tauthToken);

const sendMessage = async (body,to) => {
    try {
        const message = await client.messages.create({
            body,
            from: "+18059784612",
            to,
        });

        // console.log(message.body);
    
    } catch (e) {
        throw new Error("error while sending otp")
    }
}

module.exports = {sendMessage};