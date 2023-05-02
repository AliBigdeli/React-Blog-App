import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getApiData } from "../../utils/api";

const BlogList = () => {
  const [blogs, setBlogs] = useState(null);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("");

  const [page, setPage] = useState(1);
  const [total_page, setTotalPage] = useState(1);
  const [total_items, setTotalItems] = useState(0);
  const [page_size, setPageSize] = useState(5);

  const postsQuery = useQuery({
    queryKey: ["posts", page, page_size, order, search],
    queryFn: async () => {
      let params = {
        ordering: order,
        page: page,
        page_size: page_size,
      };

      if (search) {
        params.search = search;
        params.page = 1;
      }

      const response = await axios.get(
        "https://fastapi-blog.iran.liara.run/blog/api/v1/post/",
        {
          timeout: 5000,
          params: params,
        }
      );
      const { total_items, total_pages } = response.data;
      setTotalItems(total_items);
      setTotalPage(total_pages);

      return response;
    },
  });
  // if (postsQuery.isLoading) return <h1>loading</h1>;
  // if (postsQuery.isError) return <h1>error</h1>;

  // console.log(postsQuery.data.data)
  return (
    <>
      <Header />
      <div className="container">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control w-50"
            placeholder="search posts"
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="form-select mw-100"
            onChange={(e) => setOrder(e.target.value)}
          >
            <option defaultValue value="">
              OrderBy (default)
            </option>
            <option value="id">ID Ascending</option>
            <option value="-id">ID Descending</option>
          </select>
          <select
            className="form-select mw-100"
            onChange={(e) => setPageSize(e.target.value)}
          >
            <option defaultValue value="5">
              page size (default)
            </option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
        <div className="row mb-2">
          {postsQuery.isLoading && <h5>loading...</h5>}
          {postsQuery.isSuccess &&
            postsQuery.data.data &&
            postsQuery.data.data.results.map((blog) => (
              <div className="col-md-12" key={blog.id}>
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                  <div className="col p-4 d-flex flex-column position-static">
                    <h3 className="mb-0">{blog.title}</h3>
                    <Link to={`/blogs/${blog.id}`} className="stretched-link">
                      Continue reading
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="d-flex justify-content-center">
          <nav aria-label="Page navigation">
            <ul className="pagination">
              {total_page > 1 && page - 1 != 0 && (
                <li className="page-item">
                  <button className="page-link" onClick={() => setPage(1)}>
                    first
                  </button>
                </li>
              )}
              {total_page > 1 && page - 1 != 0 && (
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => setPage(page - 1)}
                  >
                    <i className="bi bi-arrow-left"></i>
                  </button>
                </li>
              )}

              {total_page &&
                [...Array(total_page).keys()].map((i) => (
                  <li
                    className={
                      i + 1 == page ? " page-item active" : "page-item"
                    }
                    key={i + 1}
                  >
                    <button
                      className="page-link"
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              {total_page > 1 && page < total_page && (
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => setPage(page + 1)}
                  >
                    <i className="bi bi-arrow-right"></i>
                  </button>
                </li>
              )}
              {total_page > 1 && page < total_page && (
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => setPage(total_page)}
                  >
                    last
                  </button>
                </li>
              )}
            </ul>
            <div className="d-flex justify-content-center align-items-center text-center">
              total items : {total_items}
            </div>
          </nav>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogList;
