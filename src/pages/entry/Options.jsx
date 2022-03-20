import { useEffect, useState } from 'react';
import axios from 'axios';
import { ScoopOptions } from './ScoopOption';
import { Row } from 'react-bootstrap';
import { ToppingOption } from './ToppingOption';
import { AlertBanner } from '../common/AlertBanner';

export function Options({ optionType }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  // optionType = 'scoop' or 'toppings'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(true);
      });
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  // TODO: replace 'null' with ToppingOption when available
  const ItemComponent = optionType === 'scoops' ? ScoopOptions : ToppingOption;

  const optionItems = data.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{optionItems}</Row>;
}
