// require("@nomicfoundation/hardhat-toolbox");
// require("dotenv").config();

// module.exports = {
//   solidity: "0.8.28",
//   networks: {
//     arcTestnet: {
//       url: " https://rpc.drpc.testnet.arc.network",
//       chainId: 5042002,
//       accounts: [process.env.PRIVATE_KEY="6f8c13ba8e0b5e3dbadf9815106a17c05d6b6c6ec9f68a547cd6536fd6391a02"] // from MetaMask test wallet
//     }
//   }
// };

require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

const { RPC_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: { enabled: true, runs: 200 },
    },
  },
  networks: {
    arcTestnet: {
      url: RPC_URL || "https://rpc.testnet.arc.network",
      chainId: 5042002,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: "none",
  },
};
