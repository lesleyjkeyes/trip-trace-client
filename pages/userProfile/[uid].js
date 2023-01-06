import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
import { getUser } from '../../.husky/api/userData';
import { getUserTrips } from '../../.husky/api/tripData';
import TripCard from '../../components/TripCard';

function UserProfile() {
  const [trips, setTrips] = useState([]);
  const [user, setUser] = useState({});
  const router = useRouter();
  const { uid } = router.query;

  const getThisUser = () => {
    getUser(uid).then(setUser);
  };

  const getTheseTrips = () => {
    getUserTrips(uid).then(setTrips);
  };

  useEffect(() => {
    getThisUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getTheseTrips();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center my-4">
      <div id="userProfile" className="userProfile">
        <Card id="profileCard" style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Img variant="side" src={user.userImage} />
            <Card.Title>{user.userName}</Card.Title>
          </Card.Body>
        </Card>
      </div>
      <h2>{user.userName}</h2>
      <div className="tripCards">
        {
          trips.length > 0
            ? trips?.map((trip) => (trip.public === true && (
            <TripCard key={trip.tripFirebaseKey} tripObj={trip} onUpdate={getTheseTrips} router={router.asPath} />
            )
            )) : ''
            }
      </div>

    </div>
  );
}

export default UserProfile;
