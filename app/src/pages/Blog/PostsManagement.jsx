import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getApiData } from "../../utils/api";
import RemoveModal from "../../components/Blog/RemoveModal";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString();
}

const BlogList = () => {
  const [blogs, setBlogs] = useState(null);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("");

  const [page, setPage] = useState(1);
  const [total_page, setTotalPage] = useState(1);
  const [total_items, setTotalItems] = useState(0);
  const [page_size, setPageSize] = useState(10);

  const getData = async () => {
    let params = {
      ordering: order,
      page: page,
      page_size: page_size,
    };

    if (search) {
      params.search = search;
      params.page = 1;
    }
    await getApiData("/blog/api/v1/user/post/", {
      timeout: 5000,
      params: params,
    })
      .then((response) => {
        setBlogs(response.data.results);
        setPage(response.data.page);
        setTotalPage(response.data.total_pages);
        setTotalItems(response.data.total_items);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getData();
  }, [search, order, page, page_size]);

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
          <Link
            className="btn btn-outline-secondary mw-100"
            to="/posts-management/create"
          >
            Create
          </Link>
        </div>
        <div className="row mb-2">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">CreatedDate</th>
                <th scope="col">Published</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs &&
                blogs.map((blog) => (
                  <tr key={blog.id}>
                    <th scope="row">{blog.id}</th>
                    <td>{blog.title}</td>
                    <td>{formatDate(blog.created_at)}</td>
                    <td>
                      {blog.is_published ? (
                        <i className="bi bi-check-square-fill text-success"></i>
                      ) : (
                        <i className="bi bi-slash-square-fill text-danger"></i>
                      )}
                    </td>
                    <td>
                      <Link className="btn" to={`/posts-management/${blog.id}`}>
                        <i className="bi bi-pencil-square"></i>
                      </Link>
                      {blog.is_published ? (
                        <Link
                          to={`/blogs/${blog.id}`}
                          className="btn"
                          target={"_blank"}
                        >
                          <i className="bi bi-eye text-primary"></i>
                        </Link>
                      ) : (
                        <button className="btn" disabled>
                          <i className="bi bi-eye-slash text-muted"></i>
                        </button>
                      )}
                      <RemoveModal blog={blog} getData={getData} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
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
