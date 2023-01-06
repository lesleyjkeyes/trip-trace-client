import { Card, Image, Button } from 'react-bootstrap';
import { useState, React, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getSingleTrip } from '../../.husky/api/tripData';
import StopCard from '../../components/StopCard';
import { getTripStops } from '../../.husky/api/stopData';
import { useAuth } from '../../utils/context/authContext';
import PackingTable from '../../components/PackingTable';

function SingleTripView() {
  const [trip, setTrip] = useState({});
  const [stops, setStops] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { tripFirebaseKey } = router.query;

  const getTheTrip = () => {
    getSingleTrip(tripFirebaseKey).then(setTrip);
  };

  const getAllTripStops = () => {
    getTripStops(tripFirebaseKey).then(setStops);
  };

  useEffect(() => {
    getTheTrip();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getAllTripStops();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Card style={{ width: '36rem' }}>
        <Card.Body>
          <Card.Title>{trip?.title}</Card.Title>
          <Image className="userPhoto" src={trip?.userPhoto} />
          <Card.Subtitle className="mb-2 text-muted">Created by: {trip?.userName}</Card.Subtitle>
          <Card.Text>
            Country: {trip?.country}
          </Card.Text>
          {trip?.city && (
          <Card.Text>
            City: {trip?.city}
          </Card.Text>
          )}
          <Card.Text>
            Description: {trip?.description}
          </Card.Text>
        </Card.Body>
      </Card>
      <>
        { user.uid === trip.uid ? (
          <div>
            <Link passHref href={`/Trip/${tripFirebaseKey}/stop/new`}>
              <Button variant="dark">Add Stop</Button>
            </Link>
          </div>
        ) : ''}
      </>
      <div className="stopsDiv">
        {stops?.map((stop, index) => (
          <StopCard uid={user.uid} index={index} key={stop.FirebaseKey} stopObj={stop} opts={{ height: '160', width: '280' }} onUpdate={getAllTripStops} router={router.asPath} />
        ))}
      </div>
      <>
        { user.uid === trip.uid ? (
          <div>
            <Link passHref href={`/Trip/${tripFirebaseKey}/item/new`}>
              <Button variant="dark">Add Item</Button>
            </Link>
          </div>
        ) : ''}
        <PackingTable uid={user.uid} tripFirebaseKey={tripFirebaseKey} />
      </>
    </div>
  );
}

export default SingleTripView;
