import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleTrip } from '../../../.husky/api/tripData';
import TripForm from '../../../components/Forms/TripForm';

export default function EditTrip() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { tripId } = router.query;

  useEffect(() => {
    getSingleTrip(tripId).then(setEditItem);
  }, [tripId]);

  return (<TripForm obj={editItem} />);
}
