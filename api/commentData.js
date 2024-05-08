import { clientCredentials } from '../utils/client';
import { getSinglePost } from './postData';

const endpoint = clientCredentials.databaseURL;

const getPostComments = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts/${id}/comments`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const createComment = (id, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts/${id}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const deleteComment = (postId, commentId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts/${postId}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((data) => resolve(data))
    .catch(reject);
});

const getCommentDetails = async (postId) => {
  const post = await getSinglePost(postId);
  const postComments = await getPostComments(post.id);

  return { ...post, postComments };
};

export {
  getPostComments,
  createComment,
  deleteComment,
  getCommentDetails,
};
