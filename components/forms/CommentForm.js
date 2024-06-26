import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import getSingleUser from '../../api/userData';
import { createComment } from '../../api/commentData';

const initialState = {
  postId: -1,
  userId: -1,
  content: '',
  createdOn: '',
};

function CommentForm({ postId, obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();
  const [userObj, setUserObj] = useState(null);
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!user) return;

    getSingleUser(user.id).then(setUserObj);

    if (obj) {
      setFormInput(obj);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formInput,
      postId,
      userId: userObj.id,
      createdOn: new Date().toISOString(),
    };

    createComment(postId, payload)
      .then(() => {
        router.push(`/post/${postId}`);
        window.location.reload();
      })
      .then(() => setShow(false));
    // .catch((error) => console.error('Error creating comment:', error));
  };

  return (
    <>
      <Button variant="light" size="md" className="mt-3 mb-3" onClick={handleShow}>
        {obj && obj.id ? 'Update' : 'Leave a'} comment
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit} className="p-3">
          <Form.Group className="mb-3 d-flex row" controlId="formBasicInput">
            <Form.Label className="text-black">Leave a comment</Form.Label>
            <Form.Text className="secondary mb-3">Remember, comments are public and will be seen by others. Think - would I say this at a family dinner?</Form.Text>
            <Form.Control type="text" autoComplete="off" name="content" value={formInput.content} onChange={handleChange} placeholder="Comment" className="w-[90%] mx-auto rounded-sm" />
          </Form.Group>
          <Button variant="success" className="float-end" type="submit">
            Send
          </Button>
        </Form>
      </Modal>
    </>
  );
}

CommentForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
  }),
  postId: PropTypes.number,
};

CommentForm.defaultProps = {
  obj: null,
  postId: null,
};

export default CommentForm;
