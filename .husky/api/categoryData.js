import axios from 'axios';
import { clientCredentials } from '../../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getAllCatgories = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/categories`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getCategoriesByStop = (stopId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/stopcategories?stop_id=${stopId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createStopCategory = (stopCatObj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/stopcategories`, {
    method: 'POST',
    body: JSON.stringify(stopCatObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const deleteStopCategory = (stopCategoryId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/stopcategories/${stopCategoryId}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

export {
  getAllCatgories,
  getCategoriesByStop,
  createStopCategory,
  deleteStopCategory
};
