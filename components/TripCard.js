import PropTypes from 'prop-types';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Image } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useAuth } from '../utils/context/authContext';
import { createFavorite, deleteSingleFavorite, getFavorites } from '../.husky/api/favoritesData';
import { deleteSingleTrip } from '../.husky/api/tripData';

export default function TripCard({ tripObj, onUpdate }) {
  const [favorite, setFavorite] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [toggleFav, setToggleFav] = useState(false);
  const { user } = useAuth();

  const checkFavorite = () => {
    const favObj = favorites.find((fav) => fav?.trip_id === tripObj?.id);
    if (favObj !== undefined) {
      setFavorite(favObj);
      setToggleFav(true);
    }
  };
  const getAndSetUserFavorites = () => {
    getFavorites(user.id).then((data) => {
      setFavorites(data);
    });
  };

  useEffect(() => {
    checkFavorite();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorites]);

  useEffect(() => {
    getAndSetUserFavorites();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripObj]);

  const deleteThisTrip = () => {
    if (window.confirm(`Delete ${tripObj.title}?`)) {
      deleteSingleTrip(tripObj.id).then(() => onUpdate());
    }
  };

  const handleFavorite = (boolean) => {
    if (boolean === true) {
      createFavorite(user.id, tripObj.id).then(async () => { await getAndSetUserFavorites(); });
      setToggleFav(true);
    } else {
      deleteSingleFavorite(favorite.id);
      setToggleFav(false);
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={tripObj?.imageUrl} alt={tripObj?.title} style={{ height: '200px' }} />
      <Card.Body>
        <Card.Link href={`/Trip/${tripObj?.id}`}>{tripObj?.title}</Card.Link>
        <div className="vidCardImageDiv">
          <Link href={`/userProfile/${tripObj.traveler?.id}`} passHref>
            <Image style={{ height: '50px' }} className="tripCardCreatorImage" src={tripObj.traveler?.image_url} />
          </Link>
        </div>
        <div className="userName">
          <Card.Link href={`/userProfile/${tripObj.traveler?.id}`}>
            {tripObj.traveler?.first_name} {tripObj.traveler?.last_name}
          </Card.Link>
        </div>
        <Card.Text>
          Description: {tripObj?.description}
        </Card.Text>
        <Card.Text>
          Country: {tripObj.country?.name}
        </Card.Text>
        {tripObj?.city && (
          <Card.Text>
            City: {tripObj?.city}
          </Card.Text>
        )}
        { user && (
          <>
            <Form>
              Favorite?
              <Form.Check
                type="switch"
                id="fav-switch"
                checked={toggleFav}
                onChange={(e) => handleFavorite(e.target.checked)}
              />
            </Form>
            { user.id === tripObj.traveler?.id && (
              <>
                <Link href={`/Trip/edit/${tripObj?.id}`} passHref>
                  <Button variant="info" style={{ margin: '5px' }}>EDIT</Button>
                </Link>
                <Button variant="danger" style={{ margin: '5px' }} onClick={deleteThisTrip}>Delete</Button>
              </>
            )}
          </>
        )}
      </Card.Body>
    </Card>
  );
}

TripCard.propTypes = {
  tripObj: PropTypes.shape({
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    tripFirebaseKey: PropTypes.string,
    country: PropTypes.string,
    city: PropTypes.string,
    traveler_id: PropTypes.number,
    id: PropTypes.number,
    traveler: PropTypes.shape({
      id: PropTypes.string,
      image_url: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
