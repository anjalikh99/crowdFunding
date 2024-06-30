import React from 'react';
import { useEffect , useState} from 'react';
import '../css/DisplayCampaigns.css';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import CrowdfundingCard from './CrowdfundingCard';
import { getAllCampaigns} from '../contractMethods';
import CampaignDetails from './CampaignDetails';
import { restCampaignDetails } from '../constants';
import ReactLoading from "react-loading";

const DisplayCampaigns = () => {
  const [campaignDetails, setCampaignDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function fetchCampaigns() {
    setIsLoading(true);
    const campaign = await getAllCampaigns();
    setCampaignDetails(campaign);
    setIsLoading(false);
    }
    fetchCampaigns();
  }, []);

  function openDetailedView(e) {
     setIndex(e.target.id);
     setOpenDetails(true);
  }
  return (
  <div className='bg-dark'>
    {isLoading && <div className='loading-component'>
      {!openDetails && <Sidebar></Sidebar>}
      {!openDetails && <ReactLoading type="spokes" color="#edebdd" height={50} width={50} className='loader'/>}
    </div>}
    {!isLoading && <div className='campaigns'>
     {!openDetails && <Sidebar></Sidebar>}
     {!openDetails && <Navbar header="All Campaigns"></Navbar>}
     {!openDetails && <div className='details'>
      {campaignDetails.length > 0 ? campaignDetails.map((campaign, index) => 
      <CrowdfundingCard 
      key={index}
      id = {index}
      address={campaign.owner} 
      title={restCampaignDetails[index].title} 
      description={restCampaignDetails[index].description}
      target={campaign.target}
      category={campaign.category}
      imgUrl={restCampaignDetails[index].image}
      raised={campaign.amountCollected}
      deadline={campaign.deadline}
      onClick = {openDetailedView}
       />) : (<h1 className='nothing'>No Campaigns to Display</h1>)}
    </div>}
    {openDetails && <CampaignDetails campaignArray = {campaignDetails} restDetails = {restCampaignDetails} index={index}/>}
    </div>}
  </div>
  );
}

export default DisplayCampaigns;