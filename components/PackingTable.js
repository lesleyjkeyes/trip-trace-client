import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { deleteSingleItem, getTripItems } from '../.husky/api/packData';
import { useAuth } from '../utils/context/authContext';

// eslint-disable-next-line react/prop-types
function PackingTable({ tripId }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);

  const getItems = () => {
    getTripItems(tripId).then(setItems);
  };

  const deleteAnItem = (itemId) => {
    deleteSingleItem(itemId, tripId).then(setItems);
  };

  useEffect(() => {
    getItems();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripId]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Item Title</th>
          <th>Item Description</th>
          <th>Item Quantity</th>
          {items[0]?.trip.traveler === user.id ? <th>Options</th> : ''}
        </tr>
      </thead>
      <tbody>
        {
          items?.map((item) => (
            <tr>
              <th>{item.title}</th>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              {item.trip.traveler === user.id ? <td><Button onClick={() => { deleteAnItem(item.id); }}>Delete</Button></td> : ''}
            </tr>
          ))
        }
      </tbody>
    </Table>
  );
}

PackingTable.propTypes = {
  packObj: PropTypes.shape({
    id: PropTypes.string,
    tripId: PropTypes.string,
    description: PropTypes.string,
    quantity: PropTypes.string,
  }).isRequired,

};

export default PackingTable;
