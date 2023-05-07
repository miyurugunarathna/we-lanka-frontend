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
  ListProductForAdmin,
  ListCategoryForAdmin,
  CreateCategoryForAdmin,
  CreateProductForAdmin,
  CreateLocationForAdmin,
  CreateInventoryForAdmin,
  EditInventoryDetailForAdmin,
  EditProductForAdmin,
  EditCategoryForAdmin,
  EditLocationForAdmin,
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
          <Route path="/locations" element={<ListLocation />} />

          {/* Products */}
          <Route path="/products" element={<ListProduct />} />

          {/* Super Admin */}
          {/* Home */}
          <Route path="/super-admin/home" element={<HomeForSuperAdmin />} />

          {/* Inventory */}
          <Route
            path="/super-admin/inventories"
            element={<ListInventoryForAdmin />}
          />

          <Route
            path="/super-admin/inventories/add"
            element={<CreateInventoryForAdmin />}
          />

          <Route
            path="/super-admin/inventorys/:id"
            element={<EditInventoryDetailForAdmin />}
          />

          {/* Products */}
          <Route
            path="/super-admin/products"
            element={<ListProductForAdmin />}
          />

          <Route
            path="/super-admin/products/add"
            element={<CreateProductForAdmin />}
          />

          <Route
            path="/super-admin/products/:id"
            element={<EditProductForAdmin />}
          />

          {/* Location */}
          <Route
            path="/super-admin/locations"
            element={<ListLocationForAdmin />}
          />

          <Route
            path="/super-admin/locations/add"
            element={<CreateLocationForAdmin />}
          />

          <Route
            path="/super-admin/locations/:id"
            element={<EditLocationForAdmin />}
          />

          {/* Categories */}
          <Route
            path="/super-admin/categories"
            element={<ListCategoryForAdmin />}
          />

          <Route
            path="/super-admin/categories/add"
            element={<CreateCategoryForAdmin />}
          />

          <Route
            path="/super-admin/categories/:id"
            element={<EditCategoryForAdmin />}
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
