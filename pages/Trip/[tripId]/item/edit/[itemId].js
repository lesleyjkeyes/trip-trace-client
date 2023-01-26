import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleItem } from '../../../../../.husky/api/packData';
import PackingListForm from '../../../../../components/Forms/PackingListForm';

export default function EditItem() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { itemId } = router.query;

  useEffect(() => {
    getSingleItem(itemId).then(setEditItem);
  }, [itemId]);

  return (<PackingListForm itemObj={editItem} />);
}
