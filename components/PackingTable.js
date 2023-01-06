import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { deleteSingleItem, getTripItems } from '../.husky/api/packData';

// eslint-disable-next-line react/prop-types
function PackingTable({ tripFirebaseKey, uid = '' }) {
  const [items, setItems] = useState([]);

  const getItems = () => {
    getTripItems(tripFirebaseKey).then(setItems);
  };

  const deleteAnItem = (packFirebaseKey) => {
    deleteSingleItem(packFirebaseKey, tripFirebaseKey).then(setItems);
  };

  useEffect(() => {
    getItems();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripFirebaseKey]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Item Description</th>
          <th>Item Quantity</th>
          {items[0]?.uid === uid ? <th>Options</th> : ''}
        </tr>
      </thead>
      <tbody>
        {
          items?.map((item) => (
            <tr>
              <td>{item.itemDescription}</td>
              <td>{item.itemQuantity}</td>
              {item.uid === uid ? <td><Button onClick={() => { deleteAnItem(item.packFirebaseKey); }}>Delete</Button></td> : ''}
            </tr>
          ))
        }
      </tbody>
    </Table>
  );
}

PackingTable.propTypes = {
  packObj: PropTypes.shape({
    itemFirebaseKey: PropTypes.string,
    tripFirebaseKey: PropTypes.string,
    itemDescription: PropTypes.string,
    itemQuantity: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,

};

export default PackingTable;
