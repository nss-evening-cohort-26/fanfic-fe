// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { Button } from 'bootstrap';
// // import { useAuth } from '../utils/context/authContext';
// import { getAllPosts } from '../api/postData';

// function Posts() {
//   const [posts, setPosts] = useState([]);
//   const getAllThePosts = () => {
//     getAllPosts().then(setPosts);
//   };

//   useEffect(() => {
//     getAllThePosts();
//   }, []);

//   return (
//     <div className="text-center my-4">
//       <Link href="/post/new" passHref>
//         <Button>New Post</Button>
//       </Link>
//       <div className="d-flex flex-wrap">
//         {/* map over authors here using AuthorCard component */}
//         {posts.map((post) => (
//           <PostCard key={post.id} authorObj={post} onUpdate={getAllThePosts} />
//         ))}
//       </div>

//     </div>
//   );
// }

// export default Posts;
