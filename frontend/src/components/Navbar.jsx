import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src="https://cdn-icons-png.flaticon.com/128/7610/7610777.png"
            alt="Logo"
            width="30"
            height="24"
            classNameName="d-inline-block align-text-top"
          />
          TheLuckyShop
        </a>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <Link to="/Home">Home</Link>
          <Link to="/products">Products</Link>
        </ul>
        <form classNameName="form-inline">
          <input
            classNameName="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}
