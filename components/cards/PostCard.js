import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import getSingleUser from '../../api/userData';
import { getSingleCategory } from '../../api/categoryData';
import { deletePost } from '../../api/postData';
import { useAuth } from '../../utils/context/authContext';

function PostCard({ postObj, onUpdate }) {
  const [author, setAuthor] = useState({});
  const [category, setCategory] = useState({});
  const { user } = useAuth();

  const deleteThisPost = () => {
    if (window.confirm('Delete?')) {
      deletePost(postObj.id).then(() => onUpdate());
    }
  };

  useEffect(() => {
    getSingleUser(postObj.userId).then(setAuthor);
    getSingleCategory(postObj.categoryId).then(setCategory);
  }, [postObj]);

  return (
    <Card key={postObj.id} style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{postObj.title}</Card.Title>
        <p className="card-text bold">{postObj.content}</p>
        <p className="card-text bold">{category.label}</p>
        <p className="card-text bold">{author.firstName} {author.lastName}</p>
        <Link href={`/post/${postObj.id}`} passHref>
          <Button variant="primary" className="m-2">View</Button>
        </Link>
        {user?.id === author?.id && (
        <div className="postBtns">
          <Link href={`/post/edit/${postObj.id}`} passHref>
            <Button variant="info">Edit</Button>
          </Link>
          <Button variant="danger" onClick={deleteThisPost} className="m-2">
            DELETE
          </Button>
        </div>
        )}
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    categoryId: PropTypes.number,
    userId: PropTypes.number,
    id: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostCard;
