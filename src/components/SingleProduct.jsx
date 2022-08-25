import { Link } from "react-router-dom";
import "./components_css/SingleProduct.css";
import {
  createProduct,
  getProductById,
  getCartByUserId,
  createCart,
  getAllProducts,
  destroyProduct,
  updateProduct,
} from "../api_adapter";
import {  SingleProductEdit } from "./index";

const SingleProduct = (props) => {
  const { element, user, setAllProducts, allProducts } = props;
  const product = element;
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
      {/* {user.username === "Admin" ? (
        <div>
       
          <button
            onClick={async () => {
              console.log("PRODUCT ID:", element.id);
              await destroyProduct(element.id);
              alert("Are You Sure You Want To Delete This Product");
              const _allProducts = await getAllProducts();
              setAllProducts(_allProducts);
            }}
          >
            Delete
          </button>
          <button><Link to="/ProductDetailsEdit">Edit</Link></button>
          <ProductDetailsEdit product={product} /> 
        </div>
      ) : null} */}
    </div>
  );
};

export default SingleProduct;
