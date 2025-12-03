import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";
import toast from "react-hot-toast";
import api from "../config/api";   // <--- Your axios instance

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY;

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [isAuthLoaded, setIsAuthLoaded] = useState(false);

    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState({});

    // ✅ Fetch logged-in user
    const fetchUser = async () => {
        try {
            const { data } = await api.get("/api/user/is-auth");
            if (data.success) {
                setUser(data.user);
                setCartItems(data.user.cartItems);
            } else {
                setUser(null);
            }
        } catch (err) {
            setUser(null);
        } finally {
            setIsAuthLoaded(true);
        }
    };

    // ✅ Fetch seller auth
    const fetchSeller = async () => {
        try {
            const { data } = await api.get("/api/seller/is-auth");
            setIsSeller(data.success);
        } catch {
            setIsSeller(false);
        }
    };

    // ✅ Fetch all products
    const fetchProducts = async () => {
        try {
            const { data } = await api.get("/api/product/list");
            if (data.success) setProducts(data.products);
            else toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    // CART FUNCTIONALITY ----------------------------

    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);

        cartData[itemId] = cartData[itemId] ? cartData[itemId] + 1 : 1;

        setCartItems(cartData);
        toast.success("Added to Cart");
    };

    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success("Cart Updated");
    };

    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) delete cartData[itemId];
        }
        setCartItems(cartData);
        toast.success("Removed from Cart");
    };

    const getCartCount = () => {
        let total = 0;
        for (const item in cartItems) total += cartItems[item];
        return total;
    };

    const getCartAmount = () => {
        let total = 0;
        for (const id in cartItems) {
            const item = products.find((p) => p._id === id);
            if (item) total += item.offerPrice * cartItems[id];
        }
        return Math.floor(total * 100) / 100;
    };

    // INITIAL LOAD ---------------------------------

    useEffect(() => {
        fetchUser();
        fetchSeller();
        fetchProducts();
    }, []);

    // UPDATE CART TO SERVER ------------------------

    useEffect(() => {
        const updateCart = async () => {
            try {
                const { data } = await api.post("/api/cart/update", { cartItems });
                if (!data.success) toast.error(data.message);
            } catch (error) {
                toast.error(error.message);
            }
        };

        if (user) updateCart();
    }, [cartItems, user]);

    // CONTEXT VALUE --------------------------------

    const value = {
        navigate,
        user,
        setUser,
        isSeller,
        setIsSeller,
        showUserLogin,
        setShowUserLogin,
        products,
        currency,
        addToCart,
        updateCartItem,
        removeFromCart,
        cartItems,
        searchQuery,
        setSearchQuery,
        getCartCount,
        getCartAmount,
        fetchProducts,
        setCartItems,
        isAuthLoaded,
        fetchUser,
        api,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};
