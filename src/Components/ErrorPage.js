import React from "react";
import { useRouteError } from "react-router";
import { Link } from "react-router-dom";
import { ERROR_IMAGE } from "../Utils/Constants";

const ErrorPage = () => {
  const err = useRouteError();

  return (
    <div className="flex flex-col bg-indigo-500 w-screen h-screen items-center justify-center">
      <img
        className="rounded-full w-56 h-56 animate-bounce"
        src={ERROR_IMAGE}
        alt="errorrrrrrrrrrrrrrrr"
      />
      <h1 className="p-4 text-6xl text-white font-bold">ERROR: {err.status}</h1>
      <h1 className="px-2 text-white text-4xl p-10">{err.statusText}</h1>
      <Link to="/home">
        <h1 className="px-2 text-black text-3xl underline bg-indigo-400 p-3 animate-pulse">
          Go back to home
        </h1>
      </Link>
    </div>
  );
};

export default ErrorPage;
