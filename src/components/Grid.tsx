import React from "react";
import { ProductT } from "../types/type";
import { Col, Container, Row } from "react-bootstrap";
import "./ProductCard.css";
import ProductCard from "./ProductCard";

type GridProps = {
  products: ProductT[];
};

function Grid({ products }: GridProps) {
  return (
    <Container className="justify-content-md-center">
      <Row className="g-1">
        {products &&
          products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </Row>
    </Container>
  );
}

export default Grid;
