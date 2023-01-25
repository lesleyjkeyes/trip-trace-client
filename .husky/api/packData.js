import axios from 'axios';
import { clientCredentials } from '../../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getAllItems = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/items.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getTripItems = (tripId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/items?trip_id=${tripId}`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const getSingleItem = (id) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/items/${id}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const updateItem = (itemObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/items/${itemObj.id}`, itemObj)
    .then(() => getAllStops().then(resolve))
    .catch(reject);
});

const createItem = (itemObj) => new Promise((resolve, reject) => {
  console.warn(itemObj)
  fetch(`${clientCredentials.databaseURL}/items`, {
    method: 'POST',
    body: JSON.stringify(itemObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const deleteSingleItem = (itemId, tripId) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/items/${itemId}`)
  .then(() => getTripItems(tripId).then(resolve))
  .catch(reject);
});


export { 
  createItem,
  updateItem,
  getAllItems,
  getSingleItem,
  deleteSingleItem,
  getTripItems,
}
