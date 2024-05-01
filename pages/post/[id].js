/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getPostDetails } from '../../api/postData';

export default function ViewPost() {
  const [postDetails, setPostDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getPostDetails(id).then(setPostDetails);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-white ms-5 details">
        <h5>
          {postDetails.author?.firstName} {postDetails.author?.lastName}
        </h5>
        <p>{postDetails?.title}</p>
        <p>{postDetails?.content}</p>
        <p>{postDetails.category?.label}</p>
      </div>
    </div>
  );
}
