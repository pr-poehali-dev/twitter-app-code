import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const STARS = Array.from({ length: 120 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 2,
}));

const crew = [
  { name: 'Мистер Самир', rank: 'Командир станции', emoji: '👨‍🚀', color: '#a78bfa', bio: 'Легендарный командир, покоривший 14 галактических секторов.' },
  { name: 'Капитан Аврора', rank: 'Пилот-навигатор', emoji: '👩‍🚀', color: '#34d399', bio: 'Мастер гиперпрыжков и звёздных маршрутов.' },
  { name: 'Инженер Зорг', rank: 'Главный механик', emoji: '🤖', color: '#f59e0b', bio: 'Чинит реакторы прямо в открытом космосе.' },
  { name: 'Доктор Нова', rank: 'Медик и учёный', emoji: '🧑‍🔬', color: '#60a5fa', bio: 'Исследует инопланетные формы жизни.' },
];

const games = [
  { title: 'Захват астероидов', genre: 'Аркада', rating: 4.9, players: '128K', icon: '☄️', color: '#f59e0b', desc: 'Уничтожай метеориты и защищай станцию от вторжения.' },
  { title: 'Космическая дуэль', genre: 'PvP', rating: 4.7, players: '89K', icon: '⚡', color: '#a78bfa', desc: 'Сражения один на один в невесомости.' },
  { title: 'Миссия: Туманность', genre: 'Стратегия', rating: 4.8, players: '204K', icon: '🌌', color: '#34d399', desc: 'Строй галактическую империю из ресурсов туманности.' },
  { title: 'Побег с орбиты', genre: 'Выживание', rating: 4.6, players: '67K', icon: '🚀', color: '#60a5fa', desc: 'Спасай экипаж с разрушающейся орбитальной платформы.' },
];

const reviews = [
  { name: 'Алексей К.', avatar: '🧑', stars: 5, text: 'Лучший космический контент на просторах интернета! Самир — настоящий командир!', date: '12 июня' },
  { name: 'Мария В.', avatar: '👩', stars: 5, text: 'Смотрю каждый день. Атмосфера космоса передана идеально, как будто сам там.', date: '8 июня' },
  { name: 'Дмитрий Л.', avatar: '👨', stars: 5, text: 'Экипаж просто огонь! Зорг — мой любимый персонаж. Жду каждую новую серию.', date: '5 июня' },
  { name: 'Саша П.', avatar: '🧒', stars: 4, text: 'Очень круто! Особенно понравилась миссия с туманностью. Больше таких игр!', date: '1 июня' },
  { name: 'Ольга Р.', avatar: '👱‍♀️', stars: 5, text: 'Станция 14 — это шедевр. Нигде больше нет такого погружения в космос.', date: '28 мая' },
  { name: 'Никита Е.', avatar: '👦', stars: 5, text: 'Подсадил всю семью! Теперь вместе смотрим и играем каждый вечер.', date: '24 мая' },
];

const stats = [
  { value: '14', label: 'Сезонов', icon: '🛸' },
  { value: '2.4M', label: 'Игроков', icon: '👾' },
  { value: '312', label: 'Миссий', icon: '🚀' },
  { value: '99%', label: 'Довольных', icon: '⭐' },
];

