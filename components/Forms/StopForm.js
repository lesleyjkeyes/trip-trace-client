/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import getAllCountries from '../../.husky/api/countryData';
import { createStop, updateStop } from '../../.husky/api/stopData';

const initialState = {
  stopTitle: '',
  stopDuration: '',
  stopCity: '',
  stopDescription: '',
};
// eslint-disable-next-line react/prop-types
function StopForm({ stopObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [countries, setCountries] = useState([]);
  const router = useRouter();
  const { tripId } = router.query;

  useEffect(() => {
    getAllCountries().then(setCountries);
  }, []);

  useEffect(() => {
    if (stopObj.id) setFormInput(stopObj);
  }, [stopObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.warn(router.query);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (stopObj.id) {
      console.warn(router.query);
      updateStop(formInput, tripId)
        .then(() => router.push(`/Trip/${tripId}`));
    } else {
      const payload = {
        ...formInput, trip_id: tripId,
      };
      createStop(payload).then(() => {
        router.push(`/Trip/${tripId}`);
      });
    }
  };

  return (
    // name(set this to the name of the object), value and onChange. type will also be required. placeholder and required are optional
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{stopObj.id ? 'Update' : 'Create'} Stop</h2>
      <FloatingLabel controlId="floatingInput1" label="Stop Title" className="mb-3">
        <Form.Control type="text" placeholder="Enter Stop Title" name="title" value={formInput.title} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Stop Duration" className="mb-3">
        <Form.Control type="number" placeholder="Enter Stop Duration" name="duration" value={formInput.duration} onChange={handleChange} />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Stop Duration Unit" className="mb-3">
        <Form.Control type="text" placeholder="Enter Stop Duration Unit" name="duration_unit" value={formInput.duration_unit} onChange={handleChange} />
      </FloatingLabel>
      <FloatingLabel controlId="floatingSelect" label="Country">
        <Form.Select
          aria-label="Country"
          name="country_id"
          onChange={handleChange}
          className="mb-3"
          required
        >
          <option value="">Select a Country</option>
          {
            countries.map((country) => (
              <option
                key={country.id}
                value={country.id}
                selected={!stopObj ? '' : stopObj.country?.id === country.id}
              >
                {country.name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Stop City" className="mb-3">
        <Form.Control type="text" placeholder="Add Stop City(Optional)" name="city" value={formInput.city} onChange={handleChange} />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Price Range" className="mb-3">
        <Form.Control type="text" placeholder="Add Price Range" name="price_range" value={formInput.price_range} onChange={handleChange} required />
      </FloatingLabel>
      <Button type="submit">{stopObj.id ? 'Update' : 'Create'} Stop</Button>
    </Form>
  );
}

StopForm.propTypes = {
  stopObj: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    stopFirebaseKey: PropTypes.string,
    tripFirebaseKey: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.shape({
      id: PropTypes.number,
    }),
    id: PropTypes.string,
  }),
};

StopForm.defaultProps = {
  stopObj: initialState,
};

export default StopForm;
