import React from 'react';
import '../css/Icon.css';

const Icon = (props) => {
  return (
    <ul className="list-unstyled" id={props.id}>
        <li>
            <a href={props.link}>
                {props.imgUrl}
            </a>
        </li>
    </ul>
  )
}

export default Icon;