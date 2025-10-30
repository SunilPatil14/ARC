const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "USD");

  // Deploy HelloArc with a constructor argument
  const HelloArc = await ethers.getContractFactory("HelloArc");
  const helloArc = await HelloArc.deploy("Hello ARC Network!");

  await helloArc.waitForDeployment();

  console.log("HelloArc contract deployed to:", await helloArc.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
