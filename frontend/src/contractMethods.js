import {ethers} from 'ethers';
import {abi} from './abi';

export async function connect() {
    let res = await connectToMetamask();
    if (res === true) {
      await changeNetwork();
      try {
         const contract = await initiateContract();
         return contract;
      } catch (err) {
        alert("CONTRACT_ADDRESS not set properly");
        console.log(err);
      }
    } else {
      alert("Couldn't connect to Metamask");
    }
  }

 async function connectToMetamask() {
    try {
      await window.ethereum.enable();
      return true;
    } catch (err) {
      return false;
    }
  }

 async function initiateContract() {
    let provider = new ethers.BrowserProvider(window.ethereum);
    let signer = await provider.getSigner();
    const contract = new ethers.Contract('0x2e009722D239E40C677d657796F8617212023987', abi, signer);
    return contract;
 }

async function changeNetwork() {
    // switch network to avalanche
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x539" }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x539",
                chainName: "Ganache",
                nativeCurrency: {
                  name: "Ethereum",
                  symbol: "ETH",
                  decimals: 18,
                },
                rpcUrls: ["http://127.0.0.1:7545"],
              },
            ],
          });
        } catch (addError) {
          alert("Error in adding Ganache network");
        }
      }
    }
  }

  export async function getAllCampaigns() {
     const contract = await initiateContract();

     const campaigns = await contract.getCampaigns();
     return campaigns;
  }

  export async function createNewCampaign(title, description, goal, imageUrl, category, endDate) {
     const contract = await initiateContract();
     let provider = new ethers.BrowserProvider(window.ethereum);
     let signer = await provider.getSigner();
     const address = signer.address;
     const date = Math.floor(new Date(endDate).getTime() / 1000);
     console.log(date, address);

     try {
     const tx = await contract.createCampaign(address, title, description, goal, date, category, imageUrl, { gasLimit: 300000, from: `${signer.address}`});
     const campaignId = await tx.wait();
     } catch(err) {
        alert("Something went wrong while creating campaign");
     }
     return campaignId;
  }

  export async function getMyCampaigns() {
    const contract = await initiateContract();
    let provider = new ethers.BrowserProvider(window.ethereum);
    let signer = await provider.getSigner();
    const address = signer.address;

    const campaigns = await contract.getCampaigns();
    let myCampaigns = [];
    for (let i=0; i<campaigns.length; i++) {
        if(campaigns[i].owner === address) {
            myCampaigns.push(campaigns[i]);
        }
    }

    return myCampaigns;
  }

  export async function donate(campaignId, amount) {
    const contract = await initiateContract();
    let provider = new ethers.BrowserProvider(window.ethereum);
    let signer = await provider.getSigner();
    const address = signer.address;

    const tx = await contract.donateToCampaign(campaignId, {gas : 300000, from : address, value : ethers.utils.parseEther(amount)});
  }