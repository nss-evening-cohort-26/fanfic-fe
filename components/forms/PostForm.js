import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPost, updatePost } from '../../api/postData';
import { getAllCategories } from '../../api/categoryData';

const initialState = {
  title: '',
  content: '',
  category: '',
};

export default function PostForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getAllCategories().then(setCategories);
    if (obj.id) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
      userId: user.id,
    };
    if (obj.id) {
      updatePost(formInput).then(() => router.push(`/post/${obj.id}`));
    } else {
      createPost(payload).then(router.push('/feed'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Label>{obj.id ? 'Update' : 'Create'} Post</Form.Label>

      {/* TITLE INPUT  */}
      <Form.Group controlId="formTitle" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a title"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </Form.Group>

      {/* POST CONTENT TEXTAREA  */}
      <Form.Group controlId="formContent" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Content"
          style={{ height: '100px' }}
          name="content"
          value={formInput.content}
          onChange={handleChange}
          required
        />
      </Form.Group>

      {/* CATEGORY SELECT  */}
      <Form.Group controlId="formSelect" className="mb-3">
        <Form.Select
          aria-label="Category"
          name="categoryId"
          onChange={handleChange}
          className="mb-3"
          value={obj.categoryId}
          required
        >
          <option value="">Select a Category</option>
          {
            categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.label}
              </option>
            ))
          }
        </Form.Select>
      </Form.Group>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.id ? 'Update' : 'Create'} Post</Button>
    </Form>
  );
}

PostForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    categoryId: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    category: PropTypes.string,
  }),
};

PostForm.defaultProps = {
  obj: initialState,
};
