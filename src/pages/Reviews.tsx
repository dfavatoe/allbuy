import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { Button, Card, FloatingLabel, Form, Stack } from "react-bootstrap";
import { useEffect, useState } from "react";

type ReviewType = {
  author: string;
  text: string;
  date: Timestamp;
  rating: number;
  id: string;
};

function Reviews() {
  const [reviews, setReviews] = useState<ReviewType[] | null>(null);

  const getReviews = async () => {
    const reviewsRef = collection(db, "review");
    const queryByDate = query(reviewsRef, orderBy("date", "desc")); //order the query by date, use limit(n) to limit the number of results
    const querySnapshot = await getDocs(queryByDate);
    const reviewsArray: ReviewType[] = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      const review: ReviewType = {
        text: doc.data().text,
        date: doc.data().date,
        author: doc.data().text,
        rating: doc.data().rating,
        id: doc.id,
      };
      reviewsArray.push(review); //important to insert the reviews from the database in the reviewsArray
      setReviews(reviewsArray);
    });
    console.log("reviewsArray :>> ", reviewsArray);
  };

  const formatDate = (seconds: number) => {
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    } as Intl.DateTimeFormatOptions;
    const formatDate = new Date(seconds * 1000).toLocaleString(
      "en-GB",
      options
    );
    return formatDate;
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <>
      <h1>Reviews</h1>
      <Stack gap={3}>
        {reviews &&
          reviews.map((review) => {
            return (
              <Card
                key={review.date.nanoseconds}
                style={{ width: "auto", height: "auto", textAlign: "left" }}
              >
                <Card.Body>
                  <Card.Title>{review.author}</Card.Title>
                  <Card.Subtitle className="mb-2">
                    {review.rating}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">
                    {formatDate(review.date.seconds)}
                  </Card.Subtitle>
                  <Card.Text>{review.text}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}

        <Form>
          <FloatingLabel
            className="mb-3"
            controlId="floatingTextarea"
            label="Add your review..."
          >
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "60px" }}
            />
          </FloatingLabel>
          <Button type="submit" className="mb-4" variant="warning">
            Submit
          </Button>
        </Form>
      </Stack>
    </>
  );
}

export default Reviews;
