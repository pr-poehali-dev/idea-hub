import { Button } from "@/components/ui/button";
import type { Upgrade } from "@/hooks/useGameState";

interface ShopProps {
  upgrades: Upgrade[];
  score: number;
  buyUpgrade: (id: string) => void;
  getUpgradeCost: (id: string) => number;
}

const Shop = ({ upgrades, score, buyUpgrade, getUpgradeCost }: ShopProps) => {
  return (
    <div className="bg-[#2f3136] border border-[#202225] rounded-lg p-3 sm:p-4 w-full max-w-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🛒</span>
        <h3 className="text-white font-bold text-sm">Магазин улучшений</h3>
      </div>
      <div className="space-y-2">
        {upgrades.map((upgrade) => {
          const cost = getUpgradeCost(upgrade.id);
          const canAfford = score >= cost;
          const maxed = upgrade.level >= upgrade.maxLevel;

          return (
            <div
              key={upgrade.id}
              className="flex items-center gap-3 bg-[#36393f] rounded-lg p-2 sm:p-3"
            >
              <div className="text-2xl flex-shrink-0">{upgrade.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-white text-xs font-semibold">{upgrade.name}</span>
                  <span className="text-[#8e9297] text-xs">
                    {upgrade.level}/{upgrade.maxLevel}
                  </span>
                </div>
                <div className="text-[#b9bbbe] text-xs">{upgrade.desc}</div>
                <div className="flex gap-1 mt-1">
                  {Array.from({ length: upgrade.maxLevel }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full ${
                        i < upgrade.level ? "bg-[#5865f2]" : "bg-[#202225]"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <Button
                size="sm"
                onClick={() => buyUpgrade(upgrade.id)}
                disabled={!canAfford || maxed}
                className={`flex-shrink-0 text-xs px-2 py-1 h-auto rounded ${
                  maxed
                    ? "bg-[#3ba55c] text-white cursor-default"
                    : canAfford
                    ? "bg-[#5865f2] hover:bg-[#4752c4] text-white"
                    : "bg-[#40444b] text-[#72767d] cursor-not-allowed"
                }`}
              >
                {maxed ? "МАКС" : `${cost}⭐`}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
