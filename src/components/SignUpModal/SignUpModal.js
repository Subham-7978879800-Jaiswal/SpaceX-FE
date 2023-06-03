import React from "react";
import "./SignUpModal.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

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
  
  const closeHandler = () => {
    setShowSignUpModal(false);
  };

  const cancelHandler = () => {
    setShowSignUpModal(false);
  };

  return (
    <Modal open={showSignUpModal} onClose={closeHandler}>
      <Box sx={style}>
        <form>
          <div className="container">
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
            />

            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              required
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

            <p>
              By creating an account you agree to our <a>Terms & Privacy</a>.
            </p>

            <div>
              <button
                type="button"
                className="cancelbtn"
                onClick={cancelHandler}
              >
                Cancel
              </button>
              <button type="submit" className="signupbtn">
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
export default SignUpModal;
