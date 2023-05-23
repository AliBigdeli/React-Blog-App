import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Spinner from "../../components/Spinner/Spinner";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getApiData } from "../../utils/api";
import Pagination from "../../components/Blog/Pagination";

const BlogList = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("");

  const [page, setPage] = useState(1);
  const [total_pages, setTotalPages] = useState(1);
  const [total_items, setTotalItems] = useState(0);
  const [page_size, setPageSize] = useState(5);

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

      const response = await getApiData("/blog/api/v1/post/", {
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
        </div>
        <div className="row mb-2">
          {isLoading && <Spinner />}
          {isError && <h5>{error.message}</h5>}
          {data &&
            data.data.results.map((blog) => (
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