const Index = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [activeGame, setActiveGame] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden" style={{ fontFamily: "'Exo 2', sans-serif" }}>

      {/* Звёзды */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {STARS.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              opacity: 0.6,
              animation: `twinkle ${s.duration}s ${s.delay}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes twinkle { from { opacity: 0.15; } to { opacity: 0.9; } }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-18px); } }
        @keyframes glow-pulse { 0%,100% { box-shadow: 0 0 20px #a78bfa44; } 50% { box-shadow: 0 0 50px #a78bfa99, 0 0 80px #a78bfa33; } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .float { animation: float 4s ease-in-out infinite; }
        .glow-purple { animation: glow-pulse 2.5s ease-in-out infinite; }
        .su1 { animation: slide-up 0.7s 0.1s ease-out forwards; opacity: 0; }
        .su2 { animation: slide-up 0.7s 0.25s ease-out forwards; opacity: 0; }
        .su3 { animation: slide-up 0.7s 0.4s ease-out forwards; opacity: 0; }
        .su4 { animation: slide-up 0.7s 0.55s ease-out forwards; opacity: 0; }
        .su5 { animation: slide-up 0.7s 0.65s ease-out forwards; opacity: 0; }
        .card-hover { transition: transform 0.3s, box-shadow 0.3s; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(167,139,250,0.2); }
      `}</style>

      {/* НАВИГАЦИЯ */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{
          background: scrollY > 60 ? 'rgba(3,7,18,0.95)' : 'transparent',
          backdropFilter: scrollY > 60 ? 'blur(12px)' : 'none',
          transition: 'all 0.3s',
          borderBottom: scrollY > 60 ? '1px solid rgba(167,139,250,0.15)' : 'none',
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">🛸</span>
          <span className="font-orbitron font-bold text-sm text-[#a78bfa] tracking-widest uppercase">Станция 14</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-400">
          {[['#экипаж', 'Экипаж'], ['#игры', 'Игры'], ['#отзывы', 'Отзывы'], ['#контакт', 'Контакт']].map(([href, label]) => (
            <a key={href} href={href} className="hover:text-[#a78bfa] transition-colors">{label}</a>
          ))}
        </div>
        <button className="px-5 py-2 rounded-full text-sm font-semibold text-white border border-[#a78bfa] hover:bg-[#a78bfa] transition-colors">
          Играть
        </button>
      </nav>

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 z-10">
        <div className="relative mb-6">
          <div className="float text-[110px] leading-none select-none" style={{ filter: 'drop-shadow(0 0 40px #a78bfa88)' }}>🛸</div>
        </div>

        <p className="su1 font-orbitron text-[#a78bfa] text-xs tracking-[0.4em] uppercase mb-4">Сезон 14 · В прямом эфире</p>
        <h1
          className="su2 font-orbitron font-black text-4xl md:text-6xl lg:text-7xl leading-tight mb-6"
          style={{ background: 'linear-gradient(135deg, #fff 30%, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          Мистер Самир<br />играет в<br />
          <span style={{ background: 'linear-gradient(90deg, #a78bfa, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Космическую Станцию
          </span>
        </h1>
        <p className="su3 text-gray-400 text-lg max-w-xl mb-10">
          Погрузись в галактические приключения, командуй экипажем и захвати все 14 секторов вселенной!
        </p>
        <div className="su4 flex flex-wrap gap-4 justify-center">
          <button className="glow-purple px-8 py-4 rounded-full font-bold text-white text-base" style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }}>
            🚀 Начать миссию
          </button>
          <button className="px-8 py-4 rounded-full font-bold text-[#a78bfa] text-base border border-[#a78bfa]/40 hover:border-[#a78bfa] hover:bg-[#a78bfa]/10 transition-all">
            ▶ Смотреть трейлер
          </button>
        </div>

        <div className="su5 grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 w-full max-w-3xl">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl p-5 text-center" style={{ background: 'rgba(167,139,250,0.07)', border: '1px solid rgba(167,139,250,0.15)' }}>
              <div className="text-3xl mb-1">{s.icon}</div>
              <div className="font-orbitron font-bold text-2xl text-white">{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 animate-bounce">
          <Icon name="ChevronDown" size={22} />
        </div>
      </section>

      {/* ЭКИПАЖ */}
      <section id="экипаж" className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-orbitron text-[#a78bfa] text-xs tracking-widest uppercase mb-3">Знакомьтесь</p>
            <h2 className="font-orbitron font-bold text-3xl md:text-5xl text-white">Экипаж Станции</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {crew.map((member, i) => (
              <div key={i} className="card-hover rounded-2xl p-6 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${member.color}33` }}>
                <div className="text-6xl mb-4 float" style={{ animationDelay: `${i * 0.5}s`, filter: `drop-shadow(0 0 20px ${member.color}66)` }}>
                  {member.emoji}
                </div>
                <h3 className="font-orbitron font-bold text-sm text-white mb-1">{member.name}</h3>
                <p className="text-xs font-semibold mb-3" style={{ color: member.color }}>{member.rank}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ИГРЫ */}
      <section id="игры" className="relative z-10 py-24 px-6" style={{ background: 'linear-gradient(180deg, transparent, rgba(167,139,250,0.04), transparent)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-orbitron text-[#a78bfa] text-xs tracking-widest uppercase mb-3">Игровой центр</p>
            <h2 className="font-orbitron font-bold text-3xl md:text-5xl text-white">Миссии и игры</h2>
          </div>

          <div className="rounded-3xl p-8 mb-6 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${games[activeGame].color}44` }}>
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: `radial-gradient(circle at 80% 50%, ${games[activeGame].color}, transparent 60%)` }} />
            <div className="relative flex flex-col md:flex-row items-center gap-8">
              <div className="text-8xl float">{games[activeGame].icon}</div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: games[activeGame].color }}>{games[activeGame].genre}</p>
                <h3 className="font-orbitron font-bold text-3xl text-white mb-3">{games[activeGame].title}</h3>
                <p className="text-gray-400 mb-5">{games[activeGame].desc}</p>
                <div className="flex items-center gap-6 justify-center md:justify-start text-sm text-gray-500">
                  <span>⭐ {games[activeGame].rating}</span>
                  <span>👥 {games[activeGame].players} игроков</span>
                </div>
              </div>
              <button className="px-8 py-3 rounded-full font-bold text-white shrink-0 hover:opacity-90 transition-opacity" style={{ background: games[activeGame].color }}>
                Играть →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {games.map((game, i) => (
              <button
                key={i}
                onClick={() => setActiveGame(i)}
                className="rounded-xl p-4 text-left transition-all hover:scale-105"
                style={{
                  background: activeGame === i ? `${game.color}22` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${activeGame === i ? game.color : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                <div className="text-2xl mb-2">{game.icon}</div>
                <div className="text-sm font-semibold text-white">{game.title}</div>
                <div className="text-xs text-gray-500 mt-1">{game.genre}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ОТЗЫВЫ */}
      <section id="отзывы" className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-orbitron text-[#a78bfa] text-xs tracking-widest uppercase mb-3">Галактическое сообщество</p>
            <h2 className="font-orbitron font-bold text-3xl md:text-5xl text-white">Отзывы игроков</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((r, i) => (
              <div key={i} className="card-hover rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(167,139,250,0.12)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: 'rgba(167,139,250,0.12)' }}>
                    {r.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-white">{r.name}</div>
                    <div className="text-xs text-gray-600">{r.date}</div>
                  </div>
                </div>
                <div className="text-[#f59e0b] text-sm mb-3">{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</div>
                <p className="text-gray-400 text-sm leading-relaxed">"{r.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ОБРАТНАЯ СВЯЗЬ */}
      <section id="контакт" className="relative z-10 py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-orbitron text-[#a78bfa] text-xs tracking-widest uppercase mb-3">Связаться с нами</p>
            <h2 className="font-orbitron font-bold text-3xl md:text-5xl text-white">Обратная связь</h2>
            <p className="text-gray-500 mt-4">Есть идеи? Нашли баг? Хотите в экипаж? Пишите!</p>
          </div>

          {sent ? (
            <div className="rounded-3xl p-12 text-center" style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.3)' }}>
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="font-orbitron font-bold text-xl text-[#34d399] mb-2">Сообщение отправлено!</h3>
              <p className="text-gray-500">Командир Самир ответит вам из открытого космоса в ближайшее время.</p>
              <button onClick={() => setSent(false)} className="mt-6 px-6 py-2 rounded-full text-sm font-semibold text-[#a78bfa] border border-[#a78bfa]/40 hover:bg-[#a78bfa]/10 transition-colors">
                Написать ещё
              </button>
            </div>
          ) : (
            <form onSubmit={handleSend} className="rounded-3xl p-8 space-y-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(167,139,250,0.15)' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Имя</label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ваш позывной"
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Email</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@galaxy.com"
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Сообщение</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Ваш сигнал из глубин космоса..."
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 outline-none resize-none transition-all"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-xl font-bold text-white text-base hover:opacity-90 transition-opacity"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }}
              >
                📡 Отправить сигнал
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ФУТЕР */}
      <footer className="relative z-10 py-10 px-6 text-center" style={{ borderTop: '1px solid rgba(167,139,250,0.1)' }}>
        <div className="text-3xl mb-3">🛸</div>
        <p className="font-orbitron text-[#a78bfa] text-xs tracking-widest uppercase mb-2">Мистер Самир · Космическая Станция 14</p>
        <p className="text-gray-700 text-xs">© 2024 · Все права защищены галактическим законом</p>
      </footer>
    </div>
  );
};

export default Index;
