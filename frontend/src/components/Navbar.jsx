import { CustomButton } from './';
import '../css/Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {
  const navigate = useNavigate();

  function openCampaignForm() {
    navigate('/create-campaign');
  }
  return (
    <div>
      <div className='navbar'>
        <h1 className='header'>{props.header}</h1>
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