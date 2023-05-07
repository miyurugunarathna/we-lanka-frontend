import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import {
  Login,
  Register,
  Home,
  ListLocation,
  ListProduct,
  Cart,
  Order,
} from "./pages";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Categories */}
          <Route path="/home" element={<Home />} />

          {/* Location */}
          <Route path="/locations/category/:id" element={<ListLocation />} />

          {/* Products */}
          <Route path="/products" element={<ListProduct />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Order />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
