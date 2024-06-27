import React from 'react';
import '../css/Icon.css';
import { useNavigate } from 'react-router-dom';

const Icon = (props) => {
  const navigate = useNavigate();
  function performAction() {
    if(props.link === '/') {
      localStorage.removeItem("myContract");
      navigate(props.link);
    }  
  }
  return (
    <ul className="list-unstyled" id={props.id}>
        <li>
            <a href={props.link} onClick={performAction}>
                {props.imgUrl}
            </a>
        </li>
    </ul>
  )
}

export default Icon;