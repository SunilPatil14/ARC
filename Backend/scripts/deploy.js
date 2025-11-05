const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying contract to Arc Testnet...");

  const [deployer] = await ethers.getSigners();
  console.log("👤 Deployer address:", deployer.address);

  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("💰 Deployer balance:", ethers.formatEther(balance), "USDC");

  // Compile and deploy your Message.sol
  const Message = await ethers.getContractFactory("Message"); // make sure your file name matches
  const message = await Message.deploy("Hello from Arc Testnet!");

  await message.waitForDeployment();
  console.log("✅ Contract deployed at:", await message.getAddress());
  console.log("🌐 Explorer: https://testnet.arcscan.app/address/" + (await message.getAddress()));
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Deployment failed:", err);
    process.exit(1);
  });
