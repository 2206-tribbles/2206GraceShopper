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
        <div className="cart-item">
          <div className="item-info" >
            <img src={product.photo} alt={product.name} />
            <h4>{product.name}</h4>
          </div>
          <div className="unit-price">
            <small></small>${product.price*product.quantity}
          </div>
          <div className="units">
            <div
              className="btn minus"
              onClick={() => props.decrementQty(product.id)}
            >
              -
            </div>
            <div className="number">{product.quantity}</div>
            <div
              className="btn plus"
              onClick={() => props.incrementQty(product.id)}
            >
              +
            </div>
          
            <div
              className="delete" 
              onClick="removeItemFromCart(${item.id})"
              
              >
                img src=".\public\pic\Trashcan.jpg"
              Delete
            </div>
          
          </div>
        </div>
      ))}
      Subtotal: ${calculateSubtotal().toFixed(2)}
    </div>
  );
};
export default MyCart;
