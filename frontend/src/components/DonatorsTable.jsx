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
              <td>{donator.address}</td>
              <td>${donator.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonatorsTable;