/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { searchPosts } from '../../api/postData';
import PostCard from '../../components/cards/PostCard';

export default function Search() {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const router = useRouter();
  const { searchValue } = router.query;

  const searchAllPosts = () => {
    searchPosts(searchValue)
      .then((posts) => {
        setFilteredPosts(posts);
      })
      .catch((error) => console.error('Error searching posts:', error));
  };

  useEffect(() => {
    if (searchValue) {
      searchAllPosts();
    }
  }, [searchValue]);

  return (
    <>
      <div className="my-4 flex justify-content-center">
        <div className="d-flex flex-wrap mt-32 w-75">
          {filteredPosts.map((post) => <PostCard key={post.id} postObj={post} onUpdate={searchAllPosts} />)}
        </div>
      </div>
    </>
  );
}
