import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { deleteComment } from '../../api/commentData';
import { useAuth } from '../../utils/context/authContext';
import getSingleUser from '../../api/userData';

function CommentCard({ commentObj }) {
  const [author, setAuthor] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    getSingleUser(commentObj.authorId).then(setAuthor);
  }, []);

  const removeComment = () => {
    if (window.confirm('Remove comment?')) {
      deleteComment(commentObj.postId, commentObj.id).then(window.location.reload());
    }
  };

  return (
    <div className="d-flex justify-content-center mb-4">
      <Card key={commentObj.id} border="dark" className="text-white" style={{ width: '1000px', backgroundColor: '#333' }}>
        <div className="d-flex gap-3 mx-3 mb-1 mt-2">
          <h5><strong>{commentObj.user}</strong></h5>
          <h5>{commentObj.createdOn}</h5>
        </div>
        <p className="text-white mx-3" style={{ backgroundImage: 'none' }}>
          {commentObj.content}
        </p>
        {user?.id === author?.id && (
          <div>
            <Button variant="dark" size="md" onClick={removeComment}>Delete</Button>
          </div>
        )}
      </Card>
    </div>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    createdOn: PropTypes.string,
    user: PropTypes.string,
    postId: PropTypes.number,
    authorId: PropTypes.number,
  }).isRequired,
  obj: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

export default CommentCard;
