import React from 'react';
import { useEffect , useState} from 'react';
import { ethers } from 'ethers';
import '../css/DisplayCampaigns.css';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import CrowdfundingCard from './CrowdfundingCard';
import { getAllCampaigns } from '../contractMethods';
import CampaignDetails from './CampaignDetails';
import { restCampaignDetails } from '../constants';
import ReactLoading from "react-loading";

const MyCampaigns = () => {
  const [campaignDetails, setCampaignDetails] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [campaignRestDetails, setCampaignRestDetails] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function fetchCampaigns() {
    setIsLoading(true);
    let updatedRestDetails = [];
    let campaign = await getAllCampaigns();
    let provider = new ethers.BrowserProvider(window.ethereum);
    let signer = await provider.getSigner();
    const address = signer.address;
    campaign.filter((camp, index) => {
       if (camp.owner === address) {
          updatedRestDetails.push(restCampaignDetails[index]);
       }
    });
    campaign = campaign.filter(camp => camp.owner === address);
    console.log(campaign, updatedRestDetails);
    setCampaignRestDetails(updatedRestDetails);
    setCampaignDetails(campaign);
    setIsLoading(false);
    }
    fetchCampaigns();
  }, []);

  function openDetailedView(e) {
     setIndex(e.target.id);
     setOpenDetails(true);
  }
  console.log(campaignRestDetails);
  return (
    <div className='bg-dark'>
    {isLoading && <div className='loading-component'>
      {!openDetails && <Sidebar></Sidebar>}
      {!openDetails && <ReactLoading type="spokes" color="#edebdd" height={50} width={50} className='loader'/>}
    </div>}
    {!isLoading && <div className='campaigns'>
     {!openDetails && <Sidebar></Sidebar>}
     {!openDetails && <Navbar header="My Campaigns"></Navbar>}
     {!openDetails && <div className='details'>
      {campaignDetails.length > 0 && campaignRestDetails.length > 0 && campaignDetails.map((campaign, index) => 
      <CrowdfundingCard 
      key={campaignRestDetails[index].campaignId}
      id={campaignRestDetails[index].campaignId}
      address={campaign.owner} 
      title={campaignRestDetails[index].title} 
      description={campaignRestDetails[index].description}
      target={campaign.target}
      category={campaign.category}
      imgUrl={campaignRestDetails[index].image}
      raised={campaign.amountCollected}
      deadline={campaign.deadline}
      onClick = {openDetailedView}
       />)}
      {campaignDetails.length == 0 && <h1 className='nothing'>No Campaigns to Display</h1>}
    </div>}
    {openDetails && <CampaignDetails campaignArray = {campaignDetails} restDetails={campaignRestDetails} index={index}/>}
    </div>}
  </div>
  );
}

export default MyCampaigns;