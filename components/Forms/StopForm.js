/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
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
  const { tripFirebaseKey } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    getAllCountries().then(setCountries);
  }, []);

  useEffect(() => {
    if (stopObj.stopFirebaseKey) setFormInput(stopObj);
  }, [stopObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (stopObj.stopFirebaseKey) {
      updateStop(formInput)
        .then(() => router.push(`/Trip/${tripFirebaseKey}`));
    } else {
      const payload = {
        ...formInput, uid: user.uid, userName: user.displayName, tripFirebaseKey,
      };
      createStop(payload).then(() => {
        router.push(`/Trip/${tripFirebaseKey}`);
      });
    }
  };

  return (
    // name(set this to the name of the object), value and onChange. type will also be required. placeholder and required are optional
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{stopObj.stopFirebaseKey ? 'Update' : 'Create'} Stop</h2>
      <FloatingLabel controlId="floatingInput1" label="Stop Title" className="mb-3">
        <Form.Control type="text" placeholder="Enter Stop Title" name="stopTitle" value={formInput.stopTitle} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Stop Description" className="mb-3">
        <Form.Control type="text" placeholder="Enter Stop Description" name="stopDescription" value={formInput.stopDescription} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingSelect" label="Country">
        <Form.Select
          aria-label="Country"
          name="country"
          onChange={handleChange}
          className="mb-3"
          required
        >
          <option value="">Select a Country</option>
          {
            countries.map((country) => (
              <option
                key={country.firebaseKey}
                value={country.firebaseKey}
                selected={!stopObj ? '' : stopObj.country === country.name}
              >
                {country.name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Stop City" className="mb-3">
        <Form.Control type="text" placeholder="Add Stop City(Optional)" name="stopCity" value={formInput.stopCity} onChange={handleChange} />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Stop Duration(Days)" className="mb-3">
        <Form.Control type="number" placeholder="Enter Stop Duration(Days)" name="stopDuration" value={formInput.stopDuration} onChange={handleChange} required />
      </FloatingLabel>
      <Button type="submit">{stopObj.stopFirebaseKey ? 'Update' : 'Create'} Stop</Button>
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
    country: PropTypes.string,
    id: PropTypes.string,
  }),
};

StopForm.defaultProps = {
  stopObj: initialState,
};

export default StopForm;
