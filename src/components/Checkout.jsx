import { Link } from "react-router-dom";
import "./components_css/Checkout.css";
import React, { useEffect, useState } from "react";
import { MyCart } from "./index";

const Checkout = (props) => {
  const cart = props.cart;
  const user = props.user;
  console.log("user??", user);
  const [userInfo, setUserInfo] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    address: user.address,
  });

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      setUserInfo({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        address: user.address,
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

  return (
    <div className="row">
      <div className="col-75">
        <div className="container">
          <form action="/action_page.php">
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
                  name="cardname"
                  placeholder="John More Doe"
                />
                <label htmlFor="ccnum">Credit card number</label>
                <input
                  type="text"
                  id="ccnum"
                  name="cardnumber"
                  placeholder="1111-2222-3333-4444"
                />
                <label htmlFor="expmonth">Exp Month</label>
                <input
                  type="text"
                  id="expmonth"
                  name="expmonth"
                  placeholder="September"
                />

                <div className="row">
                  <div className="col-50">
                    <label htmlFor="expyear">Exp Year</label>
                    <input
                      type="text"
                      id="expyear"
                      name="expyear"
                      placeholder="2018"
                    />
                  </div>
                  <div className="col-50">
                    <label htmlFor="cvv">CVV</label>
                    <input type="text" id="cvv" name="cvv" placeholder="352" />
                  </div>
                </div>
              </div>
            </div>
            <label>
              <input type="checkbox" defaultChecked={true} name="sameadr" />{" "}
              Shipping address same as billing
            </label>
            <input type="submit" value="Continue to checkout" className="btn" />
          </form>
        </div>
      </div>
    <div className='col-25'>
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
