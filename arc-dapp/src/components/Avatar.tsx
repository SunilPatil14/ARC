
import { getBlockieDataUrl } from "../utils/blockies";

export default function Avatar({ address, size = 40 }: { address: string; size?: number }) {
  const src = getBlockieDataUrl(address, size);
  return (
    <div
      className="rounded-full overflow-hidden border border-cyan-400/30 shadow-[0_0_10px_rgba(34,211,238,0.3)]"
      style={{ width: size, height: size }}
    >
      <img src={src} alt="avatar" className="w-full h-full object-cover" />
    </div>
  );
}
