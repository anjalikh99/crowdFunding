import React, { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import DonatorsTable from './DonatorsTable';
import '../css/DetailsCard.css';
import {getCampaignDonators, donate} from '../contractMethods';

const DetailsCard = ({details, restDetails, index}) => {
  const [donationAmount, setDonationAmount] = useState('');
  const [donators, setDonators] = useState([]);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
     async function getDonators() {
         let returnedData = await getCampaignDonators(index);
         setDonators(returnedData[0]);
         setDonations(returnedData[1]);
     }
      getDonators();
  }, []);

  async function donateToCampaign() {
     let amount = donationAmount;
     let success = await donate(index, amount);
     if(success) {
       alert("Donated Successfully");
       window.location.href = '/display-campaigns';
     }
  }

  function handleChange(e) {
     setDonationAmount(e.target.value);
  }
  
  const progress = ((parseInt(details.amountCollected)/ 10** 18) / parseInt(details.target)) * 100;
  const deadline = parseInt(details.deadline);
  const currentSeconds = new Date().getTime() / 1000;
  let daysLeft = Math.floor((deadline - currentSeconds) / (60 * 60 * 24));

  return (
    <div className="carddetaile">
      <img src={restDetails.image} alt="Card Image" className="dcard-image" />
      <div className="dcard-content">
        <h2 className="dcard-title">{restDetails.title}</h2>
        <p className="dcard-description">
          {restDetails.description}
        </p>
        <p className="dcard-meta">
          <i className="fas fa-info-circle"></i> {details.category}
        </p>
        <p className="dcard-fund-raised">
          <i className="fas fa-hand-holding-usd"></i> Fund Raised: {parseInt(details.amountCollected) / 10 ** 18} ETH
        </p>
        <p className="dcard-fund-required">
          <i className="fas fa-bullseye"></i> Fund Required: {parseInt(details.target)} ETH
        </p>
        <ProgressBar progress={progress} />
        <input className="amount" type='number' id='donateAmount' placeholder='Please enter donation amount in ETH' value={donationAmount} onChange={handleChange} required/>
        {daysLeft > 0 && <button className="dcard-button" onClick={donateToCampaign}>
          <i className="fas fa-donate"></i> Donate Now
        </button>}
        {daysLeft <= 0 && <button className="dcard-button" disabled = "true">
          <i className="fas fa-donate"></i> Campaign Ended
        </button>}
        <DonatorsTable donators={donators} donations={donations} />
      </div>
    </div>
  );
};

export default DetailsCard;