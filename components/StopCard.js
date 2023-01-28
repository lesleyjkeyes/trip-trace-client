import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { deleteSingleStop } from '../.husky/api/stopData';
import { useAuth } from '../utils/context/authContext';
import { getCategoriesByStop } from '../.husky/api/categoryData';

export default function StopCard({
  // eslint-disable-next-line react/prop-types
  stopObj, onUpdate, index,
}) {
  const [categories, setCategories] = useState([]);
  const { user } = useAuth();

  const deleteThisStop = () => {
    if (window.confirm('Delete this stop?')) {
      deleteSingleStop(stopObj.id, stopObj.trip.id).then(() => onUpdate());
    }
  };

  useEffect(() => {
    getCategoriesByStop(stopObj.id).then(setCategories);
  }, [stopObj]);

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Stop {index + 1} </Card.Title>
        <Card.Title> {stopObj.title} </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Country: {stopObj.country.name} </Card.Subtitle>
        {stopObj.city ? <Card.Subtitle className="mb-2 text-muted">City: {stopObj.city}</Card.Subtitle> : ''}
        <Card.Text>Duration: { stopObj.duration }</Card.Text>
        <Card.Text>Duration Unit: { stopObj.duration_unit }</Card.Text>
        <Card.Text>Price Range: { stopObj.price_range }</Card.Text>
        {categories.length > 0 && (
        <Card.Text>Category:
          {categories.map((category) => (
            <span key={category.category_id} className="badge text-bg-dark">
              {category.category.title}
            </span>
          ))}
        </Card.Text>
        )}
        {user.id === stopObj.trip.traveler.id && (
          <>
            <Button variant="dark" onClick={deleteThisStop}>Delete</Button>
            <Link passHref href={`/Trip/${stopObj.trip.id}/stop/edit/${stopObj.id}`}>
              <Button variant="dark">Edit</Button>
            </Link>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

StopCard.propTypes = {
  stopObj: PropTypes.shape({
    id: PropTypes.number,
    price_range: PropTypes.string,
    stopDescription: PropTypes.string,
    country: PropTypes.string,
    duration: PropTypes.string,
    city: PropTypes.string,
    duration_unit: PropTypes.string,
    title: PropTypes.string,
    trip: PropTypes.shape({
      id: PropTypes.number,
      traveler: PropTypes.shape({
        id: PropTypes.number,
      }),
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
