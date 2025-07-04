import { generateAdminTokenAndSetCookie } from "../lib/jwt.js";

export const verifyAdminOtp = async (req, res) => {
    try {
        const { otp } = req.body;
        const ADMIN_OTP = process.env.ADMIN_SECRET_OTP;

        if (otp === ADMIN_OTP) {
            generateAdminTokenAndSetCookie(res);
            return res.status(200).json({ message: "Admin OTP verified successfully", success: true });
        } else {
            return res.status(401).json({ message: "Invalid OTP" });
        }
    } catch (error) {
        console.error("Error verifying admin OTP:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const logoutAdmin = (req, res) => {
    console.log("Admin logout request received");
    try {
        res.cookie("admin_jwt", "", {
            maxAge: 0,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        })
        return res.status(200).json({ message: "Admin logged out successfully" });
    } catch (error) {
        console.error("Error logging out admin:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const checkAdmin = (req, res) => {
    try {
        const adminToken = req.cookies.admin_jwt;
        if (!adminToken) {
            return res.status(401).json({ message: "Admin not authenticated" });
        }
        return res.status(200).json({ message: "Admin is authenticated", success: true });
    } catch (error) {
        console.error("Error checking admin authentication:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}