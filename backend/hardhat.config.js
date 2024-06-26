require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "ganache",
  networks: {
    hardhat: {},
    ganache: {
      url: 'http://127.0.0.1:7545',
      chainId: 1337,
      from: `0x9F37364D85765A8b9500dA20831652746594D80F`,
      gas: 3000000
    }
  },
};
