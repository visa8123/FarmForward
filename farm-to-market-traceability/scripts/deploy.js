// const hre = require("hardhat");

// async function main() {
//   const FarmToMarket = await hre.ethers.getContractFactory("FarmToMarket");

//   const farmToMarket = await FarmToMarket.deploy(
//     "TOM001", // productId
//     "Tomato", // name
//     "Tanjore", // location
//     "2025-04-20" // harvestDate
//   );

//   await farmToMarket.waitForDeployment(); // ✅ Replace deployed() with waitForDeployment()

//   console.log(`Contract deployed to: ${farmToMarket.target}`);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  const Contract = await hre.ethers.getContractFactory("FarmToMarket");
  const contract = await Contract.deploy();
  await contract.waitForDeployment();

  console.log("Contract deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});
