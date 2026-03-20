import { useState } from "react";
import { MousePointerClick } from "lucide-react";
import Navbar from "@/components/Navbar";
import ChannelSidebar from "@/components/ChannelSidebar";
import ChatArea from "@/components/ChatArea";
import AdminPanel from "@/components/AdminPanel";
import { useGameState } from "@/hooks/useGameState";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  const {
    score,
    totalScore,
    clicks,
    combo,
    comboMultiplier,
    floats,
    upgrades,
    level,
    progressToNext,
    clickPower,
    autoPerSec,
    handleClick,
    buyUpgrade,
    getUpgradeCost,
    adminSetScore,
    adminSetTotalScore,
    adminSetClicks,
    adminSetUpgradeLevel,
    adminMaxAllUpgrades,
    adminResetAll,
    adminSaveNow,
  } = useGameState();

  return (
    <div className="min-h-screen bg-[#36393f] text-white overflow-x-hidden">
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onAdminOpen={() => setAdminOpen(true)}
      />

      <div className="flex min-h-screen">
        {/* Боковая панель серверов */}
        <div className="hidden lg:flex w-[72px] bg-[#202225] flex-col items-center py-3 gap-2">
          <div className="w-12 h-12 bg-[#5865f2] rounded-2xl hover:rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer">
            <MousePointerClick className="w-6 h-6 text-white" />
          </div>
          <div className="w-8 h-[2px] bg-[#36393f] rounded-full"></div>
          {[
            { emoji: "🏆", label: "Топ" },
            { emoji: "⚡", label: "Комбо" },
            { emoji: "🔥", label: "Рекорды" },
            { emoji: "🎁", label: "Бонусы" },
          ].map((item, i) => (
            <div
              key={i}
              className="w-12 h-12 bg-[#36393f] rounded-3xl hover:rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer hover:bg-[#5865f2]"
              title={item.label}
            >
              <span className="text-lg">{item.emoji}</span>
            </div>
          ))}
        </div>

        <div className="flex-1 flex flex-col lg:flex-row">
          <ChannelSidebar
            mobileSidebarOpen={mobileSidebarOpen}
            setMobileSidebarOpen={setMobileSidebarOpen}
            level={level}
          />

          <ChatArea
            score={score}
            clicks={clicks}
            combo={combo}
            comboMultiplier={comboMultiplier}
            level={level}
            progressToNext={progressToNext}
            clickPower={clickPower}
            autoPerSec={autoPerSec}
            floats={floats}
            upgrades={upgrades}
            onClickerClick={handleClick}
            onOpenSidebar={() => setMobileSidebarOpen(true)}
            buyUpgrade={buyUpgrade}
            getUpgradeCost={getUpgradeCost}
          />

          {/* Боковая панель участников */}
          <div className="hidden xl:block w-60 bg-[#2f3136] p-4">
            <div className="mb-4">
              <h3 className="text-[#8e9297] text-xs font-semibold uppercase tracking-wide mb-2">Топ игроки — 3</h3>
              <div className="space-y-2">
                {[
                  { name: "Профи_Кликер", status: "1 234 очка", avatar: "П", color: "from-yellow-500 to-orange-500", medal: "🥇" },
                  { name: "СпидРан_99", status: "987 очков", avatar: "С", color: "from-gray-400 to-gray-600", medal: "🥈" },
                  { name: "КликКоролева", status: "756 очков", avatar: "К", color: "from-amber-600 to-amber-800", medal: "🥉" },
                ].map((user, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded hover:bg-[#36393f] cursor-pointer">
                    <div className={`w-8 h-8 bg-gradient-to-r ${user.color} rounded-full flex items-center justify-center relative`}>
                      <span className="text-white text-sm font-medium">{user.avatar}</span>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#3ba55c] border-2 border-[#2f3136] rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-medium truncate flex items-center gap-1">
                        <span>{user.medal}</span>
                        <span>{user.name}</span>
                      </div>
                      <div className="text-[#b9bbbe] text-xs truncate">{user.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {adminOpen && (
        <AdminPanel
          onClose={() => setAdminOpen(false)}
          score={score}
          totalScore={totalScore}
          clicks={clicks}
          upgrades={upgrades}
          onSetScore={adminSetScore}
          onSetTotalScore={adminSetTotalScore}
          onSetClicks={adminSetClicks}
          onSetUpgradeLevel={adminSetUpgradeLevel}
          onMaxAllUpgrades={adminMaxAllUpgrades}
          onResetAll={adminResetAll}
          onSaveNow={adminSaveNow}
        />
      )}

      <style>{`
        @keyframes floatUp {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-60px) scale(1.3); }
        }
      `}</style>
    </div>
  );
};

export default Index;
