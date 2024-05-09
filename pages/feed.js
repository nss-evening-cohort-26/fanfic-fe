/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useEffect, useState } from 'react';
import { getAllPosts } from '../api/postData';
import PostCard from '../components/cards/PostCard';
import { getAllCategories, getPostsByCategory } from '../api/categoryData';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState([]);

  const getAllThePosts = () => {
    getAllPosts().then(setPosts);
  };

  const getCategories = async () => {
    const data = await getAllCategories();
    const categories = setCategory(data);

    return { categories };
  };

  const handleSort = (e) => {
    getPostsByCategory(e.target.id).then((data) => setPosts(data));
  };

  console.warn(category);

  useEffect(() => {
    getAllThePosts();
    getCategories();
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
                    <ul className="list-none ml-11">
                      <li onClick={getAllThePosts} className="text-lg inter-bold mb-2">
                        All
                      </li>
                      <li onClick={handleSort} className="text-lg inter-bold mb-2" id="1">
                        {category[0]?.label}
                      </li>
                      <li onClick={handleSort} className="text-lg inter-bold mb-2" id="2">
                        {category[1]?.label}
                      </li>
                      <li onClick={handleSort} className="text-lg inter-bold mb-2" id="3">
                        {category[2]?.label}
                      </li>
                      <li onClick={handleSort} className="text-lg inter-bold mb-2" id="4">
                        {category[3]?.label}
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </aside>
            <main className="flex w-[1100px] pl-[200px] mx-auto">
              <div className="flex-grow mx-auto pl-[12px] pr-[12px] w-full pt-4 pb-8">
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
