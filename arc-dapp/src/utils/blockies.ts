// ✅ Import + type-cast
import blockiesModule from "ethereum-blockies-base64";
const blockies = blockiesModule as unknown as (address: string) => string;

/**
 * Generates a Base64 blockie (avatar) for an Ethereum address.
 */
export function getBlockieDataUrl(address: string): string {
  if (!address) return "";

  try {
    // The library expects only one argument (address string)
    return blockies(address.toLowerCase());
  } catch (err) {
    console.error("❌ Error generating blockie:", err);
    return "";
  }
}
