// src/CrowdfundingCard.js
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { walletUrl } from '../assets';
import '../css/CrowdfundingCard.css';
import { FaRegFolder } from "react-icons/fa";

const CrowdfundingCard = (props) => {
  const navigate = useNavigate();

  function openDetailedView() {
    navigate('/campaign-details');
  }

  const daysLeft = new Date(parseInt(props.deadline)).getDay();
  console.log(daysLeft);
  
  return (
    <div className="card" id = {props.id}>
      <img src={props.imgUrl} alt='image' className="card-image" />
      <div className="card-content">
        <FaRegFolder />
        <span className="card-category">{props.category}</span>
        <h2 className="card-title">{props.title}</h2>
        
        <p className="card-description">{props.description}</p>
        <div className="card-progress">
          <div className="progress-bar" style={{ width: `${(parseInt(props.raised) / parseInt(props.target)) * 100}%` }}></div>
        </div>
        <span className="card-goal">Raised: {props.raised.toString()} ETH / {props.target.toString()} ETH</span>
        <span className="card-days-left">Days Left: {daysLeft}</span>
        <img src={walletUrl} className='wallet-img'/>
        <span className='wallet-address'>{props.address.substr(0, 30)}...</span>
      </div>
    </div>
  );
};

export default CrowdfundingCard;
