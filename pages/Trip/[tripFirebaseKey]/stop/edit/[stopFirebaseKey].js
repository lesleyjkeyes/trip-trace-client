import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleStop } from '../../../../../.husky/api/stopData';
import StopForm from '../../../../../components/Forms/StopForm';

export default function EditStop() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { stopFirebaseKey } = router.query;

  useEffect(() => {
    getSingleStop(stopFirebaseKey).then(setEditItem);
  }, [stopFirebaseKey]);

  return (<StopForm stopObj={editItem} />);
}
