/* eslint-disable @typescript-eslint/no-require-imports */
const hre = require("hardhat");

async function main() {
    const donations = await hre.ethers.deployContract("Donations");
    await donations.waitForDeployment();

    console.log("Donations contract deployed at:", donations.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});