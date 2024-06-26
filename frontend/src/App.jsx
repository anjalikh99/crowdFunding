import React, { useState } from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import {connect, getAllCampaigns} from './contractMethods';

import { Sidebar, Navbar, MainPage, DisplayCampaigns } from "./components";
import CampaignDetails from './components/CampaignDetails';
import ProjectForm from './components/ProjectForm';
import MyCampaigns from './components/MyCampaigns';

const App = () => {
  
  const [myContract, setMyContract] = useState(null);
  const [address, setAddress] = useState(null);

  async function connectMetamask() {
     const contract = await connect();
     setMyContract(contract);
     setAddress(contract.runner.address);
  }
  

   const checkConnected = (component) => {
    return !myContract ? (
      <MainPage connectMetamask={connectMetamask} />
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
          <Route
            path="/create-campaign"
            element={<ProjectForm/>}
          />
          <Route
            path="/my-campaigns"
            element={<MyCampaigns/>}
          />
          <Route
            path="/campaign-details"
            element={<CampaignDetails/>}
          />
      </Routes>
    </BrowserRouter>
    </div>
  );
};

export default App;
