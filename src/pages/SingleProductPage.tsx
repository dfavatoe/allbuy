import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { ProductT } from "../types/customTypes";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import ProductReviews from "./ProductReviews";
import { Timestamp } from "firebase/firestore";

function SingleProductPage() {
  //State Hooks
  const [productSpecs, setProductSpecs] = useState<ProductT | null>(null);

  // UseRef Hook used to scroll the Page to the Reviews
  const topReviewsRef = useRef<HTMLHeadingElement | null>(null);
  const scrollCallback = () => {
    if (topReviewsRef.current) {
      topReviewsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // useParams extracts the ID from the URL
  const { productId } = useParams();
  console.log("productId :>> ", productId);

  const productIdNumb = parseInt(productId!); //"!" forces the variable to be string, like casting
  console.log("productIdNumb :>> ", productIdNumb);

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
      return productSpecs.stock ? (
        <h4 style={{ color: "#138808" }}>In stock</h4>
      ) : (
        <h4 style={{ color: "#dc143c" }}>Not available</h4>
      );
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
              <Col sm="6">
                <h3>{productSpecs.title}</h3>
                <p>
                  {productSpecs.rating} {countStars(productSpecs.rating)}
                  <Button onClick={() => scrollCallback()} variant="link">
                    See the reviews
                  </Button>
                </p>

                <h4>{productSpecs.price} €</h4>
                <h6>{discount(productSpecs)} </h6>
                <Image src={productSpecs.images[0]} rounded fluid />
              </Col>

              <Col className="mb-4" sm="6">
                {inStock(productSpecs)}
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
          <hr />
        </Row>
        <h4 ref={topReviewsRef}>Top Reviews:</h4>
        <ProductReviews
          pid={productIdNumb}
          author={""}
          text={""}
          rating={null}
          id={""}
          date={new Timestamp(0, 0)}
        />
      </Container>
    </div>
  );
}

export default SingleProductPage;
