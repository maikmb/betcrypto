// pages/api/create-wallet.js
import { ethers } from "ethers";

export default async function handler(req, res) {
  const wallet = ethers.Wallet.createRandom();
  res.status(200).json({
    address: wallet.address,
    privateKey: wallet.privateKey,
  });
}
