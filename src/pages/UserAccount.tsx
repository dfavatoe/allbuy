import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

function UserAccount() {
  const { user, userData, getUserData } = useContext(AuthContext);

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
  };

  console.log("Profile updated!", userData);

  return (
    <Container className="text-start">
      <h1>User Account</h1>

      <Form onSubmit={updateUserData}>
        <Row>
          <Col>
            {user && userData ? (
              <div>
                <h5>User Data:</h5>
                <img
                  className="mb-4"
                  src={userData.photo!} //why complains if removing "!"
                  alt="profile pic"
                  width="250px"
                />
                <p>
                  <b>User ID: </b>
                  {userData.userId}
                </p>
                <p>
                  <Form.Label>
                    <b>User name: </b> {userData.userName}
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
                    {userData.photo}
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
                  {userData.email}
                </p>
                <p>
                  <b>User phone: </b>
                  {userData.phoneNumber}
                </p>
                <p>
                  <b>User city: </b>
                  {userData.city}
                </p>
                <p>
                  <b>User zip: </b>
                  {userData.zip}
                </p>
                <Button className="d-block my-3" type="submit">
                  Update Data
                </Button>
              </div>
            ) : (
              <div>
                <h4>You are signed out. Click on the link to sign in.</h4>
                <Link to={"/login"}>Login</Link>
                <h4>You still didn't create an account?</h4>
                <Link to={"/signup"}>Sign Up</Link>
              </div>
            )}
          </Col>
        </Row>
      </Form>

      {/* {user && profileUser ? (
        profileUser.providerData.map((profile, index) => (
          <Form onSubmit={updateUserData} key={index}>
            <Row>
              <Col sm="6">
                <h5>User Auth Info:</h5>
                <p>User ID: {user.id}</p>
                <p>User Email: {user.email}</p>

                <h5>User Profile:</h5>
                <p>User UID: {profileUser.uid}</p>
                <p>Sign-in provider: {profile.providerId}</p>
                <p>Provider-specific UID: {profile.uid}</p>
                <Form.Label>Name: {profile.displayName}</Form.Label>
                <p>Email: {profile.email}</p>
                <p>Telephone: {profile.phoneNumber}</p>
                <p>Profile' Picture: </p>
                <Form.Text
                  style={{
                    display: "block",
                    maxWidth: "100%",
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    marginBottom: "1rem",
                  }}
                >
                  {profile.photoURL}
                </Form.Text>
              </Col>
              <Col sm="6">
                {profile.photoURL && (
                  <img
                    className="mb-4"
                    src={profile.photoURL}
                    alt="profile pic"
                    width="250px"
                  />
                )}

                <h5>User Data:</h5>
                {user && userData && (
                  <div>
                    <p>
                      <b>User ID: </b>
                      {userData.id}{" "}
                    </p>
                    <p>
                      <Form.Label>
                        {" "}
                        <b>User name: </b> {userData.userName}
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
                        {userData.photo}
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
                      {profileUser.email}{" "}
                    </p>
                    <p>
                      <b>User phone: </b>
                      {userData.phoneNumber}{" "}
                    </p>
                    <p>
                      <b>User city: </b>
                      {userData.city}{" "}
                    </p>
                    <p>
                      <b>User zip: </b>
                      {userData.zip}{" "}
                    </p>
                    <Button className="d-block my-3" type="submit">
                      Update Data
                    </Button>
                  </div>
                )}
              </Col>
            </Row>
          </Form>
        ))
      ) : (
        <div>
          <h4>You are signed out. Click on the link to sign in.</h4>
          <Link to={"/login"}>Login</Link>
          <h4>You still didn't create an account?</h4>
          <Link to={"/signup"}>Sign Up</Link>
        </div>
      )} */}
    </Container>
  );
}

export default UserAccount;

// return (
//   <Container className="text-start">
//     <h1>User Account</h1>
//     {user && profileUser ? (
//       profileUser.providerData.map((profile, index) => (
//         <div key={index}>
//           <h5>User Info:</h5>
//           <p>User ID: {user.id}</p>
//           <p>User Email: {user.email}</p>

//           <h5>User Profile:</h5>
//           <p>User UID: {profileUser.uid}</p>
//           <p>Sign-in provider: {profile.providerId}</p>
//           <p>Provider-specific UID: {profile.uid}</p>
//           <p>Name: {profile.displayName}</p>
//           <p>Email: {profile.email}</p>
//           <p>Telephone: {profile.phoneNumber}</p>

//           {profile.photoURL && (
//             <img src={profile.photoURL} alt="profile pic" width="250px" />
//           )}

//           <Button className="d-block my-4" onClick={updateInfo}>
//             Update Profile
//           </Button>
//         </div>
//       ))
//     ) : (
//       <div>
//         <h4>You are signed out. Click on the link to sign in.</h4>
//         <Link to={"/login"}>Login</Link>
//         <h4>You still didn't create an account?</h4>
//         <Link to={"/signup"}>Sign Up</Link>
//       </div>
//     )}
//   </Container>
// );
