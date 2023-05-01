import "./App.css";
import React, { lazy, Suspense } from "react";
const Home = lazy(() => import("./pages/Home/Home"));
const BlogList = lazy(() => import("./pages/Blog/BlogList"));
const BlogDetail = lazy(() => import("./pages/Blog/BlogDetail"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Page404 = lazy(() => import("./pages/Errors/Page404"));
const PostMGMT = lazy(() => import("./pages/Blog/PostsManagement"));
const PostsEdit = lazy(() => import("./pages/Blog/PostsEdit"));
const PostsCreate = lazy(() => import("./pages/Blog/PostsCreate"));
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";

function App() {
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);

  return (
    <main>
      <Router>
        <div>
          <Suspense
            fallback={
              <div className="centered-spinner">
                <ReactLoading
                  type="spin"
                  color="gray"
                  height={200}
                  width={200}
                />
              </div>
            }
          >
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/blogs" element={<BlogList />} />
              <Route path="/blogs/:id" element={<BlogDetail />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              {isAuthenticated && (
                <React.Fragment>
                  <Route exact path="/posts-management" element={<PostMGMT />} />
                  <Route exact path="/posts-management/:id" element={<PostsEdit />} />
                  <Route exact path="/posts-management/create" element={<PostsCreate />} />
                </React.Fragment>
              )}
              <Route path="/page-404" element={<Page404 />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
      <ToastContainer />
    </main>
  );
}

export default App;
