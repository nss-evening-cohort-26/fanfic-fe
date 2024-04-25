import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getPostCategories = (categoryId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts/category/${categoryId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export default getPostCategories;
