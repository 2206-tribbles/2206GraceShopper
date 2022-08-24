import { Route, Routes, Link, useNavigate, NavLink } from "react-router-dom";
import "./components_css/MyCart.css";

const MyCart = (props) => {
  let runningTotal = 0;
  const cart = props.cart;
  const shippingCost = props.shipCost
  console.log("THIS IS THE SHIPPING COST:", props )
  const navigate = useNavigate();

  const navigateToCheckout = () => {
    navigate("/checkout");
  };

  
  // const calculateShipping = () => {
  //   const radioNodes = document.getElementsByName("shipping");
  //   let cost = 0;
  //   for (let i = 0; i < radioNodes.length; i++){
  //     if (radioNodes[i].checked) {
  //       cost = parseInt(radioNodes[i].value)
  //       console.log("RADIO BUTTONS: ", radioNodes[i].value)
  //     }
  //     console.log("SHIPPING COST IS:", cost)
  //   }
  //   runningTotal += (cost);  
  //   return (cost); 
  // };
  // // calculate and render subtotal

  const calculateSubtotal = () => {
    let totalPrice = 0;

    cart.forEach((product) => {
      totalPrice += product.price * product.quantity;
    });
    runningTotal = totalPrice;
    return totalPrice;
  };

  const calculateTax = () => {
    let tax = runningTotal * 0.04;
    runningTotal += tax;
    return tax;
  };

 const calculateGrandTotal = () => {
  let grandTotal = runningTotal + shippingCost
  return grandTotal;
 }

  return (
    <div className="add_to_cart">
      <div className="cartText">My Cart</div>
      <div className="cart-item-box">
        {cart.map((product) => (
          <div className="cart-item">
            <div className="item-info">
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
                >
                  {" "}
                  -{" "}
                </div>
                <div className="number">{product.quantity}</div>
                <div
                  className="btn"
                  onClick={() => props.incrementQty(product.id)}
                >
                  {" "}
                  +{" "}
                </div>
              </div>

              <div className="units-other">
                <div className="unit-price">
                  <small></small>${product.price * product.quantity}
                </div>

                <button
                  className="deleteButton"
                  onClick={() => props.deleteFromCart(product.id)}
                >
                  <img className="trashcan_icon" src="/pics/Trashcan.png"></img>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cartSubtotal">
        {window.location.pathname === "/checkout" ? (
          <div>
            Subtotal: ${calculateSubtotal().toFixed(2)}
            <br />
            Tax 4%: ${calculateTax().toFixed(2)}
            <br />
            Shipping Cost: ${shippingCost.toFixed(2)}
            <br />
            <b>Grand Total: ${calculateGrandTotal().toFixed(2)}</b>
          </div>
        ) : (
          <div>
            Subtotal: ${calculateSubtotal().toFixed(2)}
            <button className="goToCheckoutBtn" onClick={navigateToCheckout}>
              Go to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default MyCart;
