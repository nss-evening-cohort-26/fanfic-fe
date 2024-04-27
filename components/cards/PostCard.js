import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import getSingleUser from '../../api/userData';
import { getSingleCategory } from '../../api/categoryData';

function PostCard({ postObj }) {
  const [author, setAuthor] = useState({});
  const [category, setCategory] = useState({});

  useEffect(() => {
    getSingleUser(postObj.userId).then(setAuthor);
    getSingleCategory(postObj.categoryId).then(setCategory);
  }, [postObj]);

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{postObj.title}</Card.Title>
        <p className="card-text bold">{postObj.content}</p>
        <p className="card-text bold">{category.label}</p>
        <p className="card-text bold">{author.firstName} {author.lastName}</p>
        <Link href={`/post/${postObj.id}`} passHref>
          <Button variant="primary" className="m-2">View</Button>
        </Link>
        <Link href={`/post/edit/${postObj.id}`} passHref>
          <Button variant="info">Edit</Button>
        </Link>
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
};

export default PostCard;
