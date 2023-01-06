import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { deleteSingleStop } from '../.husky/api/stopData';

export default function StopCard({
  // eslint-disable-next-line react/prop-types
  stopObj, onUpdate, index, uid = '',
}) {
  const deleteThisStop = () => {
    if (window.confirm('Delete this stop?')) {
      deleteSingleStop(stopObj.stopFirebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Stop {index + 1} </Card.Title>
        <Card.Title> {stopObj.stopTitle} </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Stop Location: {stopObj.country} {stopObj.stopCity}</Card.Subtitle>
        <Card.Text>Stop Description: { stopObj.stopDescription }</Card.Text>
        <Card.Text>Stop Duration: { stopObj.stopDuration } Days</Card.Text>
        {uid === stopObj.uid && (
          <>
            <Button variant="dark" onClick={deleteThisStop}>Delete</Button>
            <Link passHref href={`/Trip/${stopObj.tripFirebaseKey}/stop/edit/${stopObj.stopFirebaseKey}`}>
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
    stopFirebaseKey: PropTypes.string,
    tripFirebaseKey: PropTypes.string,
    photoURL: PropTypes.string,
    stopDescription: PropTypes.string,
    country: PropTypes.string,
    stopDuration: PropTypes.string,
    stopCity: PropTypes.string,
    stopTitle: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
