import React from 'react';
import { useEffect , useState} from 'react';
import { ethers } from 'ethers';
import '../css/DisplayCampaigns.css';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import CrowdfundingCard from './CrowdfundingCard';
import { getAllCampaigns } from '../contractMethods';
import CampaignDetails from './CampaignDetails';

const MyCampaigns = () => {
  const [campaignDetails, setCampaignDetails] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function fetchCampaigns() {
    let campaign = await getAllCampaigns();
    let provider = new ethers.BrowserProvider(window.ethereum);
    let signer = await provider.getSigner();
    const address = signer.address;
    campaign = campaign.filter(camp => camp.owner === address);
    setCampaignDetails(campaign);
    }
    fetchCampaigns();
  }, []);

  function openDetailedView(e) {
     setIndex(e.target.id);
     setOpenDetails(true);
  }

  return (
    <div className='campaigns'>
     {!openDetails && <Sidebar></Sidebar>}
     {!openDetails && <Navbar header="My Campaigns"></Navbar>}
     {!openDetails && <div className='details'>
      {campaignDetails.length > 0 && campaignDetails.map((campaign, index) => 
      <CrowdfundingCard 
      key={index}
      id={index}
      address={campaign.owner} 
      title={campaign.title} 
      description={campaign.description}
      target={campaign.target}
      category={campaign.category}
      imgUrl={campaign.image}
      raised={campaign.amountCollected}
      deadline={campaign.deadline}
      onClick = {openDetailedView}
       />)}
      {campaignDetails.length == 0 && <h1 className='nothing'>No Campaigns to Display</h1>}
    </div>}
    {openDetails && <CampaignDetails campaignArray = {campaignDetails} index={index}/>}
    </div>
  );
}

export default MyCampaigns;