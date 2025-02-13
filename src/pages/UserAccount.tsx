import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { updateProfile } from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

function UserAccount() {
  const { user, profileUser } = useContext(AuthContext);
  const [newName, setNewName] = useState("");
  const [newPhotoUrl, setNewPhotoUrl] = useState("");

  // if (profileUser !== null) {
  //   profileUser.providerData.forEach((profile) => {
  //     console.log("  Sign-in provider: " + profile.providerId);
  //     console.log("  Provider-specific UID: " + profile.uid);
  //     console.log("  Name: " + profile.displayName);
  //     console.log("  Email: " + profile.email);
  //     console.log("  Photo URL: " + profile.photoURL);
  //   });
  // }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPhotoUrl(e.target.value);
  };

  const updateUserInfo = async (e?: FormEvent<HTMLFormElement>) => {
    if (user && profileUser && newName && newPhotoUrl) {
      //update user's Profile
      updateProfile(profileUser, {
        displayName: newName,
        photoURL: newPhotoUrl,
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

    if (user && profileUser) {
      const docRef = doc(db, "users", user.id);
      await updateDoc(docRef, {
        userName: profileUser.displayName,
        photo: profileUser.photoURL,
        // city: "Bogota",
        // zip: "021345678",
        // profession: "Singer",
        // phoneNumber: "",
      });
    }

    // const docRef = doc(db, "users", user.id);
    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   // docSnap.data() will be undefined in this case
    //   console.log("No such document!");

    //update user Doc in the Firestore
    // updateDoc(doc.id, {
    //   capital: true
    // });
  };

  useEffect(() => {
    updateUserInfo();
  }, [profileUser]);

  return (
    <Container className="text-start">
      <h1>User Account</h1>
      {user && profileUser ? (
        profileUser.providerData.map((profile, index) => (
          <Form onSubmit={updateUserInfo} key={index}>
            <Row>
              <Col>
                <h5>User Info:</h5>
                <p>User ID: {user.id}</p>
                <p>User Email: {user.email}</p>

                <h5>User Profile:</h5>
                <p>User UID: {profileUser.uid}</p>
                <p>Sign-in provider: {profile.providerId}</p>
                <p>Provider-specific UID: {profile.uid}</p>
                <Form.Label>Name: {profile.displayName}</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="username"
                  placeholder="Enter new name"
                  value={newName}
                  onChange={handleNameChange}
                />
                <p>Email: {profile.email}</p>
                <p>Telephone: {profile.phoneNumber}</p>
                <p>Profile' Picture:</p>
                <Form.Control
                  className="d-inline mb-3"
                  type="photo"
                  placeholder="Enter new photo's URL"
                  value={newPhotoUrl}
                  onChange={handlePhotoChange}
                />
                <Button className="d-block my-3" type="submit">
                  Update Profile
                </Button>
              </Col>
              <Col>
                {profile.photoURL && (
                  <img src={profile.photoURL} alt="profile pic" width="250px" />
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
      )}
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
