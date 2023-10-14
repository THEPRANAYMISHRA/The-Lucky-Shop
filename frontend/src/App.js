import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products"
import Home from "./components/Home/Home"
import Login from "./components/Login/Login";
import Cart from "./components/Cart/Cart";
import Signup from "./components/signup/Signup";
import { AuthProvider } from "./components/AuthContext";
import { CartProvider } from "./components/CartContext";
import ViewMore from "./components/Products/ViewMore";
import Payments from "./components/payments/Payments";


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <Routes >
            <Route path="*" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/view/:id" element={<ViewMore />} />
            <Route path="/payments" element={<Payments />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
