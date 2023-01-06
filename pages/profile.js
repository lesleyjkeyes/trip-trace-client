import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { getUserTrips } from '../.husky/api/tripData';
import TripCard from '../components/TripCard';
import { useAuth } from '../utils/context/authContext';

function Profile() {
  const [trips, setTrips] = useState([]);
  const { user } = useAuth();

  const getTheseTrips = () => {
    getUserTrips(user.uid).then(setTrips);
  };

  useEffect(() => {
    getTheseTrips();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      { user ? (
        <div className="text-center my-4">
          <div id="userProfile" className="userProfile">
            <Card id="profileCard" style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Img variant="side" src={user.photoURL} />
                <Card.Title>{user.displayName}</Card.Title>
              </Card.Body>
            </Card>
          </div>
          <h2>Your Profile</h2>
          <div className="tripCards">
            {trips?.map((trip) => (
              <TripCard key={trip.tripFirebaseKey} tripObj={trip} onUpdate={getTheseTrips} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2>Sign in to see your profile</h2>
        </div>
      )}
    </>
  );
}

export default Profile;
