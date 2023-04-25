import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const baseUrl = 'https://fastapi-blog.iran.liara.run'


const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();
  const getData = (url) => {
    axios
      .get(`${baseUrl}`+url, {
        timeout: 5000,
      })
      .then((response) => {
        // console.log(response);
        setBlog(response.data);
      })
      .catch((err) =>{
      console.log(err)
      if (err.response.status == 404) {
        navigate('/page-404')
      }
    });
  };
  useEffect(() => {
    getData(`/blog/api/v1/post/${id}/`);
  }, []);

  return (
    <>
      <Header />
      {blog && 
        <div className="container">
          <h1>{blog.title}</h1>
          <p>{blog.content}</p>
        </div>
      }
      <Footer />
    </>
  );
};

export default BlogDetail;
