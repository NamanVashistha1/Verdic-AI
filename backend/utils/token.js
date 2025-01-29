const jwt = require("jsonwebtoken");

const getUserId = (authtoken) => {
    try {
        const decoded = jwt.verify(authtoken,"random123");
        return decoded.userId;
    } catch (e) {
        throw new Error("Invalid or expired auth token")
    }
};

module.exports = {getUserId};