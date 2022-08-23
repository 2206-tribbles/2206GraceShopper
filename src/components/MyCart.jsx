import { Route, Routes, Link, useNavigate, NavLink } from "react-router-dom";
import "./components_css/MyCart.css";

const MyCart = (props) => {
  const cart = props.cart;
  const navigate = useNavigate();

  const navigateToCheckout = () => {
    navigate('/checkout');
  };

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
      <div className="cartText">My Cart</div>
      <div className="cart-item-box">{cart.map((product) => (
        <div className="cart-item">
          <div className="item-info" >
            <Link to={`/products/${product.id}`}>
              <img src={product.photo} alt={product.name} />
            </Link>
            <h4>{product.name}</h4>
          </div>
          <div className="buttons">

            <div className="units">
              <div
                className="btn"
                onClick={() => props.decrementQty(product.id)}
              > - </div>
              <div className="number">{product.quantity}</div>
              <div
                className="btn"
                onClick={() => props.incrementQty(product.id)}
              > + </div>
            </div>

            <div className="units-other">
              <div className="unit-price">
                <small></small>${product.price * product.quantity}
              </div>

              <button className="deleteButton" onClick={() => props.deleteFromCart(product.id)}>
                <img className="trashcan_icon" src="/pics/Trashcan.png"></img>
              </button>
            </div>
            
          </div>
        </div>
      ))}
      </div>
      <div className="cartSubtotal">
        <div>Subtotal: ${calculateSubtotal().toFixed(2)}</div>
        <button className="goToCheckoutBtn" onClick={navigateToCheckout}>
        Go to Checkout
        </button>
      </div>
    </div>
  );
};
export default MyCart;
