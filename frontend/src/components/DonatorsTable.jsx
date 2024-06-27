import React from 'react';
import '../css/DonatorsTable.css';

const DonatorsTable = ({ donators }) => {
  return (
    <div className="donators">
      <h3>Top Donators</h3>
      <table>
        <thead>
          <tr>
            <th>MetaMask Address</th>
            <th>Amount Donated</th>
          </tr>
        </thead>
        <tbody>
          {donators.length > 0 && donators.map((donator, index) => {
            if (index % 2 != 0) {
               return;
            }
            return (
            <tr key={index}>
              <td>{donator}</td>
              <td>{parseInt(donators[index + 1]) ? parseInt(donators[index + 1]) /10**18 : 0} ETH</td>
            </tr>
          )})}

        </tbody>
      </table>
    </div>
  );
};

export default DonatorsTable;
