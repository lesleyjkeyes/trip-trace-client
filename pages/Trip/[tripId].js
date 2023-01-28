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
  const { tripId } = router.query;

  const getTheTrip = () => {
    getSingleTrip(tripId).then(setTrip);
  };

  const getAllTripStops = () => {
    getTripStops(tripId).then(setStops);
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
          <Image className="userPhoto" class="img-fluid" src={trip?.imageUrl} />
          <Card.Subtitle className="mb-2 text-muted">Created by: {trip.travelerFirstName} {trip.travelerLastName}</Card.Subtitle>
          <Card.Text>
            Country: {trip.countryName}
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
        { user.id === trip.travelerId ? (
          <div>
            <Link passHref href={`/Trip/${tripId}/stop/new`}>
              <Button variant="dark">Add Stop</Button>
            </Link>
          </div>
        ) : ''}
      </>
      <div className="stopsDiv">
        {stops?.map((stop, index) => (
          <StopCard id={user.id} index={index} key={stop.id} stopObj={stop} opts={{ height: '160', width: '280' }} onUpdate={getAllTripStops} router={router.asPath} />
        ))}
      </div>
      <>
        { user.id === trip.travelerId ? (
          <div>
            <Link passHref href={`/Trip/${tripId}/item/new`}>
              <Button variant="dark">Add Item</Button>
            </Link>
          </div>
        ) : ''}
        <PackingTable id={user.id} tripId={tripId} />
      </>
    </div>
  );
}

export default SingleTripView;
