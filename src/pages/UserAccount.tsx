import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";
import { Button, Container } from "react-bootstrap";
import { updateProfile } from "firebase/auth";

function UserAccount() {
  const { user, actualUser } = useContext(AuthContext);

  if (actualUser !== null) {
    actualUser.providerData.forEach((profile) => {
      console.log("Sign-in provider: " + profile.providerId);
      console.log("  Provider-specific UID: " + profile.uid);
      console.log("  Name: " + profile.displayName);
      console.log("  Email: " + profile.email);
      console.log("  Photo URL: " + profile.photoURL);
    });
  }

  const updateInfo = () => {
    if (actualUser !== null) {
      updateProfile(actualUser, {
        displayName: "Joe Doe",
        photoURL:
          "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

  return (
    <>
      <h1>User Account</h1>
      {user ? (
        <Container className="text-start mx-4" fluid>
          <h5>User Info:</h5>
          <p>User id: {user.id}</p>
          <p>User email: {user.email}</p>
        </Container>
      ) : (
        <>
          <h4>You are signed out. Click on the link to sign in.</h4>
          <Link to={"/login"}>Login</Link>
          <h4>You still didn't create an account?</h4>
          <Link to={"/signup"}>Sign Up</Link>
        </>
      )}

      {actualUser ? (
        <Container className="text-start mx-4" fluid>
          <h5>Actual User Info:</h5>
          <p>ActualUser: {actualUser.uid}</p>
          <p>ActualUserEmail: {actualUser.email}</p>
          <p>ActualUserName: {actualUser.displayName}</p>
        </Container>
      ) : (
        <>
          <h4>You are signed out. Click on the link to sign in.</h4>
          <Link to={"/login"}>Login</Link>
          <h4>You still didn't create an account?</h4>
          <Link to={"/signup"}>Sign Up</Link>
        </>
      )}

      {actualUser &&
        actualUser.providerData.map((profile) => {
          return (
            <>
              <Container className="text-start mx-4" fluid>
                <p>Sign-in provider: {profile.providerId}</p>
                <p>Provider-specific UID: {profile.uid}</p>
                <p>Name: {profile.displayName}</p>
                <p>Email: {profile.email}</p>
                <p>Photo URL: {profile.photoURL}</p>
                <img src={profile.photoURL!} alt="profile pic" width="250px" />
                <Button onClick={updateInfo}>Update Profile</Button>
              </Container>
            </>
          );
        })}
    </>
  );
}

export default UserAccount;
