import axios from 'axios';
import { clientCredentials } from '../../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getAllStops = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/stops`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getTripStops = (tripId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/stops?trip_id=${tripId}`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const getSingleStop = (stopId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/stops/${stopId}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const updateStop = (stopObj, tripId) => new Promise((resolve, reject) => {
  axios.put(`${dbUrl}/stops/${stopObj.id}`, stopObj)
    .then(() => getTripStops(tripId).then(resolve))
    .catch(reject);
});

const createStop = (stopObj) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/stops`, {
    method: 'POST',
    body: JSON.stringify(stopObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const deleteSingleStop = (stopId, tripId) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/stops/${stopId}`)
    .then(() => {
      getTripStops(tripId).then((stopsArray) => resolve(stopsArray));
    })
    .catch((error) => reject(error));
});


export { 
  createStop,
  updateStop,
  getAllStops,
  getSingleStop,
  deleteSingleStop,
  getTripStops,
}
