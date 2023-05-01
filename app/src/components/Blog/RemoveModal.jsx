import React from "react";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteApiData } from "../../utils/api";
import { toast } from "react-toastify";

const RemoveModal = (props) => {
  const [showModal, setShowModal] = useState(false);

  const requestDelete = async () => {
    console.log(props.blog.id);
    const response = await deleteApiData(
      `/blog/api/v1/user/post/${props.blog.id}/`
    );
    if (response.status == 204) {
      setShowModal(false);
      toast.success(`post id ${props.blog.id} has removed successfully`);
      props.getData()
    } else {
      setShowModal(false);
      response.data.detail && toast.error(`post id ${props.blog.id} removal failed, due to ${response.data.detail}`);
      response.data.details && toast.error(`post id ${props.blog.id} removal failed, due to ${response.data.details}`);
    }
  };

  //   console.log(blog);
  return (
    <>
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
            onClick={() => {
              requestDelete();
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
