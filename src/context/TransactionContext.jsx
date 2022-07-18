import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import NFTGen from "../utils/NFTGen.json";
import NFTCol from "../utils/NFTCol.json";

export const TransactionContext = React.createContext();

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const contractAddress = "0x000c3b547eA7d55e861A586eaa74c46A4df6CeE7";
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

  const fetchColletions = async () => {
    console.log(currentColletion);
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          contractAddress,
          NFTGen,
          signer
        );

        const len = await connectedContract.collectionsLength();

        for (let i = fetched; i < len.toNumber(); i++) {
          const currentAddress = await connectedContract.collections(i);
          setCurrentContractsAddress((current) => [...current, currentAddress]);
          const currentContract = new ethers.Contract(
            currentAddress,
            NFTCol,
            signer
          );
          let uri = await currentContract.tokenURI(1);
          uri = `https://ipfs.io/ipfs/${uri.split("ipfs://")[1]}`;
          const tokenMetadata = await fetch(uri).then((response) =>
            response.json()
          );
          let { image } = tokenMetadata;

          image = `https://ipfs.io/ipfs/${image.split("ipfs://")}`;
          image = image.replace(",", "");
          const name = await currentContract.name();
          const symbol = await currentContract.symbol();

          setTotalColletions((current) => [
            ...current,
            { image, name, symbol },
          ]);
        }

        setFetched(len.toNumber());
        console.log(currentContractAddress);
        console.log(len.toNumber());
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchThisCollection = async (index) => {
    try {
      const { ethereum } = window;

      if (prev !== index) {
        setPrev(index);

        setCurrentCollection([]);
        setFetchLimit(0);
      }

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const currentContract = new ethers.Contract(
          currentContractAddress[index],
          NFTCol,
          signer
        );
        console.log(currentContractAddress[index]);
        const totalSupply = await currentContract.totalSupply();

        for (let i = fetchLimit + 1; i <= totalSupply.toNumber(); i++) {
          let uri = await currentContract.tokenURI(i);
          uri = `https://ipfs.io/ipfs/${uri.split("ipfs://")[1]}`;
          const tokenMetadata = await fetch(uri).then((response) =>
            response.json()
          );
          let { image, name, description } = tokenMetadata;

          image = `https://ipfs.io/ipfs/${image.split("ipfs://")}`;
          image = image.replace(",", "");
          setCurrentCollection((current) => [
            ...current,
            { name, description, image },
          ]);
          console.log(image);
        }
        setFetchLimit(totalSupply.toNumber());
      } else {
        console.log("ethereum object not found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const MintCollection = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          contractAddress,
          NFTGen,
          signer
        );
        const { Name, Symbol, URI, MintAmount } = formData;

        const rec = await connectedContract.createNewCollection(
          Name,
          Symbol,
          URI,
          MintAmount
        );
        const trx = await rec.wait();
        console.log(trx);
        fetchColletions();
      } else {
        console.log("Ethereum object not found");
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
