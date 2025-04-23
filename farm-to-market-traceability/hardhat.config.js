// require("@nomicfoundation/hardhat-toolbox");
// require("dotenv").config();

// module.exports = {
//   solidity: "0.8.20",
//   networks: {
//     sepolia: {
//       url: process.env.SEPOLIA_URL,
//       accounts: [process.env.PRIVATE_KEY]
//     }
//   }
// };

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true, // 🛠️ Enables Intermediate Representation to fix stack too deep
    },
  },
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};



