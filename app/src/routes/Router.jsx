import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
const HomePage = lazy(() => import("../pages/Home/Home"));
const BlogList = lazy(() => import("../pages/Blog/BlogList"));
const BlogDetail = lazy(() => import("../pages/Blog/BlogDetail"));
const Login = lazy(() => import("../pages/Auth/Login"));
const Register = lazy(() => import("../pages/Auth/Register"));
const Page404 = lazy(() => import("../pages/Errors/Page404"));

const Router = () => {
  if (JSON.parse(localStorage.getItem("userData"))?.token) {
    return createBrowserRouter([
      {
        path: "/",
        element: <HomePage />,
      }
    ]);
  } else
    return createBrowserRouter([
      {
        path: "/blogs",
        element: <BlogList />,
      },
      {
        path: "/page-404",
        element: <Page404/>,
      },
      {
        path: "*",
        element: <Navigate to={"/page-404"} />,
      },
    ]);
};

export default Router;
