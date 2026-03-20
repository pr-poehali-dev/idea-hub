import {
  Trophy,
  Zap,
  Star,
  Clock,
  Users,
  Bell,
  Search,
  Menu,
  Hash,
  MousePointerClick,
  Flame,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ClickerGame from "@/components/ClickerGame";
import type { Upgrade } from "@/hooks/useGameState";

interface ChatAreaProps {
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
  onClickerClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onOpenSidebar: () => void;
  buyUpgrade: (id: string) => void;
  getUpgradeCost: (id: string) => number;
}

const ChatArea = ({
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
  onClickerClick,
  onOpenSidebar,
  buyUpgrade,
  getUpgradeCost,
}: ChatAreaProps) => {
  return (
    <div className="flex-1 flex flex-col">
      {/* Заголовок чата */}
      <div className="h-12 bg-[#36393f] border-b border-[#202225] flex items-center px-4 gap-2">
        <Button
          variant="ghost"
          className="lg:hidden text-[#8e9297] hover:text-[#dcddde] hover:bg-[#40444b] p-1 mr-2"
          onClick={onOpenSidebar}
        >
          <Menu className="w-5 h-5" />
        </Button>
        <Hash className="w-5 h-5 text-[#8e9297]" />
        <span className="text-white font-semibold">рекорды</span>
        <div className="w-px h-6 bg-[#40444b] mx-2 hidden sm:block"></div>
        <span className="text-[#8e9297] text-sm hidden sm:block">Кликай и зарабатывай очки!</span>
        <div className="ml-auto flex items-center gap-2 sm:gap-4">
          <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-[#b9bbbe] cursor-pointer hover:text-[#dcddde]" />
          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#b9bbbe] cursor-pointer hover:text-[#dcddde]" />
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#b9bbbe] cursor-pointer hover:text-[#dcddde]" />
        </div>
      </div>

      {/* Сообщения чата */}
      <div className="flex-1 p-2 sm:p-4 space-y-4 sm:space-y-6 overflow-y-auto">

        {/* Приветственное сообщение бота */}
        <div className="flex gap-2 sm:gap-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#5865f2] rounded-full flex items-center justify-center flex-shrink-0">
            <MousePointerClick className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-white font-medium text-sm sm:text-base">КликБот</span>
              <span className="bg-[#5865f2] text-white text-xs px-1 rounded">БОТ</span>
              <span className="text-[#72767d] text-xs hidden sm:inline">Сегодня в 12:00</span>
            </div>
            <div className="text-[#dcddde] text-sm sm:text-base">
              <p className="mb-3 sm:mb-4">
                <strong>Добро пожаловать в КликМастер!</strong> Нажимай кнопку, зарабатывай очки, получай уровни и бери комбо!
              </p>
              <div className="bg-[#2f3136] border-l-4 border-[#5865f2] p-3 sm:p-4 rounded">
                <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">Как работает игра:</h3>
                <ul className="space-y-1 text-xs sm:text-sm text-[#b9bbbe]">
                  <li>⚡ Кликай по кнопке и зарабатывай очки</li>
                  <li>🔥 Быстрые клики дают комбо-множитель</li>
                  <li>🏆 За каждые 100 очков — новый уровень</li>
                  <li>🎯 Чем выше комбо, тем больше очков за клик</li>
                  <li>👑 Соревнуйся с другими игроками в рейтинге</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Интерактивный кликер */}
        <div className="flex gap-2 sm:gap-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs sm:text-sm font-medium">Я</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-white font-medium text-sm sm:text-base">Ты</span>
              <span className="text-[#72767d] text-xs hidden sm:inline">Сегодня в 12:05</span>
            </div>
            <div className="text-[#dcddde] mb-3 text-sm sm:text-base">
              Попробую сыграть прямо здесь!
            </div>
            <ClickerGame
              score={score}
              clicks={clicks}
              combo={combo}
              comboMultiplier={comboMultiplier}
              level={level}
              progressToNext={progressToNext}
              clickPower={clickPower}
              autoPerSec={autoPerSec}
              globalMultiplier={globalMultiplier}
              floats={floats}
              upgrades={upgrades}
              onClick={onClickerClick}
              buyUpgrade={buyUpgrade}
              getUpgradeCost={getUpgradeCost}
            />
          </div>
        </div>

        {/* Сообщение из чата */}
        <div className="flex gap-2 sm:gap-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs sm:text-sm font-medium">П</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-white font-medium text-sm sm:text-base">Профи_Кликер</span>
              <span className="text-[#72767d] text-xs hidden sm:inline">Сегодня в 12:08</span>
            </div>
            <div className="text-[#dcddde] text-sm sm:text-base">
              Дошёл до 1000 очков за 2 минуты! Кто побьёт мой рекорд? 🏆
            </div>
          </div>
        </div>

        {/* Секция "Начало работы" */}
        <div className="bg-[#2f3136] border border-[#202225] rounded-lg p-4 sm:p-6 mt-6 sm:mt-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-[#faa61a]" />
            Как стать КликМастером
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#5865f2] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-sm sm:text-base">1</span>
              </div>
              <h3 className="text-white font-medium mb-2 text-sm sm:text-base">Начни кликать</h3>
              <p className="text-[#b9bbbe] text-xs sm:text-sm">Нажимай на кнопку и зарабатывай первые очки</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#5865f2] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-sm sm:text-base">2</span>
              </div>
              <h3 className="text-white font-medium mb-2 text-sm sm:text-base">Набери комбо</h3>
              <p className="text-[#b9bbbe] text-xs sm:text-sm">Быстрые клики дают множитель до x10 и выше!</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#5865f2] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-sm sm:text-base">3</span>
              </div>
              <h3 className="text-white font-medium mb-2 text-sm sm:text-base">Бери топ</h3>
              <p className="text-[#b9bbbe] text-xs sm:text-sm">Соревнуйся с игроками со всего мира</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-[#5865f2] hover:bg-[#4752c4] text-white px-6 sm:px-8 py-2 sm:py-3 rounded text-sm font-medium">
              <MousePointerClick className="w-4 h-4 mr-2" />
              Играть бесплатно
            </Button>
            <Button
              variant="outline"
              className="border-[#4f545c] text-[#b9bbbe] hover:bg-[#40444b] hover:border-[#6d6f78] px-6 sm:px-8 py-2 sm:py-3 rounded text-sm font-medium bg-transparent"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Смотреть рейтинг
            </Button>
          </div>
        </div>

        {/* Преимущества */}
        <div className="bg-[#2f3136] border border-[#202225] rounded-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Почему КликМастер?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              {
                icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" />,
                title: "Комбо-система",
                desc: "Чем быстрее кликаешь — тем больше очков за каждый клик",
              },
              {
                icon: <Star className="w-4 h-4 sm:w-5 sm:h-5" />,
                title: "Прокачка уровней",
                desc: "100+ уровней с наградами и разблокируемым контентом",
              },
              {
                icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />,
                title: "Ежедневные задания",
                desc: "Новые вызовы каждый день — скучно не будет",
              },
              {
                icon: <Flame className="w-4 h-4 sm:w-5 sm:h-5" />,
                title: "Живой рейтинг",
                desc: "Таблица рекордов обновляется в реальном времени",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded hover:bg-[#36393f] transition-colors"
              >
                <div className="text-[#5865f2] mt-0.5">{feature.icon}</div>
                <div>
                  <div className="text-white font-medium text-xs sm:text-sm">{feature.title}</div>
                  <div className="text-[#b9bbbe] text-xs sm:text-sm">{feature.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Поле ввода сообщения */}
      <div className="p-2 sm:p-4">
        <div className="bg-[#40444b] rounded-lg px-3 sm:px-4 py-2 sm:py-3">
          <div className="text-[#72767d] text-xs sm:text-sm">Сообщение #рекорды</div>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;