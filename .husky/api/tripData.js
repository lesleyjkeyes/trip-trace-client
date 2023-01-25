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
        travelerId: data.traveler_id,
        region: data.region,
        countryId: data.country_id,
        city: data.city,
        public: data.public,
        priceRange: data.price_range
      });
    }).catch((error) => reject(error));
});

const updateTrip = (tripObj) => new Promise((resolve, reject) => {
  const newTripObj = {
    title: tripObj.title,
    description: tripObj.description,
    image_url: tripObj.imageUrl,
    duration: tripObj.duration,
    duration_unit: tripObj.durationUnit,
    region: tripObj.region,
    country_id: tripObj.countryId,
    city: tripObj.city,
    public: tripObj.public,
    price_range: tripObj.priceRange
  };
  axios.put(`${dbUrl}/trips/${tripObj.id}`, newTripObj)
    .then(() => getAllTrips().then(resolve))
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
    country_id: trip.countryId,
    city: trip.city,
    public: trip.public,
    price_range: trip.priceRange
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

const deleteSingleTrip = (tripId) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/trips/${tripId}`)
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

const getTripsByCountry = (countryId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/trips?country_id=${countryId}`)
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
