import { useEffect, useState } from 'react';
import { getPublicTrips } from '../.husky/api/tripData';
import TripCard from '../components/TripCard';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  const [trips, setTrips] = useState();

  const getAllPublicTrips = () => {
    getPublicTrips().then((publicTrips) => {
      setTrips(publicTrips);
    });
  };

  useEffect(() => {
    getAllPublicTrips();
  }, []);

  return (
    <div className="text-center my-4">
      <div className="tripCards">
        {trips?.map((trip) => (
          <TripCard key={trip.firebaseKey} tripObj={trip} user={user} opts={{ height: '160', width: '280' }} onUpdate={getAllPublicTrips} />
        ))}
      </div>
    </div>
  );
}

export default Home;
