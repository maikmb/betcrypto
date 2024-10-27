import { ethers } from "ethers";
import BetContract from "../artifacts/contracts/BetContract.sol/BetContract.json";

const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_INFURA_API_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const betContract = new ethers.Contract("CONTRACT_ADDRESS", BetContract.abi, wallet);

export { betContract };
