/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getPostDetails } from '../../api/postData';
import CommentForm from '../../components/forms/CommentForm';
import CommentCard from '../../components/cards/CommentCard';
import { getPostComments } from '../../api/commentData';

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
    <div className="flex flex-col inter-normal">
      <div className="text-white ms-5 details mt-[60px]">
        <h5>
          {postDetails.author?.firstName} {postDetails.author?.lastName}
        </h5>
        <p>{postDetails?.title}</p>
        <p>{postDetails?.content}</p>
        <p>{postDetails.category?.label}</p>
      </div>
      <div className="w-3/4 mx-auto">
        <div className="mt-5 flex justify-content-center">
          <CommentForm postId={postDetails?.id} key={commentDetails.id} />
        </div>
        <div className="flex flex-column">
          {commentDetails[0]?.map((comments) => (
            <CommentCard commentObj={comments} key={comments.Id} currentUser={comments.userId} />
          ))}
        </div>
      </div>
    </div>
  );
}
