import React from "react";
import DetailsCard from "./DetailsCard";
import '../css/CampaignDetails.css';
import { Navbar, Sidebar } from "./index";

const CampaignDetails = ({campaignArray, index}) => {
   let campaignId = parseInt(index.substr(index.length - 1));
   console.log(index);
    return (
      <div className="campaign-details">
         <Sidebar/>
         <DetailsCard details={campaignArray[campaignId]} index={campaignId}/>
      </div>
    );
}

export default CampaignDetails;