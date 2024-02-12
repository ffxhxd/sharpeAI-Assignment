import React, { useRef, useState } from "react";
import { checkValidData } from "../Utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../Redux/userSlice";
import { SHARPE_LOGO_URL } from "../Utils/Constants";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    //not moving forward if user enters wrong input
    if (message) return;

    //creating a user if a signup page
    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    } else {
      //if sign in page login a user if a user enters correct username and password
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then(() => {
          // Signed in
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    }
  };

  return (
    <div className="h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <div className="flex items-end justify-center gap-4">
        <h1 className="text-4xl font-bold text-center pt-8 pb-0 text-indigo-950">
          Sharpe
        </h1>
        <img
          src={SHARPE_LOGO_URL}
          alt="LOGO"
          className="w-12 p-2 m-0 rounded-full bg-indigo-900"
        />
      </div>
      <p className="text-center pt-3 font-semibold">
        The ultimate frontend for crypto
      </p>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-80 md:w-96 lg:w-1/3 xl:w-1/4 rounded-md p-4 absolute my-10 mx-auto right-0 left-0 flex flex-col items-center justify-center gap-2 bg-opacity-80 bg-slate-200"
      >
        <h1 className="text-2xl text-[#29233b] font-bold p-2">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            ref={name}
            type="name"
            placeholder="Full Name"
            className="p-2 w-full rounded-md bg-white text-black border-none focus:outline-none focus:ring focus:border-blue-300"
          />
        )}
        <input
          ref={email}
          type="email"
          placeholder="Email"
          className="p-2 w-full rounded-md bg-white text-black border-none focus:outline-none focus:ring focus:border-blue-300"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 w-full rounded-md bg-white text-black border-none focus:outline-none focus:ring focus:border-blue-300"
        />
        <p className="text-[12px] font-semibold p-2">
          - 8 characters long, 1 uppercase and 1 symbol
        </p>
        <p className="text-sm font-semibold pl-1 text-red-500">
          {errorMessage}
        </p>
        <button
          className="p-2 w-full bg-indigo-900 rounded-md text-lg font-semibold text-white focus:outline-none hover:bg-indigo-600"
          onClick={handleButtonClick}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p
          className="text-sm p-1 text-[#29233b] cursor-pointer hover:underline"
          onClick={toggleForm}
        >
          {isSignIn ? "New to Sharpe AI?" : "Already a user?"}
        </p>
      </form>
    </div>
  );
};

export default Login;
