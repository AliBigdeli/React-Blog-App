import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState(null);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("");

  const getData = () => {
    axios
      .get("https://fastapi-blog.iran.liara.run/blog/api/v1/post/", {
        timeout: 5000,
        params: { search: search,ordering:order },
      })
      .then((response) => {
        // console.log(response);
        setBlogs(response.data.results);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getData();
  }, [search,order]);

  return (
    <>
      <Header />
      <div className="container">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control w-75"
            placeholder="search current page"
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="form-select w-25" onChange={(e)=>setOrder(e.target.value)} >
            <option defaultValue>OrderBy</option>
            <option value="id">ID Ascending</option>
            <option value="-id">ID Descending</option>
          </select>
        </div>
        <div className="row mb-2">
          {blogs &&
            blogs.map((blog) => (
              <div className="col-md-12" key={blog.id}>
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                  <div className="col p-4 d-flex flex-column position-static">
                    <h3 className="mb-0">{blog.title}</h3>
                    {/* <div className="mb-1 text-body-secondary">Nov 12</div> */}
                    <Link to={`/blogs/${blog.id}`} className="stretched-link">
                      Continue reading
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogList;
