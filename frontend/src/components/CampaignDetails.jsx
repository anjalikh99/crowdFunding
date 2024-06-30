import React from "react";
import DetailsCard from "./DetailsCard";
import '../css/CampaignDetails.css';
import { Sidebar } from "./index";

const CampaignDetails = ({campaignArray, restDetails, index}) => {
   let campaignId = parseInt(index.substr(index.length - 1));
    return (
      <div className="campaign-details">
         <Sidebar/>
         <DetailsCard details={campaignArray[campaignId]} restDetails={restDetails[campaignId]} index={campaignId}/>
      </div>
    );
}

export default CampaignDetails;