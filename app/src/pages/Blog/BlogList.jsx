import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
const BlogList = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="row mb-2">
          
          <div className="col-md-12">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <h3 className="mb-0">Featured post</h3>
                {/* <div className="mb-1 text-body-secondary">Nov 12</div> */}
                <a href="#" className="stretched-link">
                  Continue reading
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogList;
