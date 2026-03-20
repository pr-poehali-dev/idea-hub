import { useState, useEffect, useRef } from "react";

export interface Upgrade {
  id: string;
  name: string;
  desc: string;
  emoji: string;
  baseCost: number;
  level: number;
  maxLevel: number;
  effect: string;
}

export interface GameState {
  score: number;
  totalScore: number;
  clicks: number;
  upgrades: Record<string, number>;
}

const INITIAL_UPGRADES: Upgrade[] = [
  {
    id: "power",
    name: "Сила клика",
    desc: "+1 очко за клик",
    emoji: "👊",
    baseCost: 50,
    level: 0,
    maxLevel: 10,
    effect: "power",
  },
  {
    id: "combo_speed",
    name: "Скорость комбо",
    desc: "Комбо держится дольше",
    emoji: "⚡",
    baseCost: 100,
    level: 0,
    maxLevel: 5,
    effect: "combo_speed",
  },
  {
    id: "combo_power",
    name: "Сила комбо",
    desc: "Комбо множитель растёт быстрее",
    emoji: "🔥",
    baseCost: 150,
    level: 0,
    maxLevel: 5,
    effect: "combo_power",
  },
  {
    id: "autoclicker",
    name: "Автокликер",
    desc: "+1 очко в секунду",
    emoji: "🤖",
    baseCost: 200,
    level: 0,
    maxLevel: 5,
    effect: "autoclicker",
  },
  {
    id: "multiplier",
    name: "Множитель очков",
    desc: "x1.5 ко всем очкам за уровень",
    emoji: "✨",
    baseCost: 500,
    level: 0,
    maxLevel: 5,
    effect: "multiplier",
  },
];

const SAVE_KEY = "clickmaster_save";

const getUpgradeCost = (upgrade: Upgrade, level: number) =>
  Math.floor(upgrade.baseCost * Math.pow(1.8, level));

const loadSave = (): GameState => {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("load save error", e);
  }
  return { score: 0, totalScore: 0, clicks: 0, upgrades: {} };
};

const saveToBrowser = (state: GameState) => {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("save error", e);
  }
};

export const useGameState = () => {
  const saved = loadSave();

  const [score, setScore] = useState(saved.score);
  const [totalScore, setTotalScore] = useState(saved.totalScore);
  const [clicks, setClicks] = useState(saved.clicks);
  const [upgradeLevels, setUpgradeLevels] = useState<Record<string, number>>(saved.upgrades || {});
  const [floats, setFloats] = useState<{ id: number; x: number; y: number; points: number }[]>([]);
  const [combo, setCombo] = useState(0);
  const lastClickRef = useRef(0);

  const upgrades: Upgrade[] = INITIAL_UPGRADES.map((u) => ({
    ...u,
    level: upgradeLevels[u.id] ?? 0,
  }));

  const clickPower = 1 + (upgradeLevels["power"] ?? 0);
  const comboWindow = 1000 + (upgradeLevels["combo_speed"] ?? 0) * 300;
  const comboStep = 5 - Math.min(4, upgradeLevels["combo_power"] ?? 0);
  const autoPerSec = (upgradeLevels["autoclicker"] ?? 0);
  const globalMultiplier = Math.pow(1.5, upgradeLevels["multiplier"] ?? 0);

  // Автокликер
  useEffect(() => {
    if (autoPerSec === 0) return;
    const interval = setInterval(() => {
      const pts = Math.round(autoPerSec * globalMultiplier);
      setScore((s) => s + pts);
      setTotalScore((t) => t + pts);
    }, 1000);
    return () => clearInterval(interval);
  }, [autoPerSec, globalMultiplier]);

  // Автосохранение каждые 5 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      saveToBrowser({ score, totalScore, clicks, upgrades: upgradeLevels });
    }, 5000);
    return () => clearInterval(interval);
  }, [score, totalScore, clicks, upgradeLevels]);

  // Сброс комбо по таймауту
  useEffect(() => {
    if (combo > 0) {
      const timer = setTimeout(() => setCombo(0), comboWindow);
      return () => clearTimeout(timer);
    }
  }, [combo, comboWindow]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const now = Date.now();
    const newCombo = now - lastClickRef.current < comboWindow ? combo + 1 : 1;
    setCombo(newCombo);
    lastClickRef.current = now;

    const comboMultiplier = 1 + Math.floor(newCombo / comboStep);
    const points = Math.round(clickPower * comboMultiplier * globalMultiplier);

    setScore((s) => s + points);
    setTotalScore((t) => t + points);
    setClicks((c) => c + 1);

    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    const x = e.clientX - rect.left + (Math.random() * 40 - 20);
    const y = e.clientY - rect.top - 10;
    setFloats((f) => [...f, { id, x, y, points }]);
    setTimeout(() => setFloats((f) => f.filter((fl) => fl.id !== id)), 800);
  };

  const buyUpgrade = (id: string) => {
    const upgrade = upgrades.find((u) => u.id === id);
    if (!upgrade) return;
    const currentLevel = upgradeLevels[id] ?? 0;
    if (currentLevel >= upgrade.maxLevel) return;
    const cost = getUpgradeCost(upgrade, currentLevel);
    if (score < cost) return;

    setScore((s) => s - cost);
    setUpgradeLevels((prev) => {
      const next = { ...prev, [id]: (prev[id] ?? 0) + 1 };
      saveToBrowser({ score: score - cost, totalScore, clicks, upgrades: next });
      return next;
    });
  };

  const level = Math.floor(totalScore / 100) + 1;
  const progressToNext = totalScore % 100;
  const comboMultiplier = Math.max(1, 1 + Math.floor(combo / comboStep));

  const adminSetScore = (v: number) => {
    setScore(v);
    saveToBrowser({ score: v, totalScore, clicks, upgrades: upgradeLevels });
  };

  const adminSetTotalScore = (v: number) => {
    setTotalScore(v);
    saveToBrowser({ score, totalScore: v, clicks, upgrades: upgradeLevels });
  };

  const adminSetClicks = (v: number) => {
    setClicks(v);
    saveToBrowser({ score, totalScore, clicks: v, upgrades: upgradeLevels });
  };

  const adminSetUpgradeLevel = (id: string, level: number) => {
    setUpgradeLevels((prev) => {
      const next = { ...prev, [id]: level };
      saveToBrowser({ score, totalScore, clicks, upgrades: next });
      return next;
    });
  };

  const adminMaxAllUpgrades = () => {
    const next: Record<string, number> = {};
    INITIAL_UPGRADES.forEach((u) => { next[u.id] = u.maxLevel; });
    setUpgradeLevels(next);
    saveToBrowser({ score, totalScore, clicks, upgrades: next });
  };

  const adminResetAll = () => {
    setScore(0);
    setTotalScore(0);
    setClicks(0);
    setUpgradeLevels({});
    setCombo(0);
    saveToBrowser({ score: 0, totalScore: 0, clicks: 0, upgrades: {} });
  };

  const adminSaveNow = () => {
    saveToBrowser({ score, totalScore, clicks, upgrades: upgradeLevels });
  };

  return {
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
    globalMultiplier,
    handleClick,
    buyUpgrade,
    getUpgradeCost: (id: string) => {
      const u = upgrades.find((up) => up.id === id);
      if (!u) return 0;
      return getUpgradeCost(u, u.level);
    },
    adminSetScore,
    adminSetTotalScore,
    adminSetClicks,
    adminSetUpgradeLevel,
    adminMaxAllUpgrades,
    adminResetAll,
    adminSaveNow,
  };
};