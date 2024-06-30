import {ethers} from 'ethers';
import {abi} from './abi';
import PinataClient from '@pinata/sdk';
import { restCampaignDetails } from './constants';

async function initiateContract() {
    let provider = new ethers.BrowserProvider(window.ethereum);
    let signer = await provider.getSigner();
    const contract = new ethers.Contract(`${import.meta.env.VITE_CONTRACT_ADDRESS}`, abi, signer);
    return contract;
 }

function initiatePinataClient() {
   return new PinataClient({pinataApiKey: `${import.meta.env.VITE_PINATA_API_KEY}`,pinataSecretApiKey: `${import.meta.env.VITE_PINATA_API_SECRET}`});
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

  async function getCampaignDetailsByHash(hash) {
    const url = `${import.meta.env.VITE_IPFS_URL}/${hash}`;
    const data = await fetch(url, {mode: 'no-cors'});
    let jsonData = await data.json();
    return jsonData;
  }

  async function uploadToIpfs(title, description, imageUrl) {
    const pinata = initiatePinataClient();
    let allCampaigns = await getAllCampaigns();
    let campaignId = allCampaigns.length;

    let campaignDetails = {
      campaignId: campaignId,
      title: title,
      description: description,
      image: imageUrl
   };

   try {
    const pinataOptions = {
      pinataMetadata: {
        name: `Campaign${campaignId}Data.json`
      }
    };

    const { IpfsHash } = await pinata.pinJSONToIPFS(campaignDetails, pinataOptions);
    console.log(IpfsHash);

    return IpfsHash;
  } catch (error) {
    console.error('Error uploading to Pinata:', error);
    return null;
  }

  }

  export async function getAllCampaigns() {
     const contract = await initiateContract();

     const campaigns = await contract.getCampaigns();
     for(let i=0; i<campaigns.length; i++) {
      const data = await getCampaignDetailsByHash(campaigns[i].ipfsHash);
      let found = restCampaignDetails.find(details => details.campaignId === data.campaignId);
      if (found) {
        continue;
      }
      restCampaignDetails.push(data);
         
      }
    return campaigns;
  }

  export async function createNewCampaign(title, description, goal, imageUrl, category, endDate) {
     let campaignId; 
     const contract = await initiateContract();
     let provider = new ethers.BrowserProvider(window.ethereum);
     let signer = await provider.getSigner();
     const address = signer.address;
     let currentDate = Math.floor(new Date().getTime() / 1000);
     const date = Math.floor(new Date(endDate).getTime() / 1000);
     let daysLeft = Math.floor((date - currentDate) / (60 * 60 * 24));
     
     try { 
      if (daysLeft > 0 && parseInt(goal) > 0) {
         let returnedHash = await uploadToIpfs(title, description, imageUrl);
         const tx = await contract.createCampaign(address, returnedHash, goal, date, category, { gasLimit: 300000, from: `${signer.address}`});
         campaignId = await tx.wait();
         console.log(campaignId);
      }
      else {
        alert("Please enter correct details");
      }
     } catch(err) {
        alert("Something went wrong while creating campaign");
        window.location.href = '/create-campaign';
     }
     return campaignId;
  }

  export async function donate(campaignId, amount) {
    const contract = await initiateContract();
    let provider = new ethers.BrowserProvider(window.ethereum);
    let signer = await provider.getSigner();
    const address = signer.address;

    try {
       const campaignDetails = await contract.campaigns(campaignId);
       console.log(campaignDetails);
       let target = parseInt(campaignDetails[2]);
       let raised = parseInt(campaignDetails[4]) / 10 ** 18;
       
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