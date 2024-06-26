import React from 'react';
import ProgressBar from './ProgressBar';
import DonatorsTable from './DonatorsTable';
import '../css/DetailsCard.css';

const DetailsCard = () => {
  const fundRaised = 10000;
  const fundRequired = 20000;
  const progress = (fundRaised / fundRequired) * 100;

  const donators = [
    { address: '0x1234...abcd', amount: 500 },
    { address: '0x5678...efgh', amount: 300 },
    { address: '0x9abc...ijkl', amount: 200 },
  ];

  return (
    <div className="carddetaile">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkGHsQ2Vz1J8Cs3uBW2vlPS6yz68U8dP7Zkw&s" alt="Card Image" className="dcard-image" />
      <div className="dcard-content">
        <h2 className="dcard-title">Card Title</h2>
        <p className="dcard-description">
          This is a detailed description of the card. It provides more information about the card, including its features, benefits, and any other relevant details.
        </p>
        <p className="dcard-meta">
          <i className="fas fa-info-circle"></i> Additional Meta Information
        </p>
        <p className="dcard-fund-raised">
          <i className="fas fa-hand-holding-usd"></i> Fund Raised: ${fundRaised.toLocaleString()}
        </p>
        <p className="dcard-fund-required">
          <i className="fas fa-bullseye"></i> Fund Required: ${fundRequired.toLocaleString()}
        </p>
        <ProgressBar progress={progress} />
        <button className="dcard-button">
          <i className="fas fa-donate"></i> Donate Now
        </button>
        <DonatorsTable donators={donators} />
      </div>
    </div>
  );
};

export default DetailsCard;