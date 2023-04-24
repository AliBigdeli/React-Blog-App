import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import axios from "axios";

const BlogList = () => {
  const [blogs, setBlogs] = useState(null);

  const getData = () => {
    axios
      .get("https://fastapi-blog.iran.liara.run/blog/api/v1/post/", {
        timeout: 5000,
      })
      .then((response) => {
        console.log(response);
        setBlogs(response.data.results)

      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getData()
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <div className="row mb-2">
          {blogs &&
            blogs.map((blog) => (
              <div className="col-md-12" key={blog.id}>
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                  <div className="col p-4 d-flex flex-column position-static">
                    <h3 className="mb-0">{blog.title}</h3>
                    {/* <div className="mb-1 text-body-secondary">Nov 12</div> */}
                    <a href="#" className="stretched-link">
                      Continue reading
                    </a>
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
