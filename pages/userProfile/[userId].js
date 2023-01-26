import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
import { getUser } from '../../.husky/api/userData';
import { getUserTrips } from '../../.husky/api/tripData';
import TripCard from '../../components/TripCard';
import { useAuth } from '../../utils/context/authContext';

function UserProfile() {
  const [trips, setTrips] = useState([]);
  const [profile, setProfile] = useState({});
  const router = useRouter();
  const { userId } = router.query;
  const { user } = useAuth();

  const getThisUser = () => {
    getUser(userId).then(setProfile);
  };

  const filterTrips = (data) => {
    if (user.id !== profile.id) {
      const filteredTrips = data.filter((trip) => trip.public === true);
      setTrips(filteredTrips);
    } else {
      setTrips(data);
    }
  };

  const getTheseTrips = () => {
    getUserTrips(userId).then((data) => filterTrips(data));
  };

  useEffect(() => {
    getThisUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    getTheseTrips();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  return (
    <div className="text-center my-4">
      <div id="userProfile" className="userProfile">
        <Card id="profileCard" style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Img variant="side" src={profile?.imageUrl} />
            <Card.Title>{profile?.firstName} {profile?.lastName}</Card.Title>
          </Card.Body>
        </Card>
      </div>
      <h2>{profile?.firstName}</h2>
      <div className="tripCards">
        {
          trips.length > 0
            ? trips?.map((trip) => (
              <TripCard key={trip.id} tripObj={trip} onUpdate={getTheseTrips} router={router.asPath} />
            )) : ''
            }
      </div>

    </div>
  );
}

export default UserProfile;
