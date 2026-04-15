import { User } from "../models/user.model.js"
import jwt from 'jsonwebtoken'

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are important" })
        }

        const existing = await User.findOne({ email: email.toLowerCase() })
        if (existing) return res.status(400).json({ message: "user already exists ! Try another email.." })

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false,

        });
        res.status(201).json({
            message: "User registered successfully",
            user: { id: user._id, email: user.email, username: user.username }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const logInUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            email: email.toLowerCase()
        })
        if (!user) return res.status(400).json({
            message: "user not found !"
        })
        const isMatch = await user.comparePassword(password);

        if (!isMatch) return res.status(400).json({ message: "invalid credentials" });

        const token = jwt.sign(
            { id: user._id },          // payload
            process.env.JWT_SECRET,    // secret key
            { expiresIn: "1d" }        // expiry
        );

        res.status(200).json({
            message: "User Logged In",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            },
            token
        })


    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error:error.message })
    }


}

const logOutUser = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email.toLowerCase() })
        if (!user) return res.status(400).json({ message: "User doesn't exists" })
        return res.status(201).json({
            message: "Logged out successfully"
        });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error })
    }
}

export {
    registerUser,
    logInUser,
    logOutUser
}