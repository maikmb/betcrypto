// pages/api/withdraw.js
import { ethers } from "ethers";

export default async function handler(req, res) {
  const { privateWalletAddress, amount } = req.body;

  try {
    const transaction = await wallet.sendTransaction({
      to: privateWalletAddress,
      value: ethers.utils.parseEther(amount),
    });
    await transaction.wait();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
