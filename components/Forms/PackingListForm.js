/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createItem, updateItem } from '../../.husky/api/packData';

const initialState = {
  itemName: '',
  itemQuantity: '',
  itemDescription: '',
};
// eslint-disable-next-line react/prop-types
function PackingListForm({ packObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { tripFirebaseKey } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    if (packObj.packFirebaseKey) setFormInput(packObj);
  }, [packObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (packObj.packFirebaseKey) {
      updateItem(formInput)
        .then(() => router.push(`/Trip/${tripFirebaseKey}`));
    } else {
      const payload = {
        ...formInput, uid: user.uid, userName: user.displayName, tripFirebaseKey,
      };
      createItem(payload).then(() => {
        router.push(`/Trip/${tripFirebaseKey}`);
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{packObj.packFirebaseKey ? 'Update' : 'Create'} Item</h2>
      <FloatingLabel controlId="floatingInput2" label="Item Description" className="mb-3">
        <Form.Control type="text" placeholder="Enter item Description" name="itemDescription" value={formInput.itemDescription} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Item Quantity" className="mb-3">
        <Form.Control type="number" placeholder="Enter Item Quantity" name="itemQuantity" value={formInput.itemQuantity} onChange={handleChange} required />
      </FloatingLabel>
      <Button type="submit">{packObj.packFirebaseKey ? 'Update' : 'Create'} Item</Button>
    </Form>
  );
}

PackingListForm.propTypes = {
  packObj: PropTypes.shape({
    itemDescription: PropTypes.string,
    packFirebaseKey: PropTypes.string,
    tripFirebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }),
};

PackingListForm.defaultProps = {
  packObj: initialState,
};

export default PackingListForm;
