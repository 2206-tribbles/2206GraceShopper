import { Link } from "react-router-dom";
import "./components_css/MiniProduct.css";

const MiniProduct = ({ element }) => {
  return (
    <div className="mini_product_container">
      <Link className="mini_product" to={`/products/${element.id}`}>
        <div className="title">{element.title}</div>
        <img className="mini_product_photo" src={element.photo} />
        <div className="bottom_text">
          <div className="artist">{element.artist}</div>
          <div className="price">${element.price}</div>
        </div>
      </Link>
    </div>
  );
};

export default MiniProduct;
