import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../Utils/firebase";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Data = () => {
  //subscribing to the store to get the user ID
  const user = useSelector((store) => store.user);
  const [data, setData] = useState([]);

  //get current logged in users data from the data base
  const getData = async () => {
    try {
      const collectionRef = collection(db, "transactionData");
      const q = query(collectionRef);
      const querySnap = await getDocs(q);

      const data = querySnap.docs
        .map((doc) => {
          const userData = doc.data();
          if (userData.userID === user.uid) {
            return {
              id: doc.id,
              ...userData,
            };
          }
          return null;
        })
        .filter(Boolean);

      setData(data);
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  };

  //calling get data function when component mounts
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-start justify-center w-full">
      <div className="p-12 bg-gray-100 rounded-lg shadow-md w-full mt-10 m-2 md:m-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Transaction Data
        </h2>
        {data.length === 0 ? (
          <div className="md:flex md:items-center md:justify-start md:gap-6">
            <p className="font-semibold">
              Looks like you have not made any transactions yet
            </p>
            <Link to="/transactions">
              <button className="mt-4 md:mt-0 bg-indigo-900 px-4 py-2 rounded-sm text-white font-medium hover:bg-indigo-600">
                Start Transferring
              </button>
            </Link>
          </div>
        ) : (
          <ul className="list-none">
            {data.map((transaction) => (
              <li
                key={transaction.id}
                className="border-b border-gray-300 py-3 flex justify-between items-start flex-col md:flex-row"
              >
                <div className="flex flex-col">
                  <span className="text-lg text-gray-700 break-all">
                    Wallet Address: {transaction.walletAddress}
                  </span>
                  <span className="text-md text-gray-500">
                    Amount: {transaction.amount}
                  </span>
                </div>
                <button className="bg-indigo-900 text-white py-1 px-4 rounded-full hover:bg-indigo-600 focus:outline-none focus:shadow-outline-blue mt-4 md:mt-0">
                  View Details
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Data;
