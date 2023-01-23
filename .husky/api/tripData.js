import axios from 'axios';
import { clientCredentials } from '../../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getAllTrips = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/trips`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getSingleTrip = (tripId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/trips/${tripId}`).then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        title: data.title,
        description: data.description,
        imageUrl: data.image_url,
        createdOn: data.created_on,
        duration: data.duration,
        durationUnit: data.duration_unit,
        userId: data.traveler_id,
        region: data.region,
        country: data.country,
        city: data.city,
        public: data.public,
      });
    }).catch((error) => reject(error));
});

const updateTrip = (tripObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/trips/${tripObj.tripFirebaseKey}.json`, tripObj)
    .then(() => getAllTrips(tripObj.uid).then(resolve))
    .catch(reject);
});

const createTrip = (user, trip) => new Promise((resolve, reject) => {
  const tripObj = {
    traveler_id: user.id,
    title: trip.title,
    description: trip.description,
    image_url: trip.imageUrl,
    duration: trip.duration,
    duration_unit: trip.durationUnit,
    region: trip.region,
    country: trip.country,
    city: trip.city,
    public: trip.public
  };
  fetch(`${clientCredentials.databaseURL}/trips`, {
    method: 'POST',
    body: JSON.stringify(tripObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const deleteSingleTrip = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/trips/${firebaseKey}.json`)
    .then(() => {
      getAllTrips().then((tripsArray) => resolve(tripsArray));
    })
    .catch((error) => reject(error));
});

const getUserTrips = (travelerId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/trips?traveler_id=${travelerId}`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getPublicTrips = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/trips?public=True`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((error) => reject(error));
});

const getFavoriteTrips = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/trips.json?orderBy="favorite"&equalTo=true`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((error) => reject(error));
});

const getTripsByCountry = (country) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/trips.json?orderBy="country"&equalTo="${country}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((error) => reject(error));
});

export { 
  createTrip,
  updateTrip,
  getAllTrips,
  getSingleTrip,
  deleteSingleTrip,
  getUserTrips,
  getPublicTrips,
  getFavoriteTrips,
  getTripsByCountry,
}
