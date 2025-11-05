
import { AvatarBlockies } from "../utils/AvatarBlockies";

interface AvatarProps {
  address: string;
  name?: string;
  size?: number;
}

export default function Avatar({ address, name, size = 40 }: AvatarProps) {
  return (
    <div className="relative flex items-center justify-center w-10 h-10 rounded-full overflow-hidden">
      <AvatarBlockies address={address} size={size} />
      {name && (
        <div className="absolute text-[10px] bottom-0 bg-black/60 text-white w-full text-center py-0.5 font-medium">
          {name.split(".")[0]} {/* shows 'sunil' from 'sunil.arc' */}
        </div>
      )}
    </div>
  );
}
