import axios from 'axios';
import { clientCredentials } from '../../utils/client';

const dbUrl = clientCredentials.databaseURL;

const createFavorite = (favoriteObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/favorites.json`, favoriteObj)
    .then((response) => {
      const payload = { favoriteFirebaseKey: response.data.name };
      axios.patch(`${dbUrl}/favorites/${response.data.name}.json`, payload)
        .then((patchResponse) => resolve(patchResponse.data));
    }).catch(reject);
});

const deleteSingleFavorite = (favoriteFirebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/favorites/${favoriteFirebaseKey}.json`)
    .then(resolve)
    .catch((error) => reject(error));
});

const getFavorites = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/favorites.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getFavoritesByUser = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/favorites.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getTripFavorites = (tripFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/favorites.json?orderBy="tripFirebaseKey"&equalTo="${tripFirebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

export { createFavorite, deleteSingleFavorite, getFavorites, getFavoritesByUser, getTripFavorites }
