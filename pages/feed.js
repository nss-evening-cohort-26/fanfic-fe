import { useEffect, useState } from 'react';
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
    <div className="flex flex-col min-h-full">
      <div className="flex flex-col flexing">
        <div className="flex flexing">
          <div className="flex w-full">
            <aside className="sidebar">
              <div className="h-full max-h-screen sticky top-0">
                <div className="flex flex-col h-full">
                  <h2 className="text-2xl inter-bold mb-2 text-center mt-3">Categories</h2>
                  <nav>
                    <ul className="list-none text-center">
                      <li>Category 1</li>
                      <li>Category 2</li>
                      <li>Category 3</li>
                      <li>Category 4</li>
                    </ul>
                  </nav>
                </div>
              </div>
            </aside>
            <main className="flex w-full ml-[300px]">
              <div className="mr-auto pl-[12px] pr-[12px] w-full pt-4 pb-8">
                <article className="flex flex-col w-full mt-[60px]">
                  {posts.map((post) => (
                    <PostCard key={post.id} postObj={post} onUpdate={getAllThePosts} />
                  ))}
                </article>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
