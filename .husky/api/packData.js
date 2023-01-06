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

const getTripItems = (tripFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/items.json?orderBy="tripFirebaseKey"&equalTo="${tripFirebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const getSingleItem = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/items/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const updateItem = (packObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/items/${itemObj.itemFirebaseKey}.json`, packObj)
    .then(() => getAllStops(packObj.uid).then(resolve))
    .catch(reject);
});

const createItem = (packObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/items.json`, packObj)
    .then((response) => {
      const payload = { packFirebaseKey: response.data.name };
      axios.patch(`${dbUrl}/items/${response.data.name}.json`, payload)
        .then((patchResponse) => resolve(patchResponse.data));
    }).catch(reject);
});

const deleteSingleItem = (itemFirebaseKey, tripFirebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/items/${itemFirebaseKey}.json`)
  .then(() => getTripItems(tripFirebaseKey).then(resolve))
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
