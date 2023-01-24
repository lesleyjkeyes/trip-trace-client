import { getFavorites } from "./favoritesData";
import { deleteSingleStop, getTripStops } from "./stopData";
import { deleteSingleTrip, getSingleTrip } from "./tripData";

const deleteTripStops = (tripFirebaseKey) => new Promise((resolve, reject) => {
  getTripStops(tripFirebaseKey).then((stopsArray) => {
    const deleteCommentPromises = stopsArray.map((stop) => deleteSingleStop(stop.stopFirebaseKey));

    Promise.all(deleteCommentPromises).then(() => {
      deleteSingleTrip(tripFirebaseKey).then(resolve);
    });
  }).catch((error) => reject(error));
});

const getUsersFavoriteTrips = async (userId) => {
  const userFavs = await getFavorites(userId);
  const favTripIds = userFavs.map((fav) => fav.trip_id);
  const tripObjects = await favTripIds.map((tripId) => getSingleTrip(tripId));
  const tripObjectArray = await Promise.all(tripObjects);
  return tripObjectArray;
};

export { deleteTripStops, getUsersFavoriteTrips }
