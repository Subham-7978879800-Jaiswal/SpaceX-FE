import React, { useState } from "react";
import "./SignUpModal.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import LoginModal from "../LoginModal/LoginModal";

const { REACT_APP_API_URL } = process.env;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
};

function SignUpModal({ showSignUpModal, setShowSignUpModal }) {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const closeHandler = () => {
    setShowSignUpModal(false);
    setLogin(false)
  };

  const cancelHandler = () => {
    setShowSignUpModal(false);
  };

  const loginHandler = () => {
    setLogin((prev) => !prev);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    const requestData = {
      // Data to be sent in the request body
      emailId,
      password,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the appropriate content type
      },
      body: JSON.stringify(requestData), // Convert the data to JSON string
    };
    const url = `${REACT_APP_API_URL}/users/register`; // Replace with your API endpoint URL

    const data = await fetch(url, requestOptions);
    const response = await data.json();
    console.log(response);
  };

  return (
    <Modal open={showSignUpModal} onClose={closeHandler}>      
        <Box sx={style}>
          <form onSubmit={(event) => handleSignUp(event)}>
            {!login && <div className="container">
              <h1>Sign Up</h1>
              <p>Please fill in this form to create an account.</p>

              <label htmlFor="email">
                <b>Email</b>
              </label>
              <input
                type="text"
                placeholder="Enter Email"
                name="email"
                required
                value={emailId}
                onChange={(event) => {
                  setEmailId(event.target.value);
                }}
              />

              <label htmlFor="psw">
                <b>Password</b>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="psw"
                required
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />

              <label htmlFor="psw-repeat">
                <b>Repeat Password</b>
              </label>
              <input
                type="password"
                placeholder="Repeat Password"
                name="psw-repeat"
                required
              />

              <p>By creating an account you agree to our Terms & Privacy.</p>

              <div>
                <button
                  type="button"
                  className="loginBtn"
                  onClick={loginHandler}
                >
                  Already Have a account Login Please
                </button>

                <button
                  type="button"
                  className="cancelbtn"
                  onClick={cancelHandler}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSignUp}
                  type="submit"
                  className="signupbtn"
                >
                  Sign Up
                </button>
              </div>
            </div> }
            {login && <LoginModal emailId={emailId} password={password}></LoginModal>} 
          </form>
        </Box>
    
    </Modal>
  );
}
export default SignUpModal;
