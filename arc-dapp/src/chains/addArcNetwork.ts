// addArcNetwork.ts
export async function addArcNetwork(): Promise<void> {
  // 🛑 1️⃣ Check for Ethereum provider
  if (typeof window.ethereum === "undefined") {
    console.error("❌ No wallet provider detected. Please install MetaMask or another EVM wallet.");
    return;
  }

  const arcParams = {
    chainId: "0x4cf3d2", // 5042002 in hex
    chainName: "Arc Testnet",
    nativeCurrency: {
      name: "USDC",
      symbol: "USDC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.testnet.arc.network"],
    blockExplorerUrls: ["https://testnet.arcscan.app"],
  };

  try {
    // 🧩 2️⃣ Check current network
    const currentChainId = await window.ethereum.request({ method: "eth_chainId" });

    if (currentChainId === arcParams.chainId) {
      console.log("✅ Already connected to Arc Testnet");
      return;
    }

    // 🔁 3️⃣ Try switching network first
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: arcParams.chainId }],
      });
      console.log("✅ Switched to Arc Testnet");
      return;
    } catch (switchError: any) {
      // 🧱 4️⃣ If Arc Testnet not added (error 4902), add it
      if (switchError.code === 4902) {
        console.warn("⚠️ Arc Testnet not found. Adding network...");
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [arcParams],
          });
          console.log("✅ Arc Testnet added successfully!");

          // Wait a bit before switching again
          await new Promise((r) => setTimeout(r, 1000));

          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: arcParams.chainId }],
          });
          console.log("✅ Switched to Arc Testnet");
        } catch (addError) {
          console.error("❌ Failed to add Arc Testnet:", addError);
        }
      } else if (switchError.code === -32002) {
        console.log("🕒 Wallet is already processing a switch/add request...");
      } else {
        console.error("⚠️ Network switch failed:", switchError);
      }
    }
  } catch (error) {
    console.error("🚨 Unexpected error during network setup:", error);
  }
}
