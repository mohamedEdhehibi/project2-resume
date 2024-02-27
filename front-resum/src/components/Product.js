import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Product = (props) => {
  console.log(props);
  const { designation, price, description, imgurl } = props

  return (
    <Card style={{ width: '100%' }}>
      <Card.Img variant="top"  src={imgurl} />
      <Card.Body>
        <Card.Title>{designation}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <Card.Footer className="text-muted"><Button variant="primary">Go somewhere</Button></Card.Footer>

      </Card.Body>
    </Card>)
}

export default Product