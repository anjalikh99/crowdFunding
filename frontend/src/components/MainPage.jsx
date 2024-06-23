import React, { useState } from 'react';
import '../css/MainPage.css';

const MainPage = (props) => {
    return (
        <div className='connectWallet'>
            <div className='typingContainer'>
                <div className='typing'>CrowdFunding</div>
            </div>
            <div className="walletButtonContainer">
                <button className='walletButton' onClick={props.connectMetamask}>
                    Connect to Metamask
                </button>
            </div>
        </div>
    );
}

export default MainPage;
