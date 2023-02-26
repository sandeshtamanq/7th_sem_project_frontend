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
import { ToastContainer } from "react-toastify";
import Brand from "./components/admin/brand/Brand";

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
      path: "/user",
      element: (
        <Layout>
          <Users />
        </Layout>
      ),
    },
    {
      path: "/product",
      element: (
        <Layout>
          <Product />
        </Layout>
      ),
    },
    {
      path: "/brand",
      element: (
        <Layout>
          <Brand />
        </Layout>
      ),
    },
  ]);
  return (
    <div className="font-display">
      <ToastContainer />
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
