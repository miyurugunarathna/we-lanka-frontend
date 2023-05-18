/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from "react";
import { getCart } from "../api/Cart/cart.request";

const useFetchCart = () => {
  const token = localStorage.getItem("token");
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = () =>
    getCart().then((res) => {
      setCart(res.data?.items ? res.data.items : []);
      setLoading(false);
    });

  useEffect(() => {
    if (token) fetchCart();
  }, []);

  return { cart, loading, setCart, fetchCart };
};

export default useFetchCart;
