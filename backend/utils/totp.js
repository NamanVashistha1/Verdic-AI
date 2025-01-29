const {generateToken} = require("authenticator");
const {verifyToken : verifyTokenLib} = require("authenticator");

const TOTP_SECRET = "123456";

const getToken = (number,type) => {
    if(typeof number != "string" || type != "AUTH"){
        throw new Error("Invalid arguments for number or type");
    }

    return generateToken(number + type + TOTP_SECRET);
}

const verifyToken = (number, type, otp) => {
    if(typeof number != "string" || type != "AUTH" || typeof otp != "string"){
        throw new Error("Invalid arguments for number, type or otp");
    }

    return verifyTokenLib(number + type + TOTP_SECRET, otp);
}

module.exports = {getToken, verifyToken};