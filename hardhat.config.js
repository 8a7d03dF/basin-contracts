require("@nomiclabs/hardhat-waffle");
require("@nomicfoundation/hardhat-verify");

require("hardhat-gas-reporter");
require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  networks: {
    localhost: {
      //Requires start of local network at port:
      url: "http://127.0.0.1:8545",
    },
    hardhat: {
      forking: {
        url: "https://developer-access-mainnet.base.org/",
        accounts: [process.env.PRIVATE_KEY],
      },
    },
    // goerli: {
    //   url: process.env.GOERLI_URL,
    //   //Consider any address posted here to be compromised
    //   accounts: [process.env.PRIVATE_KEY_1, process.env.PRIVATE_KEY_2],
    // },
    base: {
      url: process.env.BASE_URL,
      //Consider any address posted here to be compromised
      accounts: [process.env.PRIVATE_KEY],
      saveDeployments: true,
      gasPrice: 300000000, // 0.3 gwei
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.1",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  mocha: {
    timeout: 10000000000,
  },
  gasReporter: {
    enabled: false,
    currency: "USD",
    gasPriceApi:
      "https://api.etherscan.io/api?module=proxy&action=eth_gasPrice",
  },
  etherscan: {
    apiKey: {
      base: process.env.ETHERSCAN_KEY,
    },
    customChains: [
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org",
        },
      },
    ],
  },
};
