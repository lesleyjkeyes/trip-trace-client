import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { getUserTrips } from '../.husky/api/tripData';
import TripCard from '../components/TripCard';

function YourTrips() {
  const [trips, setTrips] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const getYourTrips = () => {
    getUserTrips(user.uid).then(setTrips);
  };

  useEffect(() => {
    getYourTrips();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center my-4">
      {user.uid ? (
        <div className="yourTrips">
          <div className="yourTrips2">
            <div>
              <h2 className="myTripsh2">My Trips</h2>
            </div>
          </div>
          <div className="tripCards">
            {trips?.map((trip) => (
              <TripCard key={trip.FirebaseKey} tripObj={trip} opts={{ height: '160', width: '280' }} onUpdate={getYourTrips} router={router.asPath} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h1>Sign in to see your trips</h1>
        </div>
      )}
    </div>
  );
}

export default YourTrips;
