import { useState, useEffect } from "react";
import {
  Trophy,
  Zap,
  Star,
  Clock,
  Users,
  Mic,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Hash,
  ArrowRight,
  MousePointerClick,
  Flame,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [floats, setFloats] = useState<{ id: number; x: number; y: number }[]>([]);
  const [combo, setCombo] = useState(0);
  const [lastClick, setLastClick] = useState(0);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const now = Date.now();
    const newCombo = now - lastClick < 1000 ? combo + 1 : 1;
    setCombo(newCombo);
    setLastClick(now);

    const points = 1 + Math.floor(newCombo / 5);
    setScore((s) => s + points);
    setClicks((c) => c + 1);

    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    const x = e.clientX - rect.left + (Math.random() * 40 - 20);
    const y = e.clientY - rect.top - 10;
    setFloats((f) => [...f, { id, x, y }]);
    setTimeout(() => setFloats((f) => f.filter((fl) => fl.id !== id)), 800);
  };

  useEffect(() => {
    if (combo > 0) {
      const timer = setTimeout(() => setCombo(0), 1500);
      return () => clearTimeout(timer);
    }
  }, [combo, lastClick]);

  const level = Math.floor(score / 100) + 1;
  const progressToNext = score % 100;

  return (
    <div className="min-h-screen bg-[#36393f] text-white overflow-x-hidden">
      {/* Навигация в стиле Discord */}
      <nav className="bg-[#2f3136] border-b border-[#202225] px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#5865f2] rounded-full flex items-center justify-center">
              <MousePointerClick className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white">КликМастер</h1>
              <p className="text-xs text-[#b9bbbe] hidden sm:block">Кликай. Зарабатывай. Побеждай.</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <Button variant="ghost" className="text-[#b9bbbe] hover:text-white hover:bg-[#40444b]">
              <Trophy className="w-4 h-4 mr-2" />
              Рейтинг
            </Button>
            <Button className="bg-[#5865f2] hover:bg-[#4752c4] text-white px-6 py-2 rounded text-sm font-medium">
              Играть
            </Button>
          </div>
          <Button
            variant="ghost"
            className="sm:hidden text-[#b9bbbe] hover:text-white hover:bg-[#40444b] p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="sm:hidden mt-4 pt-4 border-t border-[#202225]">
            <div className="flex flex-col gap-3">
              <Button variant="ghost" className="text-[#b9bbbe] hover:text-white hover:bg-[#40444b] justify-start">
                <Trophy className="w-4 h-4 mr-2" />
                Рейтинг
              </Button>
              <Button className="bg-[#5865f2] hover:bg-[#4752c4] text-white px-6 py-2 rounded text-sm font-medium">
                Играть
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Макет в стиле Discord */}
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

        {/* Основной контент */}
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Боковая панель каналов */}
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
            {/* Область пользователя */}
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

          {/* Область чата */}
          <div className="flex-1 flex flex-col">
            {/* Заголовок чата */}
            <div className="h-12 bg-[#36393f] border-b border-[#202225] flex items-center px-4 gap-2">
              <Button
                variant="ghost"
                className="lg:hidden text-[#8e9297] hover:text-[#dcddde] hover:bg-[#40444b] p-1 mr-2"
                onClick={() => setMobileSidebarOpen(true)}
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

                  {/* Демо кликера */}
                  <div className="bg-[#2f3136] border border-[#202225] rounded-lg overflow-hidden w-full max-w-sm">
                    {/* Шапка с градиентом */}
                    <div className="h-16 sm:h-20 bg-gradient-to-r from-[#5865f2] to-[#7c3aed] relative flex items-center justify-center">
                      <span className="text-white text-2xl font-black tracking-widest drop-shadow">КликМастер</span>
                    </div>

                    {/* Статистика */}
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
                          <div className={`text-xs font-semibold uppercase mb-1 ${combo >= 5 ? "text-[#ed4245]" : "text-[#3ba55c]"}`}>Комбо</div>
                          <div className="text-white font-bold text-lg">x{Math.max(1, Math.floor(combo / 5) + 1)}</div>
                        </div>
                      </div>

                      {/* Прогресс до следующего уровня */}
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

                      {/* Кнопка кликера */}
                      <div className="relative flex justify-center">
                        <button
                          onClick={handleClick}
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

                        {/* Плавающие очки */}
                        {floats.map((f) => (
                          <div
                            key={f.id}
                            className="absolute pointer-events-none text-[#faa61a] font-bold text-sm animate-bounce"
                            style={{
                              left: f.x,
                              top: f.y,
                              animation: "floatUp 0.8s ease-out forwards",
                            }}
                          >
                            +{1 + Math.floor(combo / 5)}
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 text-center text-[#b9bbbe] text-xs">
                        Всего кликов: <span className="text-white font-semibold">{clicks}</span>
                      </div>
                    </div>
                  </div>
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
