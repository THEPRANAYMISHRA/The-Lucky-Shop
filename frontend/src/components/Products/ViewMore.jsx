import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./viewMore.css";

export default function ViewMore(props) {
  const { id } = useParams();
  const baseUrl = "http://localhost:4500";
  const [product, setProduct] = useState([]);
  const [productId, setProductId] = useState("");

  const fetchProducts = (id) => {
    axios
      .get(`${baseUrl}/products/?id=${id}`)
      .then((res) => {
        let obj = res.data;
        setProduct([obj]);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchProducts(id);
  }, [productId]);

  return (
    <div className="p-3 border m-3">
      {product.map((item) => (
        <div key={item.id} className="d-flex gap-3 product-container">
          <img src={item.image} alt="" className="w-25 border product-image" />
          <div className="bg-info w-100 p-1">
            <p className="h2 border my-2">{item.title}</p>
            <p className="h5 border my-2">Rating:{item.rating.rate}</p>
            <button className="btn btn-primary">Buy Now</button>
            <details className="border my-2">
              <summary>Description</summary>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dignissimos quas consectetur nihil architecto sunt quasi nostrum
                numquam fuga itaque repellendus, ipsum fugiat illum culpa cum
                molestiae soluta exercitationem, alias, optio aperiam
                praesentium temporibus mollitia. Cumque soluta doloribus
                eligendi doloremque minus itaque similique repudiandae vel,
                vitae consequatur consequuntur officia, nostrum magni.
              </div>
            </details>
          </div>
        </div>
      ))}
    </div>
  );
}
