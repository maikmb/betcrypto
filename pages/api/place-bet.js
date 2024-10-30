import { betContract } from "../../backend/contracts/bet-contract";

export default async function handler(req, res) {
  const { betId, amount, option } = req.body;

  try {
    const transaction = await betContract.placeBet(betId, option === "A", {
      value: ethers.utils.parseEther(amount),
    });
    await transaction.wait();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
