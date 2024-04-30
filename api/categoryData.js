import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getPostCategories = (categoryId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts/category/${categoryId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(console.warn((response) => response.json()))
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

const getAllCategories = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

export {
  getPostCategories,
  getSingleCategory,
  getAllCategories,
};
