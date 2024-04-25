import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getPostCategories = (categoryId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts/category/${categoryId}`, {
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

export default getPostCategories;
