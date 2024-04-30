/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import getSingleUser from '../../api/userData';
import { getSingleCategory } from '../../api/categoryData';
import { getSinglePost } from '../../api/postData';

export default function ViewPost() {
  const [postDetails, setPostDetails] = useState({});
  const [author, setAuthor] = useState({});
  const [category, setCategory] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { id } = router.query;

  useEffect(() => {
    getSinglePost(id).then(setPostDetails);
    getSingleUser(id).then(setAuthor);
    getSingleCategory(id).then(setCategory);
  }, [id]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-white ms-5 details">
        <h5>
          {author.firstName} {author.lastName}
        </h5>
        <p>{postDetails.title}</p>
        <p>{postDetails.content}</p>
        <p>{category.label}</p>
      </div>
    </div>
  );
}
