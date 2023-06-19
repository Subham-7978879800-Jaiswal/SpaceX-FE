import { useState } from "react";

const LoginModal = () => {
  const { REACT_APP_API_URL } = process.env;
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    console.log("HANDLE")
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
    const url = `${REACT_APP_API_URL}/users/login`; // Replace with your API endpoint URL

    const data = await fetch(url, requestOptions);
    const response = await data.json();
    console.log(response);
  };

  return (
    <div style={{ padding: "24px" }}>
      <label for="uname">
        <b>Username</b>
      </label>
      <input
        value={emailId}
        onChange={(event) => setEmailId(event.target.value)}
        type="text"
        placeholder="Enter Username"
        name="uname"
        required
      />

      <label for="psw">
        <b>Password</b>
      </label>
      <input
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        type="password"
        placeholder="Enter Password"
        name="psw"
        required
      />

      <button onClick={handleLogin} type="submit">
        Login
      </button>
      
    </div>
  );
};
export default LoginModal;
