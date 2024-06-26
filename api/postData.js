import { clientCredentials } from '../utils/client';
import { getSingleCategory } from './categoryData';
import getSingleUser from './userData';

const endpoint = clientCredentials.databaseURL;

const getAllPosts = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch(reject);
});

const getSinglePost = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data[0]))
    .catch(reject);
});

const createPost = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deletePost = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const updatePost = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts/${payload.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getUserPosts = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getPostDetails = async (postId) => {
  const post = await getSinglePost(postId);
  const category = await getSingleCategory(post.categoryId);
  const author = await getSingleUser(post.userId);

  return { ...post, category, author };
};

const searchPosts = (searchValue) => {
  const url = `https://localhost:7074/search?searchValue=${searchValue}`;

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => data.map((post) => ({
      id: post.id,
      userId: post.user.id,
      user: post.user,
      title: post.title,
      content: post.content,
      categoryId: post.categoryId,
      categories: post.categories,
      comments: post.comments,
    })))
    .catch((error) => {
      console.error('Error searching posts:', error);
      throw error;
    });
};
export {
  getAllPosts,
  getSinglePost,
  createPost,
  deletePost,
  updatePost,
  getUserPosts,
  getPostDetails,
  searchPosts,
};
