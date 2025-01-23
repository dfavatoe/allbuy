import React from "react";
import { Button, Card, Col, Stack } from "react-bootstrap";
import { ProductT } from "../types/type";
import "./ProductCard.css";

type ProductCardProps = {
  product: ProductT;
};

function ProductCard({ product }: ProductCardProps) {
  return (
    <Col key={product.id}>
      <Card className="zoom" style={{ width: "18rem" }}>
        <Card.Img className="image" variant="top" src={product.thumbnail} />
        {/* <Card.Text>{product.description}</Card.Text> */}
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {product.price} €
          </Card.Subtitle>
          <Stack gap={3}>
            <Card.Link className="mb-2" href="#">
              Learn more
            </Card.Link>
          </Stack>
          <Button variant="warning">Add to cart</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ProductCard;
