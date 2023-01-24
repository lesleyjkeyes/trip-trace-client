import { useEffect, useState } from 'react';
import { getUsersFavoriteTrips } from '../.husky/api/mergeData';
import TripCard from '../components/TripCard';
import { useAuth } from '../utils/context/authContext';

function FavoriteTrips() {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);

  const getTheFavs = () => {
    getUsersFavoriteTrips(user.id).then(setTrips);
  };

  useEffect(() => {
    getTheFavs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="likedVideosPage">
      <div className="tripCards">
        {user.uid ? (
          <>
            {trips?.map((trip) => (
              <TripCard tripObj={trip} />
            ))}
          </>
        ) : (
          <div>
            <h1>Sign in to see Favorite Trips</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoriteTrips;
