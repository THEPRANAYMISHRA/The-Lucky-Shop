import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <h4>The Lucky Shop</h4>
            <p>Your go-to destination for luck and style!</p>
          </div>
          <div className="col-lg-4">
            <h4>Categories</h4>
            <ul className="list-unstyled">
              <li>
                <a href="/">Clothing</a>
              </li>
              <li>
                <a href="/">Accessories</a>
              </li>
              <li>
                <a href="/">Footwear</a>
              </li>
              <li>
                <a href="/">Jewelry</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-4">
            <h4>Contact Us</h4>
            <p>123 Lucky Street, Lucky City</p>
            <p>Email: info@theluckyshop.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
        </div>
      </div>
      <div className="text-center mt-3">
        <p>&copy; 2023 The Lucky Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
