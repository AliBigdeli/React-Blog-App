import "./App.css";
import Home from "./pages/Home/Home";
import BlogList from "./pages/Blog/BlogList";
import BlogDetail from "./pages/Blog/BlogDetail";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Page404 from "./pages/Errors/Page404";

function App() {
  return (
    <main>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/blogs" element={<BlogList />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route path="/page-404" element={<Page404 />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </Router>
    </main>
  );
}

export default App;
