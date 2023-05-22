import React from "react";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteApiData } from "../../utils/api";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "../Spinner/Spinner";

const RemoveModal = (props) => {
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      await deleteApiData(`/blog/api/v1/user/post/${props.blog.id}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setShowModal(false);
      toast.success(`post id ${props.blog.id} has removed successfully`);
    },
    onError: (error) => {
      setShowModal(false);
      toast.error(`something went wrong, ${error.message}`);
    },
  });

  //   console.log(blog);
  return (
    <>
      {mutation.isLoading && <Spinner />}
      <button className="btn" onClick={() => setShowModal(true)}>
        <i className="bi bi-trash-fill text-danger"></i>
      </button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Removal</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove this post?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={(e) => {
              e.preventDefault();
              mutation.mutate({});
            }}
          >
            Remove Item
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RemoveModal;
