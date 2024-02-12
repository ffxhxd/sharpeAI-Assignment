import React from "react";
import ethGIF from "../Assets/eth.gif";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500 flex flex-col justify-center items-center p-5 md:p-28">
      <section className="flex flex-col md:flex-row justify-around items-center">
        <div className="flex flex-col justify-center py-12 md:w-6/12 text-center md:text-left">
          <p className="mb-4 font-semibold text-white text-lg">
            Very proud to introduce
          </p>

          <h1 className="mb-8 font-bold text-black text-4xl md:text-6xl">
            Sharpe AI - Your Web3 Companion
          </h1>

          <div className="flex gap-2.5 flex-row justify-center md:justify-start">
            <Link to="/transactions">
              <button className="rounded-lg bg-indigo-800 px-8 py-3 text-center font-semibold text-white ring-indigo-300 hover:bg-indigo-700 text-base">
                Start now
              </button>
            </Link>
            <button className="rounded-lg bg-gray-200 px-8 py-3 text-center font-semibold text-black ring-indigo-300 hover:bg-slate-300  text-base">
              Take tour
            </button>
          </div>
        </div>
        <div>
          <img src={ethGIF} alt="eth gif" className="md:w-65" />
        </div>
      </section>
    </div>
  );
};

export default Home;
