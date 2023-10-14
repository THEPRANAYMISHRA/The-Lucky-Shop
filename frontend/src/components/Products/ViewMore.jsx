import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./viewMore.css";

export default function ViewMore(props) {
  const { id } = useParams();
  const baseUrl = "http://localhost:4500";
  const [product, setProduct] = useState([]);

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
  }, []);

  return (
    <div className="p-3 m-3 outer-container">
      {product.map((item) => (
        <div key={item.id} className="d-flex gap-3 product-container">
          <img src={item.image} alt="" className="w-25 border product-image" />
          <div className="w-100 p-3">
            <p className="text-secondary-emphasis">
              Category : {item.category}
            </p>
            <p className="h2 my-2">{item.title}</p>
            <p className="h5 my-2">Rating:{item.rating.rate}</p>
            <Link
              className="btn btn-primary"
              to={`/payments/?productId=${item._id}`}
            >
              Buy Now
            </Link>
            <details className="my-2">
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
