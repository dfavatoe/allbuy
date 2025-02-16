import { ProductT } from "../types/customTypes";
import { Col, Container, Row } from "react-bootstrap";
import "../style/ProductCard.css";
import ProductCard from "./ProductCard";

type GridProps = {
  products: ProductT[];
};

function Grid({ products }: GridProps) {
  return (
    <Container className="justify-content-center">
      <Row className="g-1">
        {products &&
          products.map((product) => {
            return (
              <Col className="d-flex justify-content-center" key={product.id}>
                <ProductCard key={product.id} product={product} />
              </Col>
            );
          })}
      </Row>
    </Container>
  );
}

export default Grid;
