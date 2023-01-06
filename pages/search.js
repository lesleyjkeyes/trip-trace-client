import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getPublicTrips } from '../.husky/api/tripData';
import TripCard from '../components/TripCard';

export default function SearchPage() {
  const router = useRouter();
  const [filteredData, setFilteredData] = useState([]);

  const getAllTheTrips = () => {
    getPublicTrips().then((tripsArray) => {
      const value = router.query.keyword;
      setFilteredData(tripsArray);
      const results = tripsArray.filter((trip) => trip.title.toLowerCase().includes(value.toLowerCase()) || trip.userName.toLowerCase().includes(value.toLowerCase()) || trip.country.toLowerCase().includes(value.toLowerCase()));
      setFilteredData(results);
    });
  };

  useEffect(() => {
    getAllTheTrips();
    setFilteredData([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.keyword]);

  return (
    <>
      <h1>Search Results for {router.query.keyword}</h1>
      <div className="tripCards">
        {filteredData.length ? filteredData.map((trip) => (
          <TripCard key={trip.tripFirebaseKey} tripObj={trip} onUpdate={getAllTheTrips} />
        )) : <h2>No Results</h2>}
      </div>
    </>
  );
}
