import { HashRouter, Route, Routes } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AddProductForm from './for admin/AddProductForm';
import EditProductForm from './for admin/EditProductForm';
import Layout from './layout/Layout';
import Cart from './pages/Cart';
import NewProducts from './for admin/NewProducts';
import NPD from './for admin/NPD';
import UpdatesPage from './for admin/UpdatesPage';
import DeleteProductPage from './for admin/DeleteProductPage';
const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProductListPage />} />
          <Route path="/product/:id" element={<NPD />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="/products" element={<NewProducts/>} />
          <Route path="/admin/add-product" element={<AddProductForm />} />
          <Route path="/admin/edit-product/:productId" element={<EditProductForm />} />
          <Route path="/updates" element={<UpdatesPage />} />
          <Route path="/admin/delete-product/:productId" element={<DeleteProductPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;

