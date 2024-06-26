import React, { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";
import "./App.css";
import {connect, getAllCampaigns} from './contractMethods';

import { Sidebar, Navbar, MainPage, DisplayCampaigns } from "./components";
import { CampaignDetails, CreateCampaign, Home, Profile } from "./pages";
import ProjectForm from './components/ProjectForm';

const App = () => {
  const navigate = useNavigate();
  
  const [myContract, setMyContract] = useState(null);
  const [address, setAddress] = useState(null);

  async function connectMetamask() {
     const contract = await connect();
     setMyContract(contract);
     setAddress(contract.runner.address);
     console.log(address);
     localStorage.setItem("contractData", JSON.stringify(contract));
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
            element={<MainPage connectMetamask={connectMetamask} />}
          />
          <Route
            path="/allCampaigns"
            element={<DisplayCampaigns contract={myContract} />}
          />
          <Route
            path="/campaign-form"
            element={<ProjectForm/>}
          />
      </Routes>
    </BrowserRouter>
    </div>
  );
};

export default App;
