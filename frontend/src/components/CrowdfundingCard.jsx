// src/CrowdfundingCard.js
import { walletUrl } from '../assets';
import '../css/CrowdfundingCard.css';
import { FaRegFolder } from "react-icons/fa";

const CrowdfundingCard = (props) => {

  const daysLeft = new Date(parseInt(props.deadline)).getDay();
  
  return (
    <div className="card" onClick={props.onClick} id={`card${props.id}`}>
      <img src={props.imgUrl} alt='image' className="card-image" />
      <div className="card-content" id={`content${props.id}`}>
        <FaRegFolder />
        <span className="card-category">{props.category}</span>
        <h2 className="card-title" id={`title${props.id}`}>{props.title}</h2>
        
        <p className="card-description" id={`desc${props.id}`}>{props.description}</p>
        <div className="card-progress">
          <div className="progress-bar" style={{ width: `${((parseInt(props.raised) / 10 ** 18) / parseInt(props.target)) * 100}%` }}></div>
        </div>
        <span className="card-goal">Raised: {parseInt(props.raised) / 10**18} ETH / {props.target.toString()} ETH</span>
        <span className="card-days-left">Days Left: {daysLeft}</span>
        <img src={walletUrl} className='wallet-img'/>
        <span className='wallet-address'>{props.address.substr(0, 30)}...</span>
      </div>
    </div>
  );
};

export default CrowdfundingCard;
