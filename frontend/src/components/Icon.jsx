import React from 'react';
import '../css/Icon.css';

const Icon = ({ link, imgUrl }) => {
  return (
    <ul className="list-unstyled">
        <li>
            <a href={link}>
                {imgUrl}
            </a>
        </li>
    </ul>
  )
}

export default Icon;