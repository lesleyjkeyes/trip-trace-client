import axios from 'axios';
import { clientCredentials } from '../../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getAllStops = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/stops.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getTripStops = (tripFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/stops.json?orderBy="tripFirebaseKey"&equalTo="${tripFirebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const getSingleStop = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/stops/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const updateStop = (stopObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/stops/${stopObj.stopFirebaseKey}.json`, stopObj)
    .then(() => getAllStops(stopObj.uid).then(resolve))
    .catch(reject);
});

const createStop = (stopObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/stops.json`, stopObj)
    .then((response) => {
      const payload = { stopFirebaseKey: response.data.name };
      axios.patch(`${dbUrl}/stops/${response.data.name}.json`, payload)
        .then((patchResponse) => resolve(patchResponse.data));
    }).catch(reject);
});

const deleteSingleStop = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/stops/${firebaseKey}.json`)
    .then(() => {
      getAllStops().then((tripsArray) => resolve(tripsArray));
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
