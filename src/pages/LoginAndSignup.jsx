import { useEffect, useState } from "react";
import axios from "axios";
// import "../css/loginSignup.css";
import {
  signUpUserAsync,
  signInUserAsync,
  removeLoginFormError,
} from "../features/slice/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../utils/fetchApi";

const LoginAndSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, error, status } = useSelector((state) => state.todos);

  const [isSignup, setIsSignup] = useState(false);
  const [isAccountCreated, setIsAccountCreated] = useState(false);

  const handleToggleAuth = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setIsSignup((prev) => (prev ? false : true));
    dispatch(removeLoginFormError());
  };

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGuestLogin = () => {
    const email = "john@gmail.com";
    const password = "John@123";
    dispatch(signInUserAsync({ email, password }));
    setEmail("");
    setPassword("");
    setFullName("");
  };

  const registerNewUser = async ({ fullName, email, password }) => {
    dispatch(signUpUserAsync({ fullName, email, password }));
  };

  const signInUser = ({ email, password }) => {
    dispatch(signInUserAsync({ email, password }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      registerNewUser({ fullName, email, password });
      setFullName("");
      setEmail("");
      setPassword("");
    } else {
      signInUser({ email, password });
      setEmail("");
      setPassword("");
    }
  };

  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const res = await axios.get(`${backendUrl}/auth/check`, {
          withCredentials: true,
        });
        if (res?.data?.isLoggedIn) {
          window.location.href = "/dashboard";
          return;
        } else {
          setIsSignup(false);
        }
      } catch (error) {
        setIsSignup(false);
      }
    };

    checkUserAuth();
  }, []);

  useEffect(() => {
    if (userInfo) {
      setIsSignup(false);
      setIsAccountCreated(true);
    }
  }, [userInfo]);

  return (
    <>
      <div
        className="row justify-content-center align-items-center bg-light m-0"
        style={{ height: "100vh" }}
      >
        <div className="col-md-3 border rounded-4 bg-white p-4">
          <div>
            <p className="fs-5 text-center" style={{ color: "rgb(125 7 255)" }}>
              Taskify
            </p>
            {!isAccountCreated && (
              <div>
                {" "}
                <p className="fs-4 text-center m-0">
                  {isSignup
                    ? "Register a new account"
                    : "Log in to your account"}
                </p>
                <p className="text-center" style={{ marginTop: "0.5rem" }}>
                  Please enter your details
                </p>{" "}
              </div>
            )}
          </div>

          {!isAccountCreated && (
            <form onSubmit={handleFormSubmit}>
              {isSignup && (
                <div className="mt-5">
                  <div>
                    <input
                      id="userFullName"
                      type="text"
                      placeholder="Full Name"
                      className="form-control"
                      onChange={(e) => setFullName(e.target.value)}
                      value={fullName}
                      required
                    />
                    <br />
                  </div>

                  <div>
                    <input
                      id="email"
                      type="text"
                      placeholder="Email"
                      className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                    />
                    <br />
                  </div>

                  <div>
                    <input
                      id="password"
                      type="password"
                      placeholder="Password"
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      required
                    />
                  </div>
                </div>
              )}

              {!isSignup && (
                <div className="d-flex flex-column gap-3 mt-4">
                  <div>
                    <label htmlFor="email">*Email</label>
                    <br />
                    <input
                      id="email"
                      type="text"
                      placeholder="Enter your Email"
                      className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="password">*Password</label>
                    <br />
                    <input
                      id="password"
                      type="password"
                      placeholder="Password"
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="d-grid gap-2 mt-3">
                <button
                  className="btn btn-primary"
                  disabled={status === "loading"}
                >
                  {isSignup ? "Sign Up" : "Sign In"}
                </button>
                <div className="d-flex align-items-center text-muted">
                  <hr className="flex-grow-1" />
                  <span className="mx-2">Or</span>
                  <hr className="flex-grow-1" />
                </div>
                <div className="d-flex gap-1">
                  <button
                    type="button"
                    className="btn btn-outline-primary w-50"
                    onClick={handleToggleAuth}
                    disabled={status === "loading"}
                  >
                    {isSignup ? "Sign In" : "Sign Up"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary w-50"
                    onClick={handleGuestLogin}
                    disabled={status === "loading"}
                  >
                    Guest Login
                  </button>
                </div>
              </div>
            </form>
          )}

          {isAccountCreated && (
            <div>
              <p className="text-success fs-5 text-center">
                Account registered successfully
              </p>
              <p
                className="text-center"
                onClick={() => {
                  setIsSignup(false);
                  setIsAccountCreated(false);
                }}
              >
                Return to Login
              </p>
            </div>
          )}

          {error && status === "error" && (
            <p className="text-danger text-center mt-1 mb-0">{error}</p>
          )}

          {status === "loading" && (
            <p className="text-center mt-2 mb-0">
              <small>Please Wait...</small>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginAndSignUp;
