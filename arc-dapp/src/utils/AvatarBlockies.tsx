import { useEffect, useState } from "react";
import * as blockies from "ethereum-blockies-base64";

interface AvatarBlockiesProps {
  address: string;
  size?: number;
}

export function AvatarBlockies({ address, size = 40 }: AvatarBlockiesProps) {
  const [icon, setIcon] = useState<string>("");

  useEffect(() => {
    if (!address) return;

    try {
      const data = blockies.createDataURL({
        seed: address.toLowerCase(),
        size: 8,
        scale: Math.max(4, Math.floor(size / 8)),
      });
      setIcon(data);
    } catch (err) {
      console.error("Blockies generation failed:", err);
    }
  }, [address, size]);

  return (
    <img
      src={icon}
      width={size}
      height={size}
      alt="Avatar"
      className="rounded-full border border-white/10 shadow-md"
    />
  );
}
