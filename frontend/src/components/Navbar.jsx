import React, { useState } from 'react'
import { CustomButton } from './';
import '../css/Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  function openCampaignForm() {
    navigate('/campaign-form');
  }
  return (
    <div>
      <div className='navbar'>
        <h1 className='header'>All Campaigns</h1>
        <CustomButton 
          btnType="button"
          title="Create a Campaign"
          onClick = {openCampaignForm}
        />
      </div>
    </div>
  )
}

export default Navbar