import { clientCredentials } from '../utils/client';

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

const createComment = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts/${payload.postId}/comments`, {
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

export {
  getPostComments,
  createComment,
};
