import "./components_css/MyCart.css";

const MyCart = (props) => {
  const cart = props.cart;

  // // calculate and render subtotal
  const calculateSubtotal = () => {
    let totalPrice = 0;

    cart.forEach((product) => {
      totalPrice += product.price * product.quantity;
    });
    return totalPrice;
  };

  return (
    <div className="add_to_cart">
      {cart.map((product) => (
        <div class="cart-item">
          <div class="item-info" onClick="removeItemFromCart(${item.id})">
            <img src={product.photo} alt={product.name} />
            <h4>{product.name}</h4>
          </div>
          <div class="unit-price">
            <small></small>${product.price*product.quantity}
          </div>
          <div class="units">
            <div
              class="btn minus"
              onClick="changeNumberOfUnits('minus', ${product.id})"
            >
              -
            </div>
            <div class="number">{product.quantity}</div>
            <div
              class="btn plus"
              onClick={() => props.incrementQty(product.id)}
            >
              +
            </div>
          </div>
        </div>
      ))}
      Subtotal: ${calculateSubtotal().toFixed(2)}
    </div>
  );
};
export default MyCart;
