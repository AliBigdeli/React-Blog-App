import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getApiData, putApiData } from "../../utils/api";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const PostsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [postData, setPostData] = useState(null);
  const [postFormData, setPostFormData] = useState({
    title: "",
    content: "",
    is_published: false,
  });

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const response = await getApiData(`/blog/api/v1/user/post/${id}/`);
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
    onSuccess: (data) => {
      setPostFormData({
        ...postFormData,
        title: data.data.title,
        content: data.data.content,
        is_published: data.data.is_published,
      });
      setPostData(data.data);
    },
  });

  const mutation = useMutation({
    mutationFn: async () => {
      await putApiData(
        `/blog/api/v1/user/post/${id}/`,
        JSON.stringify(postFormData)
      );
    },
    onSuccess: () => {
      toast.success("post has been updated successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post",id] });
    },
    onError: (error) => {
      toast.error(`something went wrong, ${error.message}`);
    },
  });

  return (
    <>
      <Header />
      <div className="container">
        <>
          <h1 className="text-center">Edit Post {postData && postData.id} </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault;
              mutation.mutate({})
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

export default PostsEdit;
