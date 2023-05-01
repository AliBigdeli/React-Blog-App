import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getApiData, putApiData } from "../../utils/api";
import { toast } from "react-toastify";

const PostsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = useState(null);

  const [postFormData, setPostFormData] = useState({
    title: "",
    content: "",
    is_published: false,
  });

  const getData = () => {
    getApiData(`/blog/api/v1/user/post/${id}/`, {
      timeout: 5000,
    })
      .then((response) => {
        // setPostFormData(response.data);
        setPostFormData({
          ...postFormData,
          title: response.data.title,
          content: response.data.content,
          is_published: response.data.is_published,
        });
        setPostData(response.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status == 404) {
          navigate("/page-404");
        }
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await putApiData(
      `/blog/api/v1/user/post/${postData.id}/`,
      JSON.stringify(postFormData)
    );
    console.log(response);
    if (response.status == 202) {
      toast.success("post has been updated successfully");
      navigate("/posts-management")
    } else {
      response.data.detail &&
        toast.error(`problem updating the post: ${response.data.detail}`);
      response.data.details &&
        toast.error(`problem updating the post: ${response.data.details}`);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <>
          <h1 className="text-center">Edit Post {postData && postData.id} </h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={postFormData.title}
                onChange={(e) =>
                  setPostFormData({ ...postFormData, title: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                className="form-control"
                id="content"
                name="content"
                value={postFormData.content}
                onChange={(e) =>
                  setPostFormData({ ...postFormData, content: e.target.value })
                }
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="is_published"
                name="is_published"
                checked={postFormData.is_published}
                onChange={(e) =>
                  setPostFormData({
                    ...postFormData,
                    is_published: e.target.checked,
                  })
                }
              />
              <label className="form-check-label" htmlFor="is_published">
                Publish
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </>
      </div>
      <Footer />
    </>
  );
};

export default PostsEdit;
