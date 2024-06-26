import React from 'react';
import { useEffect , useState} from 'react';
import '../css/DisplayCampaigns.css';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import CrowdfundingCard from './CrowdfundingCard';
import { getAllCampaigns } from '../contractMethods';
import CampaignDetails from './CampaignDetails';

const DisplayCampaigns = () => {
  const [campaignDetails, setCampaignDetails] = useState([]);
  useEffect(() => {
    async function fetchCampaigns() {
    const campaign = await getAllCampaigns();
    setCampaignDetails(campaign);
    console.log(campaign);
    }
    fetchCampaigns();
  }, []);

  return (
    <div className='campaigns'>
      <Sidebar></Sidebar>
      <Navbar></Navbar>
    <div className='details'>
      {campaignDetails.length > 0 && campaignDetails.map((campaign, index) => 
      <CrowdfundingCard 
      id={index}
      address={campaign.owner} 
      title={campaign.title} 
      description={campaign.description}
      target={campaign.target}
      category={campaign.category}
      imgUrl={campaign.image}
      raised={campaign.amountCollected}
      deadline={campaign.deadline}
       />)}
      {campaignDetails.length == 0 && <h1 className='nothing'>No Campaigns to Display</h1>}
    </div>
    <CampaignDetails/>
    </div>
  )
}

export default DisplayCampaigns