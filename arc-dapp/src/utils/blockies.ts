import blockies from "ethereum-blockies-base64";

/**
 * Generates a Base64 blockie (avatar) for an Ethereum address.
 */
export function getBlockieDataUrl(address: string, size = 40): string {
  if (!address) return "";

  try {
    // ✅ 'blockies' itself is a function, not an object with .createDataURL
    return blockies(address.toLowerCase(), {
      size: 8, // Number of blocks
      scale: Math.max(2, Math.floor(size / 8)), // Scale factor
    });
  } catch (err) {
    console.error("❌ Error generating blockie:", err);
    return "";
  }
}
