import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Dashboard from "./components/admin/dashboard/Dashboard";
import Layout from "./components/admin/layout/Layout";
import WebLayout from "./components/web/layout/WebLayout";
import Home from "./components/web/home/Home";
import Login from "./components/auth/Login";
import { useAuthContext } from "./hooks/useAuthContext";
import ProtectedRoutes from "./components/common/ProtectedRoutes";
import Register from "./components/auth/Register";
import Users from "./components/admin/users/Users";
import Product from "./components/admin/products/Product";
import ProductPage from "./components/web/products/Product";
import { ToastContainer } from "react-toastify";
import Brand from "./components/admin/brand/Brand";
import ProductDetail from "./components/web/products/ProductDetail";
import CartList from "./components/web/cart/CartList";
import AddProduct from "./components/admin/products/integrate/AddProduct";
import Order from "./components/admin/order/Order";
import ContactUs from "./components/web/contact-us/ContactUs";
import AboutUs from "./components/web/about-us/AboutUs";
import ClientOrder from "./components/web/order/Order";
import EditProduct from "./components/admin/products/integrate/EditProduct";

function App() {
  const { isLoggedIn } = useAuthContext();
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <WebLayout>
          <Home />
        </WebLayout>
      ),
    },
    {
      path: "/products",
      element: (
        <WebLayout>
          <ProductPage />
        </WebLayout>
      ),
    },
    {
      path: "/product/:id",
      element: (
        <WebLayout>
          <ProductDetail />
        </WebLayout>
      ),
    },
    {
      path: "/cart",
      element: (
        <WebLayout>
          <CartList />
        </WebLayout>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <Layout>
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        </Layout>
      ),
    },
    {
      path: "/login",
      element: <WebLayout>{isLoggedIn ? <Navigate to="/" /> : <Login />}</WebLayout>,
    },
    {
      path: "/signup",
      element: (
        <WebLayout>
          <Register />
        </WebLayout>
      ),
    },
    {
      path: "/contact-us",
      element: (
        <WebLayout>
          <ContactUs />
        </WebLayout>
      ),
    },
    {
      path: "/about-us",
      element: (
        <WebLayout>
          <AboutUs />
        </WebLayout>
      ),
    },
    {
      path: "/orders",
      element: (
        <WebLayout>
          <ClientOrder />
        </WebLayout>
      ),
    },
    {
      path: "/admin/user",
      element: (
        <Layout>
          <ProtectedRoutes>
            <Users />
          </ProtectedRoutes>
        </Layout>
      ),
    },
    {
      path: "/admin/:id/edit",
      element: (
        <Layout>
          <ProtectedRoutes>
            <EditProduct />
          </ProtectedRoutes>
        </Layout>
      ),
    },
    {
      path: "/admin/product",
      element: (
        <Layout>
          <ProtectedRoutes>
            <Product />
          </ProtectedRoutes>
        </Layout>
      ),
    },
    {
      path: "/admin/product/add",
      element: (
        <Layout>
          <ProtectedRoutes>
            <AddProduct />
          </ProtectedRoutes>
        </Layout>
      ),
    },
    {
      path: "/admin/brand",
      element: (
        <Layout>
          <ProtectedRoutes>
            <Brand />
          </ProtectedRoutes>
        </Layout>
      ),
    },
    {
      path: "/admin/orders",
      element: (
        <Layout>
          <ProtectedRoutes>
            <Order />
          </ProtectedRoutes>
        </Layout>
      ),
    },
  ]);
  return (
    <div className="font-display bg-gray-50">
      <ToastContainer />
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
