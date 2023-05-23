import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Spinner from "../../components/Spinner/Spinner";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getApiData } from "../../utils/api";
import RemoveModal from "../../components/Blog/RemoveModal";
import Pagination from "../../components/Blog/Pagination";
import { useQuery } from "@tanstack/react-query";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString();
}

const BlogList = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("");

  const [page, setPage] = useState(1);
  const [total_pages, setTotalPages] = useState(1);
  const [total_items, setTotalItems] = useState(0);
  const [page_size, setPageSize] = useState(10);

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["posts", page, page_size, order, search],
    keepPreviousData: true,
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

      const response = await getApiData("/blog/api/v1/user/post/", {
        timeout: 5000,
        params: params,
      });
      const { total_items, total_pages } = response.data;
      setTotalItems(total_items);
      setTotalPages(total_pages);

      return response;
    },
  });

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
            <option defaultValue value="id">
              OrderBy (default)
            </option>
            <option value="id">ID Ascending</option>
            <option value="-id">ID Descending</option>
          </select>
          <select
            className="form-select mw-100"
            onChange={(e) => setPageSize(e.target.value)}
          >
            <option defaultValue value={page_size}>
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
          {isLoading && <Spinner/>}
          {isError && <h5>{error.message}</h5>}
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
              {data &&
                data.data.results.map((blog) => (
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
                      <RemoveModal blog={blog} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Pagination
          page={page}
          total_pages={total_pages}
          total_items={total_items}
          setPage={setPage}
        />
      </div>
      <Footer />
    </>
  );
};

export default BlogList;
