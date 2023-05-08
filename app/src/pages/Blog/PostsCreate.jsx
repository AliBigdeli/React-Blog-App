import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { postApiData } from "../../utils/api";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const PostsCreate = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async () => {
      await postApiData(
        `/blog/api/v1/user/post/`,
        JSON.stringify(postFormData)
      );
    },
    onSuccess: () => {
      toast.success("post has been created successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/posts-management");
    },
    onError: (error) => {
      toast.error(`something went wrong, ${error.message}`);
    },
  });
  const [postFormData, setPostFormData] = useState({
    title: "",
    content: "",
    is_published: false,
  });

  return (
    <>
      <Header />
      <div className="container">
        <>
          <h1 className="text-center">Create Post </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("test");
              mutation.mutate({});
            }}
          >
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
            <Link className="btn btn-secondary" to="/posts-management">
              Cancel
            </Link>
          </form>
        </>
      </div>
      <Footer />
    </>
  );
};

export default PostsCreate;
