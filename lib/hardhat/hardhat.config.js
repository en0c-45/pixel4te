require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("hardhat-deploy-ethers")
require("./tasks")
require("dotenv").config()
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.17",
    defaultNetwork: "goerli",
    networks: {
      goerli: {
        url: "https://eth-goerli.g.alchemy.com/v2/9Xd2vgNQqIswqS1IH35y2NDnHBBKSbzF",
        accounts: ["b24ff6cdd8b90a652e6a1e55c2f3b50dae226fde892916ddb774dd8c9419d5a1"],
      },
      sepolia: {
        url: "https://eth-sepolia.g.alchemy.com/v2/8xYVGALXojuerzv1a9KbZXsIfWo3I3QN",
        accounts: ["b24ff6cdd8b90a652e6a1e55c2f3b50dae226fde892916ddb774dd8c9419d5a1"],
      }
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts",
    },
}
