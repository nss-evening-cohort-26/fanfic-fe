import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getPostCategories = (categoryId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts/categories/${categoryId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleCategory = (categoryId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/categories/${categoryId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getPostCategories,
  getSingleCategory,
};
