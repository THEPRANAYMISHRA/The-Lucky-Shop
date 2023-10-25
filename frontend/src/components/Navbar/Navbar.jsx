import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";

export default function Navbar(props) {
  const { isLoggedIn, userData } = useAuth();
  const avatar = localStorage.getItem("avatar");
  const dataUrl = `data:image/jpeg;base64,${avatar}`;

  // const baseUrl = "http://localhost:4500";
  const baseUrl = "https://the-lucky-shop.onrender.com";

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        authorization: token,
      },
    };
    axios
      .post(`${baseUrl}/user/logout`, config)
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem("token");
          window.location.reload();
        }
      })
      .catch((err) => {
        alert(err.msg);
      });
  };

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
              <div className="dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center gap-2"
                  href="/"
                  role="button"
                  id="profileDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {isLoggedIn ? (
                    <img
                      src={dataUrl}
                      alt="Profile Icon"
                      style={{
                        width: "25px",
                        height: "25px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <box-icon name="user-circle"></box-icon>
                  )}
                  {isLoggedIn ? userData.name : "Profile"}
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="profileDropdown"
                >
                  <li>
                    <a
                      href="/"
                      className={`dropdown-item ${
                        isLoggedIn ? "d-none" : "d-block"
                      }`}
                    >
                      <Link
                        to="/login"
                        className={`text-decoration-none ${
                          isLoggedIn ? "d-none" : "d-block"
                        }`}
                      >
                        Login
                      </Link>
                    </a>
                  </li>
                  <li>
                    <a
                      className={`dropdown-item ${
                        isLoggedIn ? "d-block" : "d-none"
                      }`}
                      href="/"
                    >
                      <Link to="/" className="text-decoration-none">
                        View Profile
                      </Link>
                    </a>
                  </li>
                  <li>
                    <button
                      className={`dropdown-item ${
                        isLoggedIn ? "d-block" : "d-none"
                      }`}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
