import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  contractAddress,
  GenratorABI,
  CollectionABI,
} from "../utils/constants";
export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    GenratorABI,
    signer
  );

  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    collectionName: "",
    collectionSymbol: "",
    baseUri: "",
    mintAmount: "",
  });

  const [currenAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e, name) => {
    setFormData((prevstate) => ({ ...prevstate, [name]: e.target.value }));
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install metamask!");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamsk");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  });

  return (
    <TransactionContext.Provider
      value={{
        formData,
        handleChange,
        currenAccount,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
