import { useState } from "react";
import { X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Upgrade, GameState } from "@/hooks/useGameState";

interface AdminPanelProps {
  onClose: () => void;
  score: number;
  totalScore: number;
  clicks: number;
  upgrades: Upgrade[];
  onSetScore: (v: number) => void;
  onSetTotalScore: (v: number) => void;
  onSetClicks: (v: number) => void;
  onSetUpgradeLevel: (id: string, level: number) => void;
  onMaxAllUpgrades: () => void;
  onResetAll: () => void;
  onSaveNow: () => void;
}

const AdminPanel = ({
  onClose,
  score,
  totalScore,
  clicks,
  upgrades,
  onSetScore,
  onSetTotalScore,
  onSetClicks,
  onSetUpgradeLevel,
  onMaxAllUpgrades,
  onResetAll,
  onSaveNow,
}: AdminPanelProps) => {
  const [scoreInput, setScoreInput] = useState(String(score));
  const [totalInput, setTotalInput] = useState(String(totalScore));
  const [clicksInput, setClicksInput] = useState(String(clicks));

  const apply = () => {
    const s = parseInt(scoreInput);
    const t = parseInt(totalInput);
    const c = parseInt(clicksInput);
    if (!isNaN(s)) onSetScore(s);
    if (!isNaN(t)) onSetTotalScore(t);
    if (!isNaN(c)) onSetClicks(c);
    onSaveNow();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={onClose}>
      <div
        className="bg-[#2f3136] border border-[#202225] rounded-xl w-full max-w-md mx-4 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Шапка */}
        <div className="bg-gradient-to-r from-[#ed4245] to-[#c03537] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-white" />
            <span className="text-white font-bold text-sm">Админ-панель</span>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-5 max-h-[80vh] overflow-y-auto">

          {/* Баланс */}
          <div>
            <div className="text-[#8e9297] text-xs font-semibold uppercase tracking-wide mb-2">Баланс</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[#b9bbbe] text-xs w-28 flex-shrink-0">Текущие очки</span>
                <input
                  type="number"
                  value={scoreInput}
                  onChange={(e) => setScoreInput(e.target.value)}
                  className="flex-1 bg-[#202225] text-white text-sm px-3 py-1.5 rounded border border-[#40444b] focus:border-[#5865f2] outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#b9bbbe] text-xs w-28 flex-shrink-0">Всего заработано</span>
                <input
                  type="number"
                  value={totalInput}
                  onChange={(e) => setTotalInput(e.target.value)}
                  className="flex-1 bg-[#202225] text-white text-sm px-3 py-1.5 rounded border border-[#40444b] focus:border-[#5865f2] outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#b9bbbe] text-xs w-28 flex-shrink-0">Всего кликов</span>
                <input
                  type="number"
                  value={clicksInput}
                  onChange={(e) => setClicksInput(e.target.value)}
                  className="flex-1 bg-[#202225] text-white text-sm px-3 py-1.5 rounded border border-[#40444b] focus:border-[#5865f2] outline-none"
                />
              </div>
            </div>
            <Button
              onClick={apply}
              className="mt-3 w-full bg-[#5865f2] hover:bg-[#4752c4] text-white text-sm py-1.5 h-auto"
            >
              Применить
            </Button>
          </div>

          {/* Улучшения */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-[#8e9297] text-xs font-semibold uppercase tracking-wide">Улучшения</div>
              <button
                onClick={onMaxAllUpgrades}
                className="text-[#faa61a] text-xs font-semibold hover:text-yellow-300 transition-colors"
              >
                Макс. всё ⚡
              </button>
            </div>
            <div className="space-y-2">
              {upgrades.map((u) => (
                <div key={u.id} className="flex items-center gap-3 bg-[#36393f] rounded-lg px-3 py-2">
                  <span className="text-xl">{u.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-xs font-medium">{u.name}</div>
                    <div className="flex gap-1 mt-1">
                      {Array.from({ length: u.maxLevel }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => onSetUpgradeLevel(u.id, i + 1 === u.level ? i : i + 1)}
                          className={`h-2 flex-1 rounded-full transition-colors ${
                            i < u.level ? "bg-[#5865f2] hover:bg-[#4752c4]" : "bg-[#202225] hover:bg-[#40444b]"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onSetUpgradeLevel(u.id, Math.max(0, u.level - 1))}
                      className="w-6 h-6 bg-[#40444b] hover:bg-[#4f545c] text-white rounded text-xs flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="text-white text-xs font-bold w-8 text-center">{u.level}/{u.maxLevel}</span>
                    <button
                      onClick={() => onSetUpgradeLevel(u.id, Math.min(u.maxLevel, u.level + 1))}
                      className="w-6 h-6 bg-[#40444b] hover:bg-[#4f545c] text-white rounded text-xs flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Опасная зона */}
          <div>
            <div className="text-[#8e9297] text-xs font-semibold uppercase tracking-wide mb-2">Опасная зона</div>
            <Button
              onClick={() => { onResetAll(); onClose(); }}
              className="w-full bg-[#ed4245] hover:bg-[#c03537] text-white text-sm py-1.5 h-auto"
            >
              Сбросить весь прогресс
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
