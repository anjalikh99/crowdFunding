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
          {donators.map((donator, index) => (
            <tr key={index}>
              <td>{donator}</td>
              <td>{parseInt(donators[1])/10**18} ETH</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonatorsTable;
