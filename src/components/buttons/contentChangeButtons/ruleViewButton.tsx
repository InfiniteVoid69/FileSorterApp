import { Ruler } from "lucide-react";
import { HandlePageState } from "@/handlers";
export const RuleViewButton = () => {
  const handleClick = () => {HandlePageState().setPageState("rules");};
  return (
    <button
      className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-md hover:bg-[#393939] text-gray-300 w-full"
      onClick={handleClick}
    >
      <Ruler size={18} />
      Rules
    </button>
  );
};
