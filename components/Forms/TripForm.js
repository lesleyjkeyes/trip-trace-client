/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createTrip, updateTrip } from '../../.husky/api/tripData';

const initialState = {
  title: '',
  description: '',
  imageUrl: '',
  duration: '',
  durationUnit: '',
  region: '',
  city: '',
  country: '',
};
function TripForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj?.id) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateTrip(formInput)
        .then(() => router.push('/yourTrips'));
    } else {
      const payload = {
        ...formInput, uid: user.uid, userPhoto: user.photoURL, userName: user.displayName,
      };
      createTrip(payload).then(() => {
        router.push('/yourTrips');
      });
    }
  };

  return (
    <>
      {user.uid ? (
        <Form onSubmit={handleSubmit}>
          <h2 className="text-white mt-5">{obj?.tripFirebaseKey ? 'Update' : 'Create'} Trip</h2>
          <FloatingLabel controlId="floatingInput1" label="Trip Title" className="mb-3">
            <Form.Control type="text" placeholder="Enter Trip Title" name="title" value={formInput.title} onChange={handleChange} required />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput2" label="Trip Description" className="mb-3">
            <Form.Control type="text" placeholder="Enter Trip Description" name="description" value={formInput.description} onChange={handleChange} required />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput2" label="Trip Image" className="mb-3">
            <Form.Control type="url" placeholder="Add Trip Photo" name="imageUrl" value={formInput.imageUrl} onChange={handleChange} required />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput2" label="Region" className="mb-3">
            <Form.Control type="text" placeholder="Add Region(Optional)" name="region" value={formInput.region} onChange={handleChange} />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput2" label="Country" className="mb-3">
            <Form.Control type="text" placeholder="Add Country" name="country" value={formInput.country} onChange={handleChange} required />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput2" label="City" className="mb-3">
            <Form.Control type="text" placeholder="Add City(Optional)" name="city" value={formInput.city} onChange={handleChange} />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput2" label="Trip Duration" className="mb-3">
            <Form.Control type="number" placeholder="Enter Trip Duration" name="duration" value={formInput.duration} onChange={handleChange} required />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput2" label="Duration Unit" className="mb-3">
            <Form.Control type="text" placeholder="Add Duration Unit" name="durationUnit" value={formInput.durationUnit} onChange={handleChange} required />
          </FloatingLabel>
          <Form.Check
            type="switch"
            id="public"
            name="public"
            label="Make Public?"
            checked={formInput.public}
            onChange={(e) => {
              setFormInput((prevState) => ({
                ...prevState,
                public: e.target.checked,
              }));
            }}
          />
          <Button type="submit">{obj?.id ? 'Update' : 'Create'} Trip</Button>
        </Form>
      ) : (
        <div>
          <h1>Sign in to Add a Trip</h1>
        </div>
      )}
    </>
  );
}

TripForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    tripFirebaseKey: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    id: PropTypes.string,
  }),
};

TripForm.defaultProps = {
  obj: initialState,
};

export default TripForm;
