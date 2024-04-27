import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getAllPosts } from '../api/postData';
import PostCard from '../components/cards/PostCard';

function Posts() {
  const [posts, setPosts] = useState([]);
  const getAllThePosts = () => {
    getAllPosts().then(setPosts);
  };

  useEffect(() => {
    getAllThePosts();
  }, []);
  return (
    <div className="text-center my-4">
      <Link href="/post/new" passHref>
        <Button>New Post</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {posts.map((post) => (
          <PostCard key={post.id} postObj={post} onUpdate={getAllThePosts} />
        ))}
      </div>

    </div>
  );
}

export default Posts;
