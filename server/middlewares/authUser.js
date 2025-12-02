import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) return res.status(401).json({ success: false, message: 'Not Authorized' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.id) return res.status(401).json({ success: false, message: 'Not Authorized' });

        req.userId = decoded.id;
        next();

    } catch (error) {
        console.log("Auth error:", error.message);
        return res.status(401).json({ success: false, message: 'Invalid Token' });
    }
};

export default authUser;
