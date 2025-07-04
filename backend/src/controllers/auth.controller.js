import bcrypt from 'bcryptjs'
import { User } from '../models/user.model.js'
import { generateToken } from '../lib/jwt.js'
import cloudinary from '../lib/cloudinary.js'

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "An account with this email already exists. Try logging in instead." });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })
        newUser.save();

        if (newUser) {
            // generate token
            const token = generateToken(newUser._id, res);

            res.cookie('jwt', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.error("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }

}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const hash = user.password;
        const isPasswordCorrect = bcrypt.compareSync(password, hash);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user._id, res);

        // Set token in HTTP-only cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.error("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is required" });
        }
        console.error("uploading profile picture to cloudinary...");
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );
        console.error("profile picture updated...")

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("error in update profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.error("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}