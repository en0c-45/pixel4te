// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const Pixel4te = await hre.ethers.getContractFactory("Pixel4te");
  // const balance = await Pixel4te.signer.getBalance()
  // console.log(balance)

  // const address = await Pixel4te.signer.getAddress()
  // console.log(address)
  // const deployTransaction = await Pixel4te.getDeployTransaction()
  // const estimateGas = await Pixel4te.signer.estimateGas(deployTransaction);
  // console.log(estimateGas)
  const pixel4te = await Pixel4te.deploy();
  await pixel4te.deployed();

  const Marketplace = await hre.ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy(pixel4te.address);

  await marketplace.deployed();

  console.log('Pixel4te.address', pixel4te.address);

  console.log('Marketplace.address', marketplace.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
