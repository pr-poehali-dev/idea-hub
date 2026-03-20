import Shop from "@/components/Shop";
import type { Upgrade } from "@/hooks/useGameState";

interface ClickerGameProps {
  score: number;
  clicks: number;
  combo: number;
  comboMultiplier: number;
  level: number;
  progressToNext: number;
  clickPower: number;
  autoPerSec: number;
  globalMultiplier: number;
  floats: { id: number; x: number; y: number; points: number }[];
  upgrades: Upgrade[];
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  buyUpgrade: (id: string) => void;
  getUpgradeCost: (id: string) => number;
}

const ClickerGame = ({
  score,
  clicks,
  combo,
  comboMultiplier,
  level,
  progressToNext,
  clickPower,
  autoPerSec,
  globalMultiplier,
  floats,
  upgrades,
  onClick,
  buyUpgrade,
  getUpgradeCost,
}: ClickerGameProps) => {
  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      {/* Карточка кликера */}
      <div className="bg-[#2f3136] border border-[#202225] rounded-lg overflow-hidden">
        <div className="h-16 sm:h-20 bg-gradient-to-r from-[#5865f2] to-[#7c3aed] relative flex items-center justify-center">
          <span className="text-white text-2xl font-black tracking-widest drop-shadow">КликМастер</span>
        </div>

        <div className="pt-4 sm:pt-5 px-3 sm:px-4 pb-3 sm:pb-4">
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-[#36393f] rounded-lg p-2 text-center">
              <div className="text-[#5865f2] text-xs font-semibold uppercase mb-1">Очки</div>
              <div className="text-white font-bold text-lg">{score}</div>
            </div>
            <div className="bg-[#36393f] rounded-lg p-2 text-center">
              <div className="text-[#faa61a] text-xs font-semibold uppercase mb-1">Уровень</div>
              <div className="text-white font-bold text-lg">{level}</div>
            </div>
            <div className="bg-[#36393f] rounded-lg p-2 text-center">
              <div className={`text-xs font-semibold uppercase mb-1 ${combo >= 5 ? "text-[#ed4245]" : "text-[#3ba55c]"}`}>
                Комбо
              </div>
              <div className="text-white font-bold text-lg">x{comboMultiplier}</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-xs text-[#b9bbbe] mb-1">
              <span>До уровня {level + 1}</span>
              <span>{progressToNext}/100</span>
            </div>
            <div className="w-full bg-[#202225] rounded-full h-2">
              <div
                className="bg-[#5865f2] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressToNext}%` }}
              ></div>
            </div>
          </div>

          {/* Мини-статы прокачки */}
          <div className="flex gap-2 mb-4 flex-wrap">
            <div className="flex-1 bg-[#36393f] rounded px-2 py-1 text-center min-w-[70px]">
              <span className="text-[#b9bbbe] text-xs">⚡ За клик: </span>
              <span className="text-white text-xs font-bold">{clickPower}</span>
            </div>
            {autoPerSec > 0 && (
              <div className="flex-1 bg-[#36393f] rounded px-2 py-1 text-center min-w-[70px]">
                <span className="text-[#b9bbbe] text-xs">🤖 Авто: </span>
                <span className="text-[#3ba55c] text-xs font-bold">+{autoPerSec}/с</span>
              </div>
            )}
            {globalMultiplier > 1 && (
              <div className="flex-1 bg-[#36393f] rounded px-2 py-1 text-center min-w-[70px]">
                <span className="text-[#b9bbbe] text-xs">✨ Множитель: </span>
                <span className="text-[#faa61a] text-xs font-bold">x{globalMultiplier.toFixed(2)}</span>
              </div>
            )}
          </div>

          <div className="relative flex justify-center">
            <button
              onClick={onClick}
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#5865f2] to-[#7c3aed] hover:from-[#4752c4] hover:to-[#6d28d9] active:scale-95 transition-all duration-100 shadow-lg shadow-[#5865f2]/30 flex items-center justify-center select-none cursor-pointer"
            >
              <div className="text-center">
                <div className="text-4xl mb-1">👆</div>
                <div className="text-white text-xs font-bold uppercase tracking-wide">Клик!</div>
              </div>
              {combo >= 10 && (
                <div className="absolute -top-2 -right-2 bg-[#ed4245] text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                  ОГОНЬ!
                </div>
              )}
            </button>

            {floats.map((f) => (
              <div
                key={f.id}
                className="absolute pointer-events-none text-[#faa61a] font-bold text-sm"
                style={{
                  left: f.x,
                  top: f.y,
                  animation: "floatUp 0.8s ease-out forwards",
                }}
              >
                +{f.points}
              </div>
            ))}
          </div>

          <div className="mt-4 text-center text-[#b9bbbe] text-xs">
            Всего кликов: <span className="text-white font-semibold">{clicks}</span>
          </div>
        </div>
      </div>

      {/* Магазин улучшений */}
      <Shop
        upgrades={upgrades}
        score={score}
        buyUpgrade={buyUpgrade}
        getUpgradeCost={getUpgradeCost}
      />
    </div>
  );
};

export default ClickerGame;