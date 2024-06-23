import React, { useState } from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import { ethers } from "ethers";
import {abi} from ''

import { Sidebar, Navbar, MainPage, DisplayCampaigns } from "./components";
import { CampaignDetails, CreateCampaign, Home, Profile } from "./pages";

const App = () => {
  const [myContract, setMyContract] = useState(null);
  const [address, setAddress] = useState();
  let provider, signer, signerAddress;

  async function changeNetwork() {
    // switch network to avalanche
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x539" }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x539",
                chainName: "Ganache",
                nativeCurrency: {
                  name: "Ethereum",
                  symbol: "ETH",
                  decimals: 18,
                },
                rpcUrls: ["http://127.0.0.1:7545"],
              },
            ],
          });
        } catch (addError) {
          alert("Error in adding Ganache network");
        }
      }
    }
  }

  // Connects to Metamask and sets the myContract state with a new instance of the contract
  async function connect() {
    let res = await connectToMetamask();
    if (res === true) {
      await changeNetwork();
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = provider.getSigner();
      signerAddress = (await signer).address;
      setAddress(signerAddress);

      try {
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
        setMyContract(contract);
      } catch (err) {
        alert("CONTRACT_ADDRESS not set properly");
        console.log(err);
      }
    } else {
      alert("Couldn't connect to Metamask");
    }
  }

  // Helps open Metamask
  async function connectToMetamask() {
    try {
      await window.ethereum.enable();
      return true;
    } catch (err) {
      return false;
    }
  }
  const checkConnected = (component) => {
    return !myContract ? (
      <MainPage connectMetamask={connect} />
    ) : (
      component
    );
  };

  return (
    <div className="bg-dark">
    <BrowserRouter>
      <Routes>
          <Route
            path="/"
            element={checkConnected(<DisplayCampaigns contract={myContract} />)}
          />
      </Routes>
    </BrowserRouter>
      {/* <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div> */}

      {/* <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar /> */}

      {/* <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        </Routes> */}
      {/* </div> */}
    </div>
  );
};

export default App;
