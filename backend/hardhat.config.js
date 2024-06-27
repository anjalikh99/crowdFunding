require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    ganache: {
      url: 'http://127.0.0.1:7545',
      chainId: 1337,
      from: `${process.env.WALLET_ADDRESS}`,
      gas: 3000000
    },
    sepolia: {
      url: `${process.env.SEPOLIA_URL}`,
      accounts: [`${process.env.PRIVATE_KEY}`]
    }
  },
};
