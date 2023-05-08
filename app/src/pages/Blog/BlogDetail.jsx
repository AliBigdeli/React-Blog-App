import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getApiData } from "../../utils/api";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const response = await getApiData(`/blog/api/v1/post/${id}/`);
      return response;
    },
    retry: false,
    onError: (error) => {
      console.log("test");
      if (error.response?.status === 404 || error.response?.status === 422) {
        navigate("/page-404");
        return false;
      }
    },
  });
  return (
    <>
      <Header />
      {isLoading && <h1>loading</h1>}
      {/* {isError && <h1>{error.message}</h1>} */}

      {data && (
        <div className="container">
          <h1>{data.data.title}</h1>
          <p>{data.data.content}</p>
        </div>
      )}
      <Footer />
    </>
  );
};

export default BlogDetail;
