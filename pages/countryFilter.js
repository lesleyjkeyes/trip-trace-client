import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import getAllCountries from '../.husky/api/countryData';
import { getTripsByCountry } from '../.husky/api/tripData';
import TripCard from '../components/TripCard';

function CountryFilter() {
  const [trips, setTrips] = useState([]);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');

  const getTrips = () => {
    getTripsByCountry(country).then((data) => {
      setTrips(data);
    });
  };

  useEffect(() => {
    getTrips();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  useEffect(() => {
    getAllCountries().then((data) => {
      setCountries(data);
    });
  }, []);

  return (
    <>
      <Form>
        <FloatingLabel controlId="floatingSelect" label="Country">
          <Form.Select
            aria-label="Country"
            name="country"
            onChange={(e) => { setCountry(e.target.value); }}
            className="mb-3"
            required
          >
            <option value="">Select a Country</option>
            {
              countries.map((c) => (
                <option
                  key={c.firebaseKey}
                  value={c.firebaseKey}
                >
                  {c.name}
                </option>
              ))
            }
          </Form.Select>
        </FloatingLabel>
      </Form>
      <div className="text-center my-4">
        <div className="tripCards">
          {
            trips.length > 0
              ? trips?.map((trip) => (trip.public === true && (
                <TripCard key={trip.firebaseKey} tripObj={trip} opts={{ height: '160', width: '280' }} />
              )
              ))
              : (
                <div>
                  <h1>No Trips Found</h1>
                </div>
              )
          }
        </div>
      </div>
    </>
  );
}

export default CountryFilter;
