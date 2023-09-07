import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userAxios from "../../../Axios/UserAxios.js";
import "./Login.css";

function UserRegister() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [ErrMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const signUpForm = (event) => {
    event.preventDefault();

    userAxios
      .post("/register", { name, email, phone, password })
      .then((res) => {
        if (res.data.status) {
          navigate("/login");
        } else {
          setErrMsg("Email is Already exisit");
        }
      });
  };
  return (
    <div className="outer">
      <div className="signIn-form">
        <h2>Sign Up</h2>
        <form method="POST" onSubmit={signUpForm}>
          <div>
            <input
              class="input my-2 form-control"
              type="text"
              name="your_name"
              id="your_name"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Enter your name"
              style={{ width: "300px" }}
            />
          </div>

          <div>
            <input
              class="input my-2 form-control"
              type="text"
              name="your_email"
              id="your_email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter your email"
              style={{ width: "300px" }}
            />
          </div>

          <div>
            <input
              class="input my-2 form-control"
              type="text"
              name="your_phone"
              id="your_phone"
              required
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              placeholder="Enter your phone"
              style={{ width: "300px" }}
            />
          </div>

          <div>
            <input
              class="input my-2 form-control"
              type="password"
              name="your_pass"
              id="your_pass"
              value={password}
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
              style={{ width: "300px" }}
            />
          </div>

          <div>
            <input
              type="submit"
              name="signIn"
              value="SIGN UP"
              class="input my-2 form-control bg-primary"
              style={{ width: "300px" }}
            />
          </div>
        </form>

        {ErrMsg.length > 0 && (
          <div>
            <p style={{ color: "red" }}>{ErrMsg}</p>
          </div>
        )}

        <a
          onClick={() => {
            navigate("/login");
          }}
          class=" my-4 "
        >
          Log In
        </a>
      </div>
    </div>
  );
}

export default UserRegister;
