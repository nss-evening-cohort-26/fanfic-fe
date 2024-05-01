import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSinglePost } from '../../../api/postData';
import PostForm from '../../../components/forms/PostForm';

function EditPost() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSinglePost(id).then(setEditItem);
  }, [id]);

  return <PostForm obj={editItem} />;
}

export default EditPost;
