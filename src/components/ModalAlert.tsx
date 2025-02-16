import Form from "react-bootstrap/Form";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Modal } from "react-bootstrap";
import { ModalAlertProps } from "../types/customTypes";

function ModalAlert({ showAlert, setShowAlert, alertText }: ModalAlertProps) {
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false); // Hide modal after 3 seconds
      }, 3000);
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [showAlert, setShowAlert]);

  return (
    <Modal show={showAlert} onHide={() => setShowAlert(false)} backdrop={false}>
      <Modal.Body style={{ backgroundColor: "#fdf5db" }}>
        <h5>Something went wrong!</h5>
        <p>{alertText}</p>
      </Modal.Body>
    </Modal>
  );
}

export default ModalAlert;
