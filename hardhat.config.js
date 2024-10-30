/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");

// Go to https://infura.io, sign up, create a new API key
// in its dashboard, and add it to the configuration variables
const INFURA_API_KEY = process.env.INFURA_ENDPOINT

// Add your Sepolia account private key to the configuration variables
// To export your private key from Coinbase Wallet, go to
// Settings > Developer Settings > Show private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const PRIVATE_KEY = process.env.PRIVATE_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    sepolia: {
      url: INFURA_API_KEY,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./blockchain/contracts",
    tests: "./blockchain/test",
    cache: "./blockchain/cache",
    artifacts: "./blockchain/artifacts"
  },
};
