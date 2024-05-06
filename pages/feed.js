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
    <div>
      <Link href="/post/new" passHref>
        <Button variant="dark">New Post</Button>
      </Link>
      <div>
        {posts.map((post) => (
          <PostCard key={post.id} postObj={post} onUpdate={getAllThePosts} />
        ))}
      </div>
    </div>
  );
}

export default Posts;
