import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Navbar(props) {
  const { isLoggedIn, userData } = useAuth();
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src="https://cdn-icons-png.flaticon.com/128/7610/7610777.png"
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />
          TheLuckyShop
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="/" className="nav-link">
                <Link to="/home" className="text-decoration-none">
                  Home
                </Link>
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link">
                <Link to="/products" className="text-decoration-none">
                  Products
                </Link>
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link">
                <Link
                  to="/login"
                  className={`text-decoration-none ${
                    isLoggedIn ? "d-none" : "active"
                  }`}
                >
                  Login
                </Link>
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link">
                <Link
                  to="/cart"
                  className={`text-decoration-none ${
                    isLoggedIn ? "active" : "d-none"
                  }`}
                >
                  Cart
                </Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-disabled="true" href="/">
                {userData.name}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
