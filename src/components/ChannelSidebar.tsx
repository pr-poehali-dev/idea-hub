import { Hash, ArrowRight, Mic, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChannelSidebarProps {
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
  level: number;
}

const ChannelSidebar = ({ mobileSidebarOpen, setMobileSidebarOpen, level }: ChannelSidebarProps) => {
  return (
    <div className={`${mobileSidebarOpen ? "block" : "hidden"} lg:block w-full lg:w-60 bg-[#2f3136] flex flex-col`}>
      <div className="p-4 border-b border-[#202225] flex items-center justify-between">
        <h2 className="text-white font-semibold text-base">Сервер КликМастер</h2>
        <Button
          variant="ghost"
          className="lg:hidden text-[#b9bbbe] hover:text-white hover:bg-[#40444b] p-1"
          onClick={() => setMobileSidebarOpen(false)}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex-1 p-2">
        <div className="mb-4">
          <div className="flex items-center gap-1 px-2 py-1 text-[#8e9297] text-xs font-semibold uppercase tracking-wide">
            <ArrowRight className="w-3 h-3" />
            <span>Каналы</span>
          </div>
          <div className="mt-1 space-y-0.5">
            {["общий", "рекорды", "советы", "обновления"].map((channel) => (
              <div
                key={channel}
                className="flex items-center gap-1.5 px-2 py-1 rounded text-[#8e9297] hover:text-[#dcddde] hover:bg-[#393c43] cursor-pointer"
              >
                <Hash className="w-4 h-4" />
                <span className="text-sm">{channel}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1 px-2 py-1 text-[#8e9297] text-xs font-semibold uppercase tracking-wide">
            <ArrowRight className="w-3 h-3" />
            <span>Турниры</span>
          </div>
          <div className="mt-1 space-y-0.5">
            {["Ночной марафон", "Быстрые пальцы"].map((channel) => (
              <div
                key={channel}
                className="flex items-center gap-1.5 px-2 py-1 rounded text-[#8e9297] hover:text-[#dcddde] hover:bg-[#393c43] cursor-pointer"
              >
                <Mic className="w-4 h-4" />
                <span className="text-sm">{channel}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="p-2 bg-[#292b2f] flex items-center gap-2">
        <div className="w-8 h-8 bg-[#5865f2] rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">К</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white text-sm font-medium truncate">КликМастер</div>
          <div className="text-[#b9bbbe] text-xs truncate">Уровень {level}</div>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-[#40444b]">
            <Mic className="w-4 h-4 text-[#b9bbbe]" />
          </Button>
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-[#40444b]">
            <Settings className="w-4 h-4 text-[#b9bbbe]" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChannelSidebar;
