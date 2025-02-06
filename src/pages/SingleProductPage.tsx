import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ProductT } from "../types/customTypes";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import Reviews from "./Reviews";

function SingleProductPage() {
  //State Hooks
  const [productSpecs, setProductSpecs] = useState<ProductT | null>(null);

  // const params = useParams()
  // console.log('params :>> ', params);
  // same as above but destructured
  const { productId } = useParams();
  // console.log("productId :>> ", productId);

  const url = `https://dummyjson.com/products/${productId}`;

  const getSingleProduct = async () => {
    const response = await fetch(url);
    console.log("response :>> ", response);
    const result = (await response.json()) as ProductT;
    console.log("single Product :>> ", result);

    setProductSpecs(result);
  };

  const countStars = (productRating: number | null) => {
    if (productRating) {
      const fullStars = "★";
      const emptyStars = "☆";
      const starInt = Math.floor(productRating);
      const totalStars =
        fullStars.repeat(starInt) + emptyStars.repeat(5 - starInt);
      return totalStars;
    }
  };

  const formatDate = (date: string | null) => {
    if (date) {
      const dateStr = date;
      const dateObj = new Date(dateStr);
      // console.log('dateObj :>> ', dateObj);

      const options = {
        day: "2-digit",
        month: "short",
        year: "numeric",
      } as Intl.DateTimeFormatOptions;
      const formattedDate = dateObj.toLocaleDateString("en-GB", options);
      // console.log('formattedDate :>> ', formattedDate);
      // console.log('formattedDate :>> ', typeof formattedDate);
      return formattedDate;
    }
  };

  const inStock = (productSpecs: ProductT | null) => {
    if (productSpecs) {
      return productSpecs.stock ? "In stock" : "Not available";
    }
  };

  const discount = (productSpecs: ProductT | null) => {
    if (productSpecs) {
      return productSpecs.discountPercentage > 0
        ? `Discount: ${productSpecs.discountPercentage} %`
        : null;
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  return (
    <div>
      <h2>Single Product's Page</h2>
      <p>Product ID: {productId} </p>

      <Container style={{ width: "auto", height: "auto", textAlign: "left" }}>
        <Row>
          {productSpecs && (
            <>
              <Col>
                <h3>{productSpecs.title}</h3>
                <p>
                  {productSpecs.rating} {countStars(productSpecs.rating)}
                </p>
                <h4>{productSpecs.price} €</h4>
                <h6>{discount(productSpecs)} </h6>
                <Image src={productSpecs.images[0]} rounded fluid />
              </Col>

              <Col className="mb-4">
                <h4>{inStock(productSpecs)} </h4>
                <h5>Description:</h5>
                <ul>
                  <li>
                    See more from
                    <a href="#"> {productSpecs.brand}</a>{" "}
                  </li>
                  <li>{productSpecs?.description}</li>
                </ul>
                <hr />
                <h5>Product Details:</h5>
                <ul>
                  <li>Shipping: {productSpecs.shippingInformation}</li>
                  <li>Warranty: {productSpecs.warrantyInformation}</li>
                  <li>Return policy: {productSpecs.returnPolicy}</li>
                  <li>
                    Minimum Order: {productSpecs?.minimumOrderQuantity} items
                  </li>
                </ul>
                <hr />
                <h5>Dimensions:</h5>
                <ul>
                  <li>Width: {productSpecs.dimensions.width} cm</li>
                  <li>Height: {productSpecs.dimensions.height} cm</li>
                  <li>Depth: {productSpecs.dimensions.depth} cm</li>
                </ul>
                <Button variant="warning">Add to cart</Button>
              </Col>
            </>
          )}
        </Row>
        <Row>
          <hr />
          <h4>Top Reviews:</h4>
        </Row>
        <Row>
          {productSpecs &&
            productSpecs.reviews.map((review) => {
              return (
                <>
                  <Row>
                    <h6>{review.reviewerName}</h6>
                  </Row>
                  <Row>
                    <p>
                      {review.rating} {countStars(review.rating)}
                    </p>
                    <p>{formatDate(review.date)}</p>
                  </Row>
                  <Row>
                    <p>{review.comment}</p>
                  </Row>
                </>
              );
            })}
        </Row>
      </Container>
      <Reviews />
    </div>
  );
}

export default SingleProductPage;
