import {ethers} from 'ethers';
import {abi} from './abi';

async function initiateContract() {
    let provider = new ethers.BrowserProvider(window.ethereum);
    let signer = await provider.getSigner();
    const contract = new ethers.Contract('0x3f690A31fC13911554A37E92E9d23C93EB912c5D', abi, signer);
    return contract;
 }

 
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
     let campaignId;
     let provider = new ethers.BrowserProvider(window.ethereum);
     let signer = await provider.getSigner();
     const address = signer.address;
     let currentDate = Math.floor(new Date().getTime() / 1000);
     const date = Math.floor(new Date(endDate).getTime() / 1000);
     let daysLeft = Math.floor((date - currentDate) / (60 * 60 * 24));

     try { 
      if (daysLeft > 0 && parseInt(goal) > 0) {
         const tx = await contract.createCampaign(address, title, description, goal, date, category, imageUrl, { gasLimit: 300000, from: `${signer.address}`});
         campaignId = await tx.wait();
      }
      else {
        alert("Please enter correct details");
      }
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

    try {
       const campaignDetails = await contract.campaigns(campaignId);
       let target = parseInt(campaignDetails[3]);
       let raised = parseInt(campaignDetails[5]) / 10 ** 18;
       
       if (raised + parseInt(amount) <= target) {
          if (parseInt(amount) > 0) {
            const tx = await contract.donateToCampaign(campaignId, {gas : 300000, from : address, value : ethers.parseEther(amount.toString())});
            await tx.wait();
            return true;
          }
          else {
             alert("Please enter valid amount");
          }
       }
       else {
         alert ("Please enter less amount than required");
       }
    } catch(err) {
        alert("Something went wrong while donation");
        console.log(err);
    }
    return false;
  }

  export async function getCampaignDonators(id) {
    const contract = await initiateContract();
    let donators = await contract.getDonators(id);
    return donators;
  }