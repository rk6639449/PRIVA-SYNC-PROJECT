import { User } from "../models/user.model.js"

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

        res.status(201).json({
            message: "User Logged In",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        })


    } catch (error) {
        res.status(500).json({message:"Internal Server Error",error})
    }


}

export {
    registerUser,
    logInUser
}