import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Page } from "../../components";
import { ServiceAPI } from "../../infrastructure";
import "./Product.style.scss";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const json = await ServiceAPI.fetchProduct(id);
      if (json.error !== null) {
        setMessage(json.error);
        return;
      }

      setProduct(json.data.product);
    };

    fetchData();
  }, []);

  return (
    <Page>
      <div className="product-page">
        {message && <p>{message}</p>}
        {product && (
          <>
            <div className="product-page__product">
              <div style={{display: "flex"}}>
                <div>
                <img src="https://www.ikea.com/ca/en/images/products/mammut-childrens-chair-indoor-outdoor-red__0727924_pe735940_s5.jpg" width="300" height="400"></img>
                </div>
                <div>
                  <h3>Title: {product.title}</h3>
                  <p>ID: {id}</p>
                  <p>Description: {product.description}</p>
                </div>
              </div>
            </div>
            <Link to={`/checkout/${product.id}`}>
              <button>Buy Now</button>
              
            </Link>
          </>
        )}
      </div>
    </Page>
  );
}

export default Product;
