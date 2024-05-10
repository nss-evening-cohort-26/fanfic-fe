/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Badge, Card } from 'react-bootstrap';
import { getPostDetails } from '../../api/postData';
import CommentForm from '../../components/forms/CommentForm';
import CommentCard from '../../components/cards/CommentCard';
import { getPostComments } from '../../api/commentData';
// import PostCard from '../../components/cards/PostCard';

export default function ViewPost() {
  const [postDetails, setPostDetails] = useState({});
  const [commentDetails, setCommentDetails] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getPostDetails(id).then(setPostDetails);
    getPostComments(id).then(setCommentDetails);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col">
      <Card className="post-details ms-5">
        <Card.Body>
          <Badge bg="light" text="dark">
            @{postDetails.author?.firstName} {postDetails.author?.lastName}
          </Badge>
          <Badge bg="secondary">{postDetails.category?.label}</Badge>
          <Card.Title>{postDetails?.title}</Card.Title>
          <Card.Text>{postDetails?.content}</Card.Text>
        </Card.Body>
      </Card>
      <div className="mt-5 d-flex justify-content-center">
        <CommentForm postId={postDetails?.id} key={commentDetails.id} />
      </div>
      <div className="d-flex gap-2 flex-column flex-sm-wrap">
        {commentDetails[0]?.map((comments) => (
          <CommentCard commentObj={comments} key={comments.Id} currentUser={comments.userId} />
        ))}
      </div>
    </div>
  );
}
