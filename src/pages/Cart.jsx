import { useCallback, useState } from "react";
import { BiTrash, BiPlus, BiMinus } from "react-icons/bi";
import Swal from "sweetalert2";
import Navbar from "../components/common/Navbar";
import { useNavigate } from "react-router-dom";
import useFetchCart from "../hooks/useFetchCart";
import { modifyCart } from "../api/Cart/cart.request";
import inventoryRequest from "../api/Inventory/inventory.request";
import { placeOrder } from "../api/Order/order.request";

export const Cart = () => {
  const navigate = useNavigate();
  const { cart, loading, setCart, setLoading } = useFetchCart();
  const [inventories, setInventory] = useState([]);

  const deleteItem = (id) => {
    Swal.fire({
      title: "Are you sure to delete?",
      text: "You won't be able to revert this!",
      confirmButtonText: "Yes",
      showDenyButton: true,
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        const newCart = cart.filter((item) => item.item._id !== id);

        getInventories();

        const deleteItem = cart.find((item) => item.item._id === id);

        const deleteInventoryItem = inventories.find(
          (i) => i.productId._id === deleteItem.item._id,
        );

        console.log(deleteInventoryItem);

        deleteInventoryItem.quantity =
          deleteInventoryItem.quantity + deleteItem.quantity;

        inventoryRequest.editInventory(
          deleteInventoryItem._id,
          deleteInventoryItem,
        );

        modifyCart(
          newCart.map((item) => ({
            item: item.item._id,
            quantity: item.quantity,
          })),
        )
          .then(() => {
            setCart(newCart);
          })
          .catch(() => {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong",
              confirmButtonText: "Ok",
            });
          });
      }
    });
  };

  const increaseQuantity = (id) => {
    getInventories();

    const newCart = cart.map((item) => {
      if (item.item._id === id) {
        const inventoryProduct = inventories.find(
          (i) => i.productId._id === item.item._id,
        );

        if (inventoryProduct.quantity > 0) {
          inventoryProduct.quantity -= 1;

          inventoryRequest.editInventory(
            inventoryProduct._id,
            inventoryProduct,
          );

          getInventories();

          return {
            ...item,
            quantity: item.quantity + 1,
          };
        } else {
          Swal.fire({
            title: "Not enough stock",
            text: "There is no enough stock!.",
            confirmButtonText: "Okay",
          }).then((result) => {
            if (result.isConfirmed) navigate("/cart");
          });
        }
      }
      return item;
    });
    setCart(newCart);
  };

  function getInventories() {
    inventoryRequest.getInventoryList().then((data) => {
      setInventory(data.data);
    });
  }

  const decreaseQuantity = (id) => {
    getInventories();

    const newCart = cart.map((item) => {
      if (item.item._id === id) {
        const inventoryProduct = inventories.find(
          (i) => i.productId._id === item.item._id,
        );

        if (item.quantity > 1) {
          inventoryProduct.quantity += 1;

          inventoryRequest.editInventory(
            inventoryProduct._id,
            inventoryProduct,
          );

          getInventories();

          return {
            ...item,
            quantity: item.quantity - 1 === 0 ? 1 : item.quantity - 1,
          };
        }
      }
      return item;
    });
    setCart(newCart);
  };

  const calculateTotal = useCallback(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.item.price * item.quantity;
    });
    return total;
  }, [cart]);

  const checkout = () => {
    setLoading(true);
    placeOrder(
      cart.map((item) => ({
        item: item.item._id,
        quantity: item.quantity,
      })),
    )
      .then((order) => {
        modifyCart([])
          .then(() => {
            setCart([]);
            setLoading(false);
            Swal.fire({
              icon: "success",
              title: "Order placed!",
              text: "Your order has been placed successfully",
              confirmButtonText: "View order",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate(`/orders?id=${order.data._id}`);
              }
            });
          })
          .catch(() => {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong",
              confirmButtonText: "Ok",
            });
            setLoading(false);
          });
      })
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong",
          confirmButtonText: "Ok",
        });
        setLoading(false);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="bg-white w-full max-w-7xl mx-auto flex justify-between gap-8 px-8 sm:px-16">
        <div className="mt-8">
          <h4 className="text-2xl">Bag</h4>
          <div className="my-6 flex flex-col gap-6">
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-slate-300"></div>
              </div>
            ) : cart.length ? (
              cart.map((item) => (
                <div className="flex gap-4">
                  <img
                    className="w-36 h-36 bg-slate-200 object-cover object-center border rounded border-slate-200"
                    src={item.item?.image}
                  />
                  <div className="flex flex-col items-start justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <h5 className="text-lg font-semibold">
                        {item.item.name}
                      </h5>
                      <p className="text-slate-500">{item.item.description}</p>
                      <h6>{`LKR ${item.item.price}`}</h6>
                      <div className="flex gap-2 items-center">
                        <button
                          onClick={() => decreaseQuantity(item.item._id)}
                          className="flex justify-center items-center w-8 h-8 rounded-full bg-slate-100">
                          <BiMinus size={16} />
                        </button>
                        <p>{item.quantity}</p>
                        <button
                          onClick={() => increaseQuantity(item.item._id)}
                          className="flex justify-center items-center w-8 h-8 rounded-full bg-slate-100">
                          <BiPlus size={16} />
                        </button>
                      </div>
                    </div>
                    <button onClick={() => deleteItem(item.item._id)}>
                      <BiTrash size={20} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div>You have no items in the Cart</div>
            )}
          </div>
        </div>
        <div className="mt-8 min-w-[260px]">
          <h4 className="text-2xl mb-6">Summary</h4>
          <div>
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-slate-300"></div>
              </div>
            ) : (
              <>
                <div className="flex justify-between py-2 border-t border-b mb-4">
                  <p>Total</p>
                  <p>{`LKR ${calculateTotal()}`}</p>
                </div>
                <button
                  disabled={!cart.length}
                  onClick={checkout}
                  className="flex w-full justify-center items-center disabled:bg-slate-200 bg-slate-900 rounded-full p-2 text-white">
                  Checkout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
