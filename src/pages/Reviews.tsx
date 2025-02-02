import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { Button, Card, FloatingLabel, Form, Stack } from "react-bootstrap";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

type ReviewType = {
  author: string;
  text: string;
  date: Timestamp;
  rating?: number;
  id: string;
};

function Reviews() {
  const { user } = useContext(AuthContext);

  const [reviews, setReviews] = useState<ReviewType[] | null>(null);

  const [reviewText, setReviewText] = useState<string>(" ");
  const [reviewRating, setReviewRating] = useState<number>(0);

  const [reviewStars, setReviewStars] = useState<string>("");

  // Not used anymore after getReviewsServerLive
  // const getReviews = async () => {
  //   const reviewsRef = collection(db, "review");
  //   const queryByDate = query(reviewsRef, orderBy("date", "desc")); //order the query by date, use limit(n) to limit the number of results
  //   const querySnapshot = await getDocs(queryByDate);
  //   const reviewsArray: ReviewType[] = [];
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.id, " => ", doc.data());
  //     const review: ReviewType = {
  //       text: doc.data().text,
  //       date: doc.data().date,
  //       author: doc.data().author,
  //       rating: doc.data().rating,
  //       id: doc.id,
  //     };
  //     reviewsArray.push(review); //important to insert the reviews from the database in the reviewsArray
  //     setReviews(reviewsArray);
  //   });
  //   console.log("reviewsArray :>> ", reviewsArray);
  // };

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
    const newReview = {
      text: reviewText,
      date: new Date(),
      author: user.email, //! connect to the AuthContext to obtain the review's user.
      rating: reviewRating,
    };

    const docRef = await addDoc(collection(db, "review"), newReview);
    if (!docRef) {
      throw new Error("Something went wrong!");
    }
    if (docRef) {
      console.log("Message sent succesfully. Doment ID:  ", docRef.id);
    }
  };

  // https://firebase.google.com/docs/firestore/query-data/listen#listen_to_multiple_documents_in_a_collection
  // this is not an asyn method. No need to declare as such
  const getReviewsServerLive = () => {
    const queryByDate = query(
      collection(db, "review"),
      orderBy("date", "desc")
    );
    const unsubscribe = onSnapshot(queryByDate, (querySnapshot) => {
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
      <h1>Reviews</h1>
      <Stack gap={3}>
        {reviews &&
          reviews.map((review) => {
            return (
              <Card
                key={review.id}
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
          <Form.Label>Rating: {reviewStars} </Form.Label>
          <Form.Range
            className="mb-4"
            min="1"
            max="5"
            onChange={haldleReviewRatingChange}
          ></Form.Range>
          <Button type="submit" className="mb-4" variant="warning">
            Submit
          </Button>
        </Form>
      </Stack>
    </>
  );
}

export default Reviews;
