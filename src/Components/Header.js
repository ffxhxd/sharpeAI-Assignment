import React, { useEffect, useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { HiMenuAlt3 } from "react-icons/hi";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../Redux/userSlice";

const Header = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  //button for opening closing menu on mobile screen
  const handleToggle = () => {
    setToggle(!toggle);
  };

  //function to handle the signout
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        handleToggle();
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  //removing/adding the user when user logs out/in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/home");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  //function for responsive header
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    //clean up function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {screenWidth > 768 ? (
        <div className="flex items-center justify-between px-12 py-6 bg-gradient-to-r from-violet-500 to-fuchsia-500">
          <div>
            <FaEthereum size={40} />
          </div>
          {user && (
            <div>
              <ul className="flex items-center font-bold gap-6 text-[#29233b] text-sm tracking-wider">
                <li className="hover:underline cursor-pointer ">
                  <Link to="/home">HOME</Link>
                </li>
                <li className="hover:underline cursor-pointer ">
                  <Link to="/transactions">TRANSACTIONS</Link>
                </li>
                <li className="hover:underline cursor-pointer ">
                  <Link to="/data">DATA</Link>
                </li>
                <li
                  onClick={handleSignOut}
                  className="hover:underline cursor-pointer "
                >
                  SIGN OUT
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-violet-500 to-fuchsia-500">
          <div>
            <FaEthereum size={40} />
          </div>
          {user && (
            <div onClick={handleToggle}>
              {toggle ? <IoClose size={30} /> : <HiMenuAlt3 size={30} />}
            </div>
          )}
          {toggle && (
            <div className="absolute top-16 right-7 p-6 bg-slate-200 opacity-85 h-50 rounded-md">
              <ul className="flex flex-col items-center font-bold gap-10 text-black text-sm tracking-wider">
                <li
                  onClick={handleToggle}
                  className="hover:underline cursor-pointer "
                >
                  <Link to="/home">HOME</Link>
                </li>
                <li
                  onClick={handleToggle}
                  className="hover:underline cursor-pointer "
                >
                  <Link to="/transactions">TRANSACTIONS</Link>
                </li>
                <li
                  onClick={handleToggle}
                  className="hover:underline cursor-pointer "
                >
                  <Link to="/data">DATA</Link>
                </li>

                <li
                  onClick={handleSignOut}
                  className="hover:underline cursor-pointer "
                >
                  Sign Out
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
