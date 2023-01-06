import { deleteSingleFavorite, getFavoritesByUser, getTripFavorites } from "./favoritesData";
import { deleteSingleItem, getTripItems } from "./packData";
import { deleteSingleStop, getTripStops } from "./stopData";
import { deleteSingleTrip, getFavoriteTrips, getSingleTrip } from "./tripData";

const deleteTripStops = (tripFirebaseKey) => new Promise((resolve, reject) => {
  getTripStops(tripFirebaseKey).then((stopsArray) => {
    const deleteCommentPromises = stopsArray.map((stop) => deleteSingleStop(stop.stopFirebaseKey));

    Promise.all(deleteCommentPromises).then(() => {
      deleteSingleTrip(tripFirebaseKey).then(resolve);
    });
  }).catch((error) => reject(error));
});

const getUsersFavoriteTrips = async (uid) => {
  const userFavs = await getFavoritesByUser(uid);
  const favTrips = userFavs.map((fav) => fav.tripFirebaseKey);
  const tripObjects = await favTrips.map((firebaseKey) => getSingleTrip(firebaseKey));
  const tripObjectArray = await Promise.all(tripObjects);
  return tripObjectArray;
};

const deleteEntireTrip = (tripFirebaseKey) => new Promise((resolve, reject) => {
  getTripStops(tripFirebaseKey).then((stopsArray) => {
    const deleteStopPromises = stopsArray.map((stop) => deleteSingleStop(stop.stopFirebaseKey));
    getTripItems(tripFirebaseKey).then((itemsArray) => {
      const deleteItemPromises = itemsArray.map((item) => deleteSingleItem(item.packFirebaseKey));
      getTripFavorites(tripFirebaseKey).then((favsArray) => {
        const deleteFavPromises = favsArray.map((fav) => deleteSingleFavorite(fav.favoriteFirebaseKey));
        Promise.all(deleteStopPromises, deleteItemPromises, deleteFavPromises).then(() => {
            deleteSingleTrip(tripFirebaseKey).then(resolve);
        })
      });
    });
  }).catch((error) => reject(error));
});

export { deleteTripStops, getUsersFavoriteTrips, deleteEntireTrip }
