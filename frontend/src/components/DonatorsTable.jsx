import React from 'react';
import '../css/DonatorsTable.css';

const DonatorsTable = ({ donators, donations }) => {
  return (
    <div className="donators">
      <h3>Top Donators</h3>
      <table>
        <thead>
          <tr>
            <th>Donator Address</th>
            <th>Amount Donated</th>
          </tr>
        </thead>
        <tbody>
          {donators.length > 0 && donators.map((donator, index) => (
            <tr key={index}>
              <td>{donator}</td>
              <td>{parseInt(donations[index]) ? parseInt(donations[index]) /10**18 : 0} ETH</td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
};

export default DonatorsTable;
