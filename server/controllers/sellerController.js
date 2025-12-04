import jwt from 'jsonwebtoken';


// Login Seller: /api/seller/login

export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {

            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });

            // send the token to response with name, value and other configuration 
            res.cookie('sellerToken', token, {
                httpOnly: true,
                secure: true,     // must be true for production over HTTPS
                sameSite: 'none', // cross-site requests require 'none'
                maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiration time
            })
            return res.json({ success: true, message: "Logged In" });
        } else {
            return res.json({ success: false, message: "Invalid Credentials" });
        }
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Seller isAuth:/api/seller/is-auth
export const isSellerAuth = async (req, res) => {
    try {
        return res.json({ success: true })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}


// Logout Seller: /api/seller/logout
export const sellerLogout = (req, res) => {
    try {
        // Prevent caching
        res.setHeader('Cache-Control', 'no-store');

        // Clear the token cookie
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,     // must be true for production over HTTPS
            sameSite: 'none', // cross-site requests require 'none'
            path: '/',        // ensures the cookie is cleared everywhere
        });

        return res.json({ success: true, message: "Logged Out Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
