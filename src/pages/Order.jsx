import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import { getOrders } from "../api/Order/order.request";

export const Order = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [or, setOr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, _setSearchParams] = useSearchParams();

  const calculateTotal = useCallback(
    (order) => {
      let total = 0;
      order?.items.forEach((item) => {
        total += item.item.price * item.quantity;
      });
      return total;
    },
    [orders],
  );

  const clickOrder = (orderId) => {
    navigate(`/orders?id=${orderId}`);
  };

  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res.data ? res.data : []);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (searchParams.has("id")) {
      const order = orders.find(
        (order) => order._id === searchParams.get("id"),
      );
      setOr(order);
    } else {
      setOr(null);
    }
  }, [orders, searchParams]);

  return (
    <div>
      <Navbar />
      <div className="bg-white w-full max-w-4xl mx-auto flex justify-center gap-8 px-8 sm:px-16">
        {loading ? (
          <div className="mt-10 flex justify-center items-center">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-slate-300"></div>
          </div>
        ) : (
          <>
            {searchParams.has("id") ? (
              <div className="mt-8">
                <h2 className="text-4xl uppercase font-semibold text-center">
                  You Ordered
                </h2>
                <div className="my-6 flex flex-col gap-6">
                  <div className="flex justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <h4 className="text-xl">Order Number</h4>
                      <p>{or?._id}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-xl">Order Placed</h4>
                      <p>{or?.createdAt}</p>
                    </div>
                  </div>
                  <div className="p-2 border-t border-b border-slate-200 text-xl">
                    Items
                  </div>
                  {or?.items.map((item) => (
                    <div className="flex gap-4">
                      <img
                        className="w-36 h-36 bg-slate-200 object-cover object-center border rounded border-slate-200"
                        src={item.item.image}
                      />
                      <div className="flex flex-col items-start justify-between gap-3">
                        <div className="flex flex-col gap-1">
                          <h5 className="text-lg font-semibold">
                            {item.item.name}
                          </h5>
                          <p className="text-slate-500">
                            {item.item.description}
                          </p>
                          <h6>{`LKR ${item.item.price} x Qty ${item.quantity}`}</h6>
                          <span className="text-lg font-semibold">{`LKR ${
                            item.item.price * item.quantity
                          }`}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="p-2 border-t border-b border-slate-200 text-xl flex justify-between">
                    <span>Total</span>
                    <span className="font-semibold">{`LKR ${calculateTotal(
                      or,
                    )}`}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-8 w-full">
                <h2 className="text-4xl uppercase font-semibold text-center">
                  Orders
                </h2>
                <div className="my-6 flex flex-col gap-6">
                  <div className="p-2 border-t border-b border-slate-200 text-xl">
                    History
                  </div>
                  {orders.length ? (
                    orders.map((item) => (
                      <div
                        onClick={() => clickOrder(item._id)}
                        className="flex gap-4">
                        <img
                          className="w-24 h-24 bg-slate-200 object-cover object-center border rounded border-slate-200"
                          src={item.items[0].item.image}
                        />
                        <div className="flex flex-col items-start justify-between gap-3">
                          <div className="flex flex-col gap-1">
                            <h5 className="text-lg font-semibold">
                              {`Order Number: ${item._id}`}
                            </h5>
                            <h6>{`${item.items.length} items`}</h6>
                          </div>
                          <span className="text-lg font-semibold">{`LKR ${calculateTotal(
                            item,
                          )}`}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center">You have no orders yet 😟</div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
