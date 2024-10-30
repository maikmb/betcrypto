// import { betContract } from "../../backend/contracts/bet-contract";
const hre = require("hardhat");

export default async function handler(req, res) {
  const { name, optionADescription, optionBDescription } = req.body;

  try {
    const platformWallet = process.env.PLATFORM_WALLET;
    const donations = await hre.ethers.deployContract("Bet", [
      platformWallet,
      name,
      optionADescription,
      optionBDescription,
    ]);
    await donations.waitForDeployment();
    res.status(200).json({ contractAddress: donations.target });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
