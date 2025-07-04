import jwt from 'jsonwebtoken';

export const protectAdmin = (req, res, next) => {
    try {
        const token = req.cookies.admin_jwt;
        if(!token) {
            return res.status(401).json({ message: "Not authorized as admin" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "admin") {
            return res.status(403).json({ message: "Forbidden: Not an admin" });
        }

        req.admin = true;
        next();
    } catch (error) {
        console.error("Admin protect error:", error);
    res.status(401).json({ message: "Invalid or expired admin token" });
    }
}