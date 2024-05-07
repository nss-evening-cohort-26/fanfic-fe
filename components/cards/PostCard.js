import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { Badge, Button } from 'react-bootstrap';
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
    <Card key={postObj.id} className="post-card">
      <Card.Body>
        <Badge bg="light" text="dark">@{author.firstName} {author.lastName}</Badge>
        <Badge bg="secondary">{category.label}</Badge>
        <Card.Title>{postObj.title}</Card.Title>
        <Card.Text>{postObj.content}</Card.Text>
        <div className="post-btns">
          <Button variant="outline-light">
            <Link href={`/post/${postObj.id}`} passHref>View</Link>
          </Button>
          {user?.id === author?.id && (
          <>
            <Button variant="outline-light">
              <Link href={`/post/edit/${postObj.id}`} passHref>Edit</Link>
            </Button>
            <Button variant="outline-light" onClick={deleteThisPost}>Delete</Button>
          </>
          )}
        </div>
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
