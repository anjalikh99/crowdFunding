import React from 'react';
import '../css/CustomButton.css';

const CustomButton = (props) => {
  return (
    <button className='createOrConnect'
      type={props.btnType}
      onClick = {props.onClick}
    >
      {props.title}
    </button>
  )
}

export default CustomButton