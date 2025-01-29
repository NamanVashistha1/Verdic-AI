import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { getToken, verifyToken } from "../utils/totp.js";
import { sendMessage } from "../utils/twilio.js";
import { getUserId } from "../utils/token.js";

const userSignup = async (req, res) => {
    const phoneNumber = "+91" + req.body.phoneNumber;

    const totp = getToken(phoneNumber, "AUTH");

    try {
        let user = await User.findOne({ number: phoneNumber });
        
        if (!user) {
            user = new User({
                number: phoneNumber,
                verified: false,
                name: null
            });
            await user.save();
        }

        if (process.env.NODE_ENV === "production") {
            try {
                await sendMessage(`Your OTP for logging into Billion Dollars is ${totp}`, phoneNumber);
            } catch (e) {
                return res.status(500).json({ message: "Could not send OTP" });
            }
        }

        console.log(totp);
        res.json({ message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const verifySignup = async (req, res) => {
    const { phoneNumber, otp } = req.body;
    const fullPhoneNumber = "+91" + phoneNumber;

    if (!verifyToken(fullPhoneNumber, "AUTH", otp)) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    try {
        const user = await User.findOne({ number: fullPhoneNumber });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.verified = true;
        await user.save();

        const authToken = jwt.sign({ userId: user._id }, "random123", { expiresIn: "7d" });
        res.json({ authToken });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const nameSignup = async (req, res) => {
    const { username } = req.body;
    const authToken = req.headers.authorization?.split(" ")[1];

    if (!authToken || !username) {
        return res.status(400).json({ message: "Auth token and username are required" });
    }

    try {
        const userId = getUserId(authToken);
        const existingUser = await User.findOne({ name: username });

        if (existingUser) {
            return res.status(409).json({ message: "Username already exists" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name = username;
        await user.save();

        res.json({ message: "Username updated successfully" });
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

export { userSignup, verifySignup, nameSignup };
