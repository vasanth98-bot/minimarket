import { useState } from "react";

function Cart() {
  // Lazy initialization
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  // Helper function to update cart
  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Increase quantity
  const increaseQty = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item,
    );
    updateCart(updatedCart);
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) - 1 } : item,
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  // Remove item
  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    updateCart(updatedCart);
  };

  // Calculate total
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0,
  );

  // Place order
  const placeOrder = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      items: cartItems,
      total: totalPrice,
      date: new Date().toLocaleString(),
    };

    existingOrders.push(newOrder);

    localStorage.setItem("orders", JSON.stringify(existingOrders));
    localStorage.removeItem("cart");

    setCartItems([]);
    alert("Order placed successfully!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                marginBottom: "10px",
              }}
            >
              <h4>{item.name}</h4>
              <p>Price: ₹ {item.price}</p>

              {/* Quantity Controls */}
              <div>
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span style={{ margin: "0 10px" }}>{item.quantity || 1}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>

              <p>Subtotal: ₹ {item.price * (item.quantity || 1)}</p>

              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          ))}

          <h3>Total: ₹ {totalPrice}</h3>

          <button onClick={placeOrder}>Place Order</button>
        </>
      )}
    </div>
  );
}

export default Cart;
