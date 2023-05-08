import React from "react";

const Pagination = ({ page, total_pages, total_items, setPage }) => {
  return (
    <div className="d-flex justify-content-center">
      <nav aria-label="Page navigation">
        <ul className="pagination">
          {total_pages > 1 && page - 1 != 0 && (
            <li className="page-item">
              <button className="page-link" onClick={() => setPage(1)}>
                first
              </button>
            </li>
          )}
          {total_pages > 1 && page - 1 != 0 && (
            <li className="page-item">
              <button className="page-link" onClick={() => setPage(page - 1)}>
                <i className="bi bi-arrow-left"></i>
              </button>
            </li>
          )}

          {total_pages &&
            [...Array(total_pages).keys()].map((i) => (
              <li
                className={i + 1 == page ? " page-item active" : "page-item"}
                key={i + 1}
              >
                <button className="page-link" onClick={() => setPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
          {total_pages > 1 && page < total_pages && (
            <li className="page-item">
              <button className="page-link" onClick={() => setPage(page + 1)}>
                <i className="bi bi-arrow-right"></i>
              </button>
            </li>
          )}
          {total_pages > 1 && page < total_pages && (
            <li className="page-item">
              <button className="page-link" onClick={() => setPage(total_pages)}>
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
  );
};

export default Pagination;
