require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    default: 'ganache',
    hardhat: {},
    ganache: {
      url: 'http://127.0.0.1:7545',
      accounts: [`${process.env.PRIVATE_KEY}`]
    }
  },
};
