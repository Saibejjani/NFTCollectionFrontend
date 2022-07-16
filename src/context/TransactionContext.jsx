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

  const renderCollection = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          contractAddress,
          GenratorABI,
          signer
        );
        const totalCollection = await connectedContract.collectionLength();

        for (let i = 0; i < totalCollection; i++) {
          const currentA
          let uri = await connectedContract.tokenURI(1);
          console.log(uri);
          if (uri.startsWith("data:")) {
            const [, jsonContentEncoded] = uri.split("base64,");
            let { image, name, description } = JSON.parse(
              atob(jsonContentEncoded)
            );
            console.log(image);
            setNftImage((current) => [...current, image]);
            setNftDesc((current) => [...current, description]);
            setNftName((current) => [...current, name]);
            console.log(name);
          } else if (uri.startsWith("ipfs://")) {
            uri = `https://ipfs.io/ipfs/${uri.split("ipfs://")[1]}`;
            const tokenMetadata = await fetch(uri).then((response) =>
              response.json()
            );

            const value = tokenMetadata.image;
            console.log(value);

            let image = `https://ipfs.io/ipfs/${value.split("ipfs://")}`;
            image = image.replace(",", "");
            setNftImage((current) => [...current, image]);
            setNftName((current) => [...current, tokenMetadata.name]);
            setNftDesc((current) => [...current, tokenMetadata.description]);
            console.log(tokenMetadata);
          } else {
            const tokenMetadata = await fetch(uri).then((response) =>
              response.json()
            );

            setNftImage((current) => [...current, tokenMetadata.image]);
            setNftName((current) => [...current, tokenMetadata.name]);
            setNftDesc((current) => [...current, tokenMetadata.description]);
            console.log(tokenMetadata);
          }
        }
      } else {
        console.log("ethereum object not found");
      }
    } catch (error) {
      console.error(error);
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
