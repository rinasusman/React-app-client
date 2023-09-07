import React, { useState } from "react";
import { post } from "config";
import { ROUTES } from "Routes/Routing";
import { useDispatch } from "react-redux";
import { API_URL } from "config/endpoints";
import { Link, useNavigate } from "react-router-dom";
import { authAction } from "container/auth.slice";
import "./login.css";
function Login() {
  //Routes
  const { PRIVATE, PUBLIC } = ROUTES;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Local states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ErrMsg, setErrMsg] = useState("");

  //Login post call
  const LoginFormPost = async (e) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    };
    try {
      const { userSignUp } = await post(API_URL.LOGIN, payload);
      if (userSignUp) {
        if (userSignUp.Status) {
          const payloadVal = {
            token: userSignUp.token,
            isAdmin: userSignUp.isAdmin?.toString(),
          };
          dispatch(authAction.setLogin(payloadVal));
          navigate(PRIVATE.DASHBOARD);
        } else {
          setErrMsg(userSignUp.message);
        }
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  //clear all locastorage items when mounting
  React.useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="outer rounded border border-secondary ">
      <div className="signIn-form">
        <h2>Log In</h2>
        <form method="POST" onSubmit={LoginFormPost}>
          <div>
            <input
              class="input my-2 form-control"
              type="text"
              name="your_email"
              id="your_email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter your_email"
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
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter your Password"
              style={{ width: "300px" }}
            />
          </div>
          <br />
          <div>
            <input
              type="submit"
              name="signIn"
              value="LOG IN"
              class="input my-2 form-control bg-primary font-weight-bold "
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
            navigate(PUBLIC.SIGN_UP);
          }}
          class=" my-4 "
        >
          Sign Up
        </a>
      </div>
    </div>
  );
}

export default Login;
