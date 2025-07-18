// RADHAKRISHNALOVEPERMANENT
// AMMALOVEBLESSINGSONRECURSION

import React, { useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../components/firebase.config";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log("User logged in:", userCredential.user);
      toast.success("Login successful!");
      setUser(userCredential.user);
      navigate('/');
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error(error.message);
    }
  };

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google Login Success:", result.user);
      toast.success("Logged in with Google!");
      navigate('/');
    } catch (error) {
      console.error("Google login error:", error.message);
      toast.error("Google login failed");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in:", user);
        setUser(user);
      } else {
        console.log("No user is signed in.");
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900">
      <div className="form-container">
        <p className="title">Welcome back</p>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
          <input
            type="email"
            className="input"
            placeholder="Email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
          <p className="page-link">
            <span className="page-link-label cursor-pointer">Forgot Password?</span>
          </p>
          <button type="submit" className="form-btn">
            Log in
          </button>
        </form>
        <p className="sign-up-label">
          Don't have an account?
          <span
            className="sign-up-link cursor-pointer"
            onClick={() => navigate('/register')}
          >
            Sign up
          </span>
        </p>
        <div className="buttons-container">
          <div className="apple-login-button">
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" className="apple-icon" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-34.9-50-87.7-77.5-157.3-82.8-65.9-5.2-138 38.4-164.4 38.4-27.9 0-91.7-36.6-141.9-36.6C273.1 298.8 163 379.8 163 544.6c0 48.7 8.9 99 26.7 150.8 23.8 68.2 109.6 235.3 199.1 232.6 46.8-1.1 79.9-33.2 140.8-33.2 59.1 0 89.7 33.2 141.9 33.2 90.3-1.3 167.9-153.2 190.5-221.6-121.1-57.1-114.6-167.2-114.6-170.7zm-105.1-305c50.7-60.2 46.1-115 44.6-134.7-44.8 2.6-96.6 30.5-126.1 64.8-32.5 36.8-51.6 82.3-47.5 133.6 48.4 3.7 92.6-21.2 129-63.7z"></path>
            </svg>
            <span>Log in with Apple</span>
          </div>

          <div className="google-login-button" onClick={googleLogin}>
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" x="0px" y="0px" className="google-icon" viewBox="0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
              c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
              c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
              C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
              c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
              c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
            <span>Log in with Google</span>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .form-container {
          width: 350px;
          background-color: #fff;
          border-radius: 10px;
          box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
          padding: 20px 30px;
        }
        .title {
          text-align: center;
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 30px;
          font-family: 'Lucida Sans', Geneva, Verdana, sans-serif;
        }
        .form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .input {
          padding: 12px 15px;
          border-radius: 20px;
          border: 1px solid #c0c0c0;
          outline: none;
        }
        .form-btn {
          background-color: teal;
          color: white;
          padding: 10px;
          border-radius: 20px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        }
        .form-btn:active {
          box-shadow: none;
        }
        .page-link {
          text-align: right;
          font-size: 12px;
        }
        .page-link-label {
          text-decoration: underline;
          cursor: pointer;
          color: #747474;
        }
        .sign-up-label {
          margin-top: 10px;
          font-size: 12px;
          color: #747474;
        }
        .sign-up-link {
          color: teal;
          font-weight: bold;
          cursor: pointer;
          text-decoration: underline;
        }
        .buttons-container {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .apple-login-button,
        .google-login-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px;
          border-radius: 20px;
          font-size: 14px;
          cursor: pointer;
        }
        .apple-login-button {
          background: black;
          color: white;
        }
        .google-login-button {
          border: 1px solid #747474;
          background: white;
        }
        .apple-icon, .google-icon {
          font-size: 18px;
        }
      `}</style>
    </div>
  );
};

export default Login;
