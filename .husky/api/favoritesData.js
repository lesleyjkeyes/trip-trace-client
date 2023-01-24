import axios from 'axios';
import { clientCredentials } from '../../utils/client';

const dbUrl = clientCredentials.databaseURL;

const createFavorite = (userId, tripId) => new Promise((resolve, reject) => {
  const favoriteObj = {
    traveler_id: userId,
    trip_id: tripId,
  };
  fetch(`${clientCredentials.databaseURL}/favorites`, {
    method: 'POST',
    body: JSON.stringify(favoriteObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const deleteSingleFavorite = (id) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/favorites/${id}`)
    .then(resolve)
    .catch((error) => reject(error));
});

const getFavorites = (id) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/favorites?traveler_id=${id}`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getFavoritesByUser = (travelerId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/favorites?traveler_id=${travelerId}`)
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
