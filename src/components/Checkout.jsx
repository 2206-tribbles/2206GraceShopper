
import "./components_css/Checkout.css";
import React, { useEffect, useState } from "react";
import { MyCart } from "./index";
import { checkoutUser } from "../api_adapter";


const Checkout = (props) => {
  const cart = props.cart;
  const user = props.user;
  const setCart = props.setCart; 
  const [shipCost, setShipCost] = useState(0)
  const [userInfo, setUserInfo] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    address: user.address,
    card_name: "",
    card_number: "",
    exp_month: "",
    exp_year: "",
    cvv: "",
  });

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      setUserInfo({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        address: user.address,
        card_name: "",
        card_number: "",
        exp_month: "",
        exp_year: "",
        cvv: "",
      });
    }
  }, [user]);
  
  
  const calculateShipping = () => {
    const radioNodes = document.getElementsByName("shipping");
    let cost = 0;
    for (let i = 0; i < radioNodes.length; i++){
      if (radioNodes[i].checked) {
        cost = parseFloat(radioNodes[i].value)
      }
    }
    setShipCost(cost)
    return (shipCost); 
  };

  const checkoutCart = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const result = await checkoutUser(token, {
      cart_id: cart[0].cart_id,
      user_id: user.id,
      cart,
    });
    // Clear out cart
    setShipCost(0)
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
    alert('You Order Has Been Processed.  A Receipt Has Been Sent to your Email Address.  Thank You For Shopping With Graceland Shoppers!!');
  };
  
  return (
    <div className="checkoutContainer">
      <div className="userInfoContainer">
        <div className="container">
          <h3>Checkout</h3>
          <form className="inputContainer" onSubmit={checkoutCart}>
            <div className="row">
              <div className="col-50">
                <div><h3>Shipping Address</h3></div>
                <div className="cat">
                  <div className="subcat">First Name:
                    <input
                      type="text"
                      id="first_name"
                      className="addressInput"
                      name="first_name"
                      placeholder="John"
                      defaultValue={userInfo.first_name}
                      onChange={(event) =>
                        setUserInfo({ ...userInfo, first_name: event.target.value })
                      }
                    /></div>
                  <div className="subcat">Last Name:
                    <input
                      type="text"
                      id="last_name"
                      className="addressInput"
                      name="last_name"
                      placeholder="John"
                      defaultValue={userInfo.last_name}
                      onChange={(event) =>
                        setUserInfo({ ...userInfo, last_name: event.target.value })
                      }
                    /></div>
                  <div className="subcat">Email:
                    <input
                      type="text"
                      id="email"
                      className="addressInput"
                      name="email"
                      placeholder="john@example.com"
                      defaultValue={userInfo.email}
                      onChange={(event) =>
                        setUserInfo({ ...userInfo, email: event.target.value })
                      }
                    /></div>
                  <div className="subcat">Address:
                    <input
                      type="text"
                      id="adr"
                      className="addressInput"
                      name="address"
                      placeholder="542 W. 15th Street"
                      defaultValue={userInfo.address}
                      onChange={(event) =>
                        setUserInfo({ ...userInfo, address: event.target.value })
                      }
                    /></div>
                </div>
              </div>

              <div className="col-50">
                <div><h3>Payment</h3></div>

                <div className="cat">
                  <div className="cardInfo"><label htmlFor="fname">Accepted Cards</label>
                    <img className="cards" src="/pics/cards.png" />

                  </div>
                  <div className="subcat">Name on Card:
                    <input
                      type="text"
                      id="cname"
                      name="card_name"
                      placeholder="John More Doe"
                      onChange={(event) =>
                        setUserInfo({ ...userInfo, card_name: event.target.value })
                      }
                    /></div>
                  <div className="subcat">Credit card number:
                    <input
                      type="text"
                      id="ccnum"
                      name="card_number"
                      placeholder="1111-2222-3333-4444"
                      onChange={(event) =>
                        setUserInfo({
                          ...userInfo,
                          card_number: event.target.value,
                        })
                      }
                    /></div>
                  <div className="subcat">Expiration Month:
                    <input
                      type="text"
                      id="expmonth"
                      name="exp_month"
                      placeholder="September"
                      onChange={(event) =>
                        setUserInfo({ ...userInfo, exp_month: event.target.value })
                      }
                    /></div>

                  <div className="subcat">Expiration Year:
                    <input
                      type="text"
                      id="expyear"
                      name="exp_year"
                      placeholder="2018"
                      onChange={(event) =>
                        setUserInfo({
                          ...userInfo,
                          exp_year: event.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="subcat">CVV:
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      placeholder="352"
                      onChange={(event) =>
                        setUserInfo({ ...userInfo, cvv: event.target.value })
                      }
                    />
                  </div>

                  <div><label>
                    <input type="checkbox" defaultChecked={true} name="sameadr" />{" "}
                    Billing address same as shipping
                  </label>
                  </div>
                </div>
              </div>
              <div className="col-50">
               <div><h3>Shipping Prices</h3></div>
               <form><div className="catShipping">
               <div><label className="shippingLabel">
                    <input type="radio" value = "0" defaultChecked={true} name="shipping" onClick={calculateShipping} />{" "}
                    Standard:  <b>Free</b>
                  </label></div>
                  <div><label className="shippingLabel">
                    <input type="radio" value="12.95" defaultChecked={false} name="shipping" onClick={calculateShipping} />{" "}
                    2-3 Day:  <b>$12.95</b>
                  </label></div>
                  <div><label className="shippingLabel">
                    <input type="radio" value = "27.50" defaultChecked={false} name="shipping" onClick={calculateShipping} />{" "}
                    Overnight:  <b>$27.50</b>
                  </label></div>
                </div></form>
              </div>
              <button type="submit" className="btn">
                Checkout
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="cartContainer">
        <MyCart
          shipCost={shipCost}
          cart={cart}
          incrementQty={props.incrementQty}
          decrementQty={props.decrementQty}
          deleteFromCart={props.deleteFromCart}
        />
      </div>
    </div>
  );
};
export default Checkout;
