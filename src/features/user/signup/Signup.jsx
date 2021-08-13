import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupService } from "../userSlice";
import { useState } from "react";

export const Signup = () => {
  const dispatch = useDispatch("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [error, setError] = useState("");

  const signupHandler = (name, username, email, password) => {
    if (
      name === "" ||
      username === "" ||
      email === "" ||
      password === "" ||
      cpassword === ""
    ) {
      return setError("All the fields are required");
    }
    if (password === cpassword) {
      return dispatch(signupService({ name, username, email, password }));
    } else {
      return setError("Password Mismatch");
    }
  };

  return (
    <>
      <div className="container ">
        <div className="wrapper-input">
          <h2 className="nav-brand">FitGram</h2>
          <label className="input-label" htmlFor="">
            Name
          </label>
          <input
            type="text"
            // placeholder="Enter Your Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="input-label" htmlFor="">
            Email Id
          </label>
          <input
            type="text"
            // placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="input-label" htmlFor="">
            Username
          </label>
          <input
            type="text"
            // placeholder="Enter Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="input-label" htmlFor="">
            Password
          </label>
          <input
            type="password"
            // placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="input-label" htmlFor="">
            Confirm Password
          </label>
          <input
            type="password"
            // placeholder="Re-Enter Your Password"
            value={cpassword}
            onChange={(e) => setCPassword(e.target.value)}
          />
          <div>{error === "" ? null : error}</div>
          <div>
            <button
              className="btn btn-filled centered btn-no-hover"
              style={{ display: "block" }}
              type="submit"
              onClick={() => signupHandler((name, username, email, password))}
            >
              SIGNUP
            </button>
          </div>
        </div>
        <div>
          Already have an account
          <NavLink className="link btn-outline" to="/login">
            LOG IN
          </NavLink>
        </div>
      </div>
    </>
  );
};
