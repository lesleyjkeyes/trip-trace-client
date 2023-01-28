/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { createItem, updateItem } from '../../.husky/api/packData';

const initialState = {
  title: '',
  quantity: '',
  description: '',
};
// eslint-disable-next-line react/prop-types
function PackingListForm({ itemObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { tripId } = router.query;

  useEffect(() => {
    if (itemObj?.id) setFormInput(itemObj);
  }, [itemObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemObj.id) {
      updateItem(formInput)
        .then(() => router.push(`/Trip/${itemObj.trip.id}`));
    } else {
      const payload = {
        ...formInput, trip_id: tripId,
      };
      createItem(payload).then(() => {
        router.push(`/Trip/${tripId}`);
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{itemObj?.id ? 'Update' : 'Create'} Item</h2>
      <FloatingLabel controlId="floatingInput2" label="Item Title" className="mb-3">
        <Form.Control type="text" placeholder="Enter Item Title" name="title" value={formInput.title} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Item Description" className="mb-3">
        <Form.Control type="text" placeholder="Enter item Description" name="description" value={formInput.description} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Item Quantity" className="mb-3">
        <Form.Control type="number" placeholder="Enter Item Quantity" name="quantity" value={formInput.quantity} onChange={handleChange} required />
      </FloatingLabel>
      <Button type="submit">{itemObj?.id ? 'Update' : 'Create'} Item</Button>
    </Form>
  );
}

PackingListForm.propTypes = {
  itemObj: PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.string,
    quantity: PropTypes.number,
    title: PropTypes.string,
    trip: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
};

PackingListForm.defaultProps = {
  itemObj: initialState,
};

export default PackingListForm;
