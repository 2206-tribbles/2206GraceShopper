import { Link } from "react-router-dom";
import "./components_css/Checkout.css";
import React, { useEffect, useState } from "react";
import { MyCart } from "./index";
import { checkoutUser } from "../api_adapter";

const Checkout = (props) => {
  const cart = props.cart;
  const user = props.user;
  const setCart = props.setCart;

  console.log("user??", user);
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

  // // calculate and render subtotal
  const calculateSubtotal = () => {
    let totalPrice = 0;

    cart.forEach((product) => {
      totalPrice += product.price * product.quantity;
    });
    return totalPrice;
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
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
  };

  return (
    <div className="checkoutContainer">
      <div className="userInfoContainer">
        <div className="container">
          <form onSubmit={checkoutCart}>
            <div className="row">
              <div className="col-50">
                <h3>Mailing Address</h3>
                <label htmlFor="first_name">
                  <i className="fa fa-user"></i> First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  placeholder="John"
                  defaultValue={userInfo.first_name}
                  onChange={(event) =>
                    setUserInfo({ ...userInfo, first_name: event.target.value })
                  }
                />
                <label htmlFor="last_name">
                  <i className="fa fa-user"></i> Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  placeholder="John"
                  defaultValue={userInfo.last_name}
                  onChange={(event) =>
                    setUserInfo({ ...userInfo, last_name: event.target.value })
                  }
                />
                <label htmlFor="email">
                  <i className="fa fa-envelope"></i> Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  defaultValue={userInfo.email}
                  onChange={(event) =>
                    setUserInfo({ ...userInfo, email: event.target.value })
                  }
                />
                <label htmlFor="adr">
                  <i className="fa fa-address-card-o"></i> Address
                </label>
                <input
                  type="text"
                  id="adr"
                  name="address"
                  placeholder="542 W. 15th Street"
                  defaultValue={userInfo.address}
                  onChange={(event) =>
                    setUserInfo({ ...userInfo, address: event.target.value })
                  }
                />
              </div>

              <div className="col-50">
                <h3>Payment</h3>
                <label htmlFor="fname">Accepted Cards</label>
                <div className="icon-container">
                  <i className="fa fa-cc-visa" style={{ color: "navy" }}></i>
                  <i className="fa fa-cc-amex" style={{ color: "blue" }}></i>
                  <i
                    className="fa fa-cc-mastercard"
                    style={{ color: "red" }}
                  ></i>
                  <i
                    className="fa fa-cc-discover"
                    style={{ color: "orange" }}
                  ></i>
                </div>
                <label htmlFor="cname">Name on Card</label>
                <input
                  type="text"
                  id="cname"
                  name="card_name"
                  placeholder="John More Doe"
                  onChange={(event) =>
                    setUserInfo({ ...userInfo, card_name: event.target.value })
                  }
                />
                <label htmlFor="ccnum">Credit card number</label>
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
                />
                <label htmlFor="expmonth">Exp Month</label>
                <input
                  type="text"
                  id="expmonth"
                  name="exp_month"
                  placeholder="September"
                  onChange={(event) =>
                    setUserInfo({ ...userInfo, exp_month: event.target.value })
                  }
                />

                <div className="row">
                  <div className="col-50">
                    <label htmlFor="expyear">Exp Year</label>
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
                  <div className="col-50">
                    <label htmlFor="cvv">CVV</label>
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
                </div>
              </div>
            </div>
            <label>
              <input type="checkbox" defaultChecked={true} name="sameadr" />{" "}
              Billing address same as shipping
            </label>
            <button type="submit" className="btn">
              Checkout
            </button>
          </form>
        </div>
      </div>
      <div className="cartContainer">
        <MyCart
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
