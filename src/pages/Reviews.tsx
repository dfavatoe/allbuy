import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import {
  Button,
  Card,
  Container,
  FloatingLabel,
  Form,
  Stack,
} from "react-bootstrap";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

type ReviewType = {
  author: string;
  text: string;
  date: Timestamp;
  rating: number | null;
  id: string;
};

function Reviews() {
  const { user } = useContext(AuthContext);

  const [reviews, setReviews] = useState<ReviewType[] | null>(null);

  const [reviewText, setReviewText] = useState<string>(" ");
  const [reviewRating, setReviewRating] = useState<number>(0);
  const [reviewStars, setReviewStars] = useState<string>("");

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

  const countStars = (productRating: number | null) => {
    if (productRating) {
      const fullStars = "★";
      const emptyStars = "☆";
      const starInt = Math.floor(productRating);
      const totalStars =
        fullStars.repeat(starInt) + emptyStars.repeat(5 - starInt);
      return totalStars as string;
    }
  };

  const haldleReviewTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log("e.target.value :>> ", e.target.value);
    setReviewText(e.target.value);
  };

  const haldleReviewRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("Range ", parseInt(e.target.value));
    setReviewRating(parseInt(e.target.value));

    const ratingValue = parseInt(e.target.value);
    switch (ratingValue) {
      case 1:
        setReviewStars("★");
        break;
      case 2:
        setReviewStars("★★");
        break;
      case 3:
        setReviewStars("★★★");
        break;
      case 4:
        setReviewStars("★★★★");
        break;
      case 5:
        setReviewStars("★★★★★");
        break;
    }
  };

  const handleReviewSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //prevent refreshing page
    if (!user) {
      alert("Please login first.");
      return;
    }
    // define a new Review object
    const newReview = {
      text: reviewText,
      date: new Date(),
      author: user.email, // connect to the AuthContext to obtain the review's user.
      rating: reviewRating,
    };

    //add the new Review object to the collection
    const docRef = await addDoc(collection(db, "review"), newReview);
    if (!docRef) {
      throw new Error("Something went wrong!");
    }
    if (docRef) {
      console.log("Message sent succesfully. Document ID:  ", docRef.id);
    }
  };

  // https://firebase.google.com/docs/firestore/query-data/listen#listen_to_multiple_documents_in_a_collection
  // this is not an async method. No need to declare as such
  const getReviewsServerLive = () => {
    const queryByDate = query(
      collection(db, "review"),
      orderBy("date", "desc")
    );
    onSnapshot(queryByDate, (querySnapshot) => {
      const reviewsArray: ReviewType[] = [];

      querySnapshot.forEach((doc) => {
        const review: ReviewType = {
          text: doc.data().text,
          date: doc.data().date,
          author: doc.data().author,
          rating: doc.data().rating,
          id: doc.id,
        };

        reviewsArray.push(review);
        setReviews(reviewsArray);
      });
    });
  };

  useEffect(() => {
    // getReviews();
    getReviewsServerLive();
  }, []);

  return (
    <>
      <Container style={{ width: "auto", height: "auto", textAlign: "left" }}>
        <h1>Reviews</h1>
        <h3>Share your thoughts about our store:</h3>
        <Stack gap={3}>
          <Form onSubmit={handleReviewSubmit}>
            <FloatingLabel
              className="mb-3"
              controlId="floatingTextarea"
              label="Add your review..."
            >
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "60px" }}
                onChange={haldleReviewTextChange}
              />
            </FloatingLabel>
            <Form.Label>
              Rating: <span className="paint-stars">{reviewStars}</span>{" "}
            </Form.Label>
            <Form.Range
              style={{ maxWidth: "250px" }}
              className="d-block mb-4"
              min="1"
              max="5"
              onChange={haldleReviewRatingChange}
            ></Form.Range>
            <Button type="submit" className="mb-4" variant="warning">
              Submit
            </Button>
          </Form>
          {reviews &&
            reviews.map((review) => {
              return (
                <Card
                  key={review.id}
                  style={{
                    width: "auto",
                    height: "auto",
                    textAlign: "left",
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  }}
                >
                  <Card.Body>
                    <Card.Title>{review.author}</Card.Title>
                    <Card.Subtitle className="paint-stars mb-2">
                      {countStars(review.rating)}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">
                      {formatDate(review.date.seconds)}
                    </Card.Subtitle>
                    <hr></hr>
                    <Card.Text>{review.text}</Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
        </Stack>
      </Container>
    </>
  );
}

export default Reviews;
