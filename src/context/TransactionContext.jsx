import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import NFTGen from "../utils/NFTGen.json";
import NFTCol from "../utils/NFTCol.json";
import { contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({
    Name: "",
    Symbol: "",
    URI: "",
    MintAmount: "",
  });
  const [fetched, setFetched] = useState(0);

  const [prev, setPrev] = useState();
  const [totalCollections, setTotalColletions] = useState([]);
  const [currentContractAddress, setCurrentContractsAddress] = useState([]);
  const [currentColletion, setCurrentCollection] = useState([]);
  const [fetchLimit, setFetchLimit] = useState(0);

  // const handleChange = (e, name) => {
  //   setFormData((prevstate) => ({ ...prevstate, [name]: e.target.value }));
  //   console.log(formData);
  // };

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts) {
          setCurrentAccount(accounts[0]);
          console.log(accounts[0]);
        } else {
          console.log("no authorized account found");
        }
      } else {
        console.log("Ethereum object not found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        setCurrentAccount(accounts[0]);

        console.log(accounts[0]);
      } else {
        alert("Please install metamaks");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  // useEffect(() => {
  //   (async () => {
  //     await fetchColletions();
  //   })();
  // }, []);

  return (
    <TransactionContext.Provider
      value={{
        currentAccount,
        totalCollections,
        currentColletion,
        formData,
        setFormData,
        connectWallet,
        MintCollection,
        fetchColletions,
        fetchThisCollection,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
