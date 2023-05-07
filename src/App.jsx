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
  HomeForSuperAdmin,
  ListLocationForAdmin,
  ListCategory,
  ListInventoryForAdmin,
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
          <Route path="/categories" element={<ListCategory />} />

          {/* Location */}
          <Route path="/locations/category/:id" element={<ListLocation />} />
          <Route path="/locations" element={<ListLocationForAdmin />} />

          {/* Products */}
          <Route path="/products" element={<ListProduct />} />

          {/* Super Admin */}
          {/* Home */}
          <Route path="/super-admin/home" element={<HomeForSuperAdmin />} />

          {/* Inventory */}
          <Route path="/inventories" element={<ListInventoryForAdmin />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
