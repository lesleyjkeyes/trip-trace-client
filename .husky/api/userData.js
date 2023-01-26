import axios from 'axios';
import { clientCredentials } from '../../utils/client';

const dbUrl = clientCredentials.databaseURL;

const addUser = (user) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/users.json`, user)
    .then((firebaseKey) => {
      const update = { userFirebaseKey: firebaseKey.data.name };
      axios.patch(`${dbUrl}/users/${firebaseKey.data.name}.json`, update)
        .then((response) => resolve(response.data));
    }).catch(reject);
});

const getUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${userId}`).then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        about: data.about,
        email: data.email,
        imageUrl: data.image_url,
        firstName: data.first_name,
        lastName: data.last_name,
        uid: data.uid
      });
    }).catch((error) => reject(error));
});

const updateUser = (uid, userUpdate) => new Promise((resolve, reject) => {
  getUser(uid).then((userObj) => {
    axios.patch(`${dbUrl}/users/${userObj.id}.json`, userUpdate)
      .then(resolve);
  }).catch(reject);
});

const getAllUsers = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

export {
  updateUser, getUser, addUser, getAllUsers
};
