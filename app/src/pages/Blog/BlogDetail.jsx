import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getApiData } from "../../utils/api";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  const postQuery = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const response = await getApiData(`/blog/api/v1/post/${id}/`);
      if (response.data) setBlog(response.data);
      return response;
    },
  });
  // if (postQuery.isError && postQuery.error.response.status === 404)
  //   navigate("/page-404");
  return (
    <>
      <Header />
      {postQuery.isLoading && <h1>loading</h1>}

      {blog && (
        <div className="container">
          <h1>{blog.title}</h1>
          <p>{blog.content}</p>
        </div>
      )}
      <Footer />
    </>
  );
};

export default BlogDetail;
