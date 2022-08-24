import { Link } from "react-router-dom";
import "./components_css/SingleProduct.css";

const SingleProduct = ({ element, user }) => {
  return (
    <div className="single_product_container">
      <Link className="single_product" to={`/products/${element.id}`}>
        <div className="title">{element.title}</div>
        <img className="single_product_photo" src={element.photo} />
        <div className="bottom_text">
          <div className="artist">{element.artist}</div>
          <div className="price">${element.price}</div>
        </div>
      </Link>
      {user.username === "Admin" ? (
        <div>
          <button>Edit</button>
          <button onClick={() => deleteProduct(ProductId)}>Delete</button>
        </div>
      ) : null}
    </div>
  );
};

export default SingleProduct;
