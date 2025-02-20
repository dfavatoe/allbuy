import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { updateProfile } from "firebase/auth";
import ModalAlert from "../components/ModalAlert";

function UserAccount() {
  const {
    user,
    userData,
    profileUser,
    getUserData,
    loading,
    setShowAlert,
    showAlert,
  } = useContext(AuthContext);

  const [alertText, setAlertText] = useState("");

  const [newUserName, setNewUserName] = useState("");
  const [newUserPhotoUrl, setNewUserPhotoUrl] = useState("");

  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUserName(e.target.value);
  };

  const handleUserPhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUserPhotoUrl(e.target.value);
  };

  //update user's data in the Firestore
  const updateUserData = async (e: any) => {
    e.preventDefault();
    if (user && userData && newUserName && newUserPhotoUrl) {
      const docRef = doc(db, "users", user.id);
      await updateDoc(docRef, {
        userName: newUserName,
        photo: newUserPhotoUrl,
        // city: "Bogota",
        // zip: "021345678",
        // profession: "Singer",
        // phoneNumber: "",
      });
      getUserData();
    }
    if ((newUserName && newUserPhotoUrl) === "") {
      setAlertText("Please fill in the name and photo fields");
      setShowAlert(true);
      // alert("Please fill in the name and photo fields");
    }
  };
  console.log("Data updated!", userData);

  const updateUserProfile = async () => {
    if (user && profileUser && userData) {
      //update user's Profile
      updateProfile(profileUser, {
        displayName: userData.userName,
        photoURL: userData.photo,
      })
        .then(() => {
          // Profile updated!
          console.log("Profile updated!");
        })
        .catch((error) => {
          // An error occurred
          console.log("An error occurred: ", error.message);
        });
    }
  };
  console.log("profileUser :>> ", profileUser?.displayName);
  useEffect(() => {
    updateUserProfile();
  }, [userData]);

  return (
    <Container className="text-start mx-4" style={{ minWidth: "375px" }}>
      <h1>User Account</h1>
      {loading ? (
        <div>
          <Spinner animation="border" variant="warning" />
          <p>Loading...</p>
        </div>
      ) : (
        <Form onSubmit={updateUserData}>
          <Row>
            <Col>
              <h5>User Data:</h5>
              <img
                className="mb-4"
                src={userData?.photo!} //why complains if removing "!"
                alt="profile's photo"
                width="250px"
              />
              <p>
                <b>User ID: </b>
                {userData?.userId}
              </p>
              <p>
                <Form.Label>
                  <b>User name: </b> {userData?.userName}
                </Form.Label>
                <Form.Control
                  className="mb-3"
                  type="username"
                  placeholder="Enter new name"
                  value={newUserName}
                  onChange={handleUserNameChange}
                />
              </p>
              <p>
                <Form.Label>
                  <b>User photo URL: </b>
                </Form.Label>
                <Form.Text
                  style={{
                    display: "block",
                    maxWidth: "100%",
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    marginBottom: "1rem",
                  }}
                >
                  {userData?.photo}
                </Form.Text>
                <Form.Control
                  className="mb-3"
                  type="username"
                  placeholder="Enter new URL"
                  value={newUserPhotoUrl}
                  onChange={handleUserPhotoChange}
                />
              </p>
              <p>
                <b>User email: </b>
                {userData?.email}
              </p>
              <p>
                <b>User phone: </b>
                {userData?.phoneNumber}
              </p>
              <p>
                <b>User city: </b>
                {userData?.city}
              </p>
              <p>
                <b>User zip: </b>
                {userData?.zip}
              </p>
              <Button className="d-block my-3" type="submit" variant="warning">
                Update Data
              </Button>
            </Col>
          </Row>
        </Form>
      )}
      <ModalAlert
        showAlert={showAlert}
        alertText={alertText}
        setShowAlert={setShowAlert}
      />
    </Container>
  );
}

export default UserAccount;
