import { useEffect, useState } from 'react';
import axios from 'axios';
import { ScoopOptions } from './ScoopOption';
import { Row } from 'react-bootstrap';

export function Options({ optionType }) {
  const [data, setData] = useState([]);
  // optionType = 'scoop' or 'toppings'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        // TODO: handle error response
      });
  }, [optionType]);

  // TODO: replace 'null' with ToppingOption when available
  const ItemComponent = optionType === 'scoops' ? ScoopOptions : null;

  const optionItems = data.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{optionItems}</Row>;
}
