import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';

type ChatType = 'direct' | 'group';

interface Message {
  id: number;
  fromMe: boolean;
  author: string;
  text: string;
  time: string;
}

interface Chat {
  id: number;
  name: string;
  type: ChatType;
  role: string;
  last: string;
  time: string;
  unread: number;
  online: boolean;
  archived?: boolean;
  members?: number;
  messages: Message[];
}

const chats: Chat[] = [
  {
    id: 1,
    name: 'Анна Соколова',
    type: 'direct',
    role: 'Финансовый директор',
    last: 'Отправила отчёт за квартал, проверьте',
    time: '14:32',
    unread: 2,
    online: true,
    messages: [
      { id: 1, fromMe: false, author: 'Анна Соколова', text: 'Добрый день! Подготовила финансовый отчёт за квартал.', time: '14:28' },
      { id: 2, fromMe: false, author: 'Анна Соколова', text: 'Отправила отчёт за квартал, проверьте, пожалуйста.', time: '14:32' },
      { id: 3, fromMe: true, author: 'Вы', text: 'Спасибо, ознакомлюсь до конца дня.', time: '14:35' },
    ],
  },
  {
    id: 2,
    name: 'Совет директоров',
    type: 'group',
    role: 'Стратегия и развитие',
    last: 'Дмитрий: Совещание переносится на вторник',
    time: '13:10',
    unread: 5,
    online: false,
    members: 8,
    messages: [
      { id: 1, fromMe: false, author: 'Дмитрий Орлов', text: 'Коллеги, совещание переносится на вторник 10:00.', time: '13:10' },
      { id: 2, fromMe: false, author: 'Елена Власова', text: 'Принято, скорректирую расписание.', time: '13:12' },
    ],
  },
  {
    id: 3,
    name: 'Игорь Петров',
    type: 'direct',
    role: 'Руководитель IT',
    last: 'Доступы выданы, проверьте систему',
    time: '11:45',
    unread: 0,
    online: true,
    messages: [
      { id: 1, fromMe: false, author: 'Игорь Петров', text: 'Доступы выданы, проверьте систему.', time: '11:45' },
      { id: 2, fromMe: true, author: 'Вы', text: 'Отлично, всё работает. Благодарю.', time: '11:50' },
    ],
  },
  {
    id: 4,
    name: 'Отдел продаж',
    type: 'group',
    role: 'Региональные менеджеры',
    last: 'Мария: План выполнен на 112%',
    time: 'Вчера',
    unread: 0,
    online: false,
    members: 14,
    messages: [
      { id: 1, fromMe: false, author: 'Мария Кузнецова', text: 'План выполнен на 112%, отличная работа команды!', time: 'Вчера' },
    ],
  },
  {
    id: 5,
    name: 'Сергей Новиков',
    type: 'direct',
    role: 'Юридический отдел',
    last: 'Договор согласован сторонами',
    time: 'Пн',
    unread: 0,
    online: false,
    archived: true,
    messages: [
      { id: 1, fromMe: false, author: 'Сергей Новиков', text: 'Договор согласован сторонами, архивирую.', time: 'Пн' },
    ],
  },
];

const navItems = [
  { id: 'chats', icon: 'MessageSquare', label: 'Сообщения' },
  { id: 'contacts', icon: 'Users', label: 'Справочник' },
  { id: 'archive', icon: 'Archive', label: 'Архив' },
  { id: 'security', icon: 'ShieldCheck', label: 'Безопасность' },
  { id: 'profile', icon: 'User', label: 'Кабинет' },
];

const AVATAR_COLORS = [
  'bg-[#d9796a]', 'bg-[#7986cb]', 'bg-[#4db6ac]',
  'bg-[#f06292]', 'bg-[#aed581]', 'bg-[#ffa726]',
];

const avatarColor = (name: string) =>
  AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

const initials = (name: string) =>
  name.split(' ').map((w) => w[0]).slice(0, 2).join('');

const Index = () => {
  const [activeNav, setActiveNav] = useState('chats');
  const [chatList, setChatList] = useState<Chat[]>(chats);
  const [activeChatId, setActiveChatId] = useState<number>(chats[0].id);
  const [filter, setFilter] = useState<'all' | 'direct' | 'group'>('all');
  const [search, setSearch] = useState('');
  const [draft, setDraft] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = chatList.find((c) => c.id === activeChatId) || chatList[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat.messages]);

  const nowTime = () =>
    new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;
    const time = nowTime();
    setChatList((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? { ...c, last: text, time, messages: [...c.messages, { id: Date.now(), fromMe: true, author: 'Вы', text, time }] }
          : c,
      ),
    );
    setDraft('');
  };

  const visibleChats = chatList
    .filter((c) => (activeNav === 'archive' ? c.archived : !c.archived))
    .filter((c) => (filter === 'all' ? true : c.type === filter))
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex h-screen text-foreground font-sans overflow-hidden" style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* Боковая иконочная навигация */}
      <aside className="w-[60px] bg-[#202c33] flex flex-col items-center py-4 gap-1 shrink-0">
        <div className="w-9 h-9 rounded-full bg-[#00a884] flex items-center justify-center mb-5">
          <Icon name="MessageCircle" size={20} className="text-white" />
        </div>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveNav(item.id)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              activeNav === item.id ? 'text-[#00a884]' : 'text-[#8696a0] hover:text-[#d1d7db]'
            }`}
            title={item.label}
          >
            <Icon name={item.icon} size={22} />
          </button>
        ))}
        <div className="mt-auto">
          <div className="w-9 h-9 rounded-full bg-[#00a884] flex items-center justify-center text-white text-xs font-bold">
            ВЫ
          </div>
        </div>
      </aside>

      {/* Список чатов */}
      <section className="w-[360px] flex flex-col shrink-0" style={{ background: '#111b21' }}>
        {/* Шапка */}
        <header className="px-4 pt-4 pb-2" style={{ background: '#202c33' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[#e9edef] font-semibold text-base">
              {navItems.find((n) => n.id === activeNav)?.label}
            </span>
            <div className="flex gap-1">
              <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#8696a0] hover:text-[#d1d7db] hover:bg-white/10 transition-colors">
                <Icon name="Plus" size={20} />
              </button>
              <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#8696a0] hover:text-[#d1d7db] hover:bg-white/10 transition-colors">
                <Icon name="MoreVertical" size={20} />
              </button>
            </div>
          </div>
          {/* Поиск */}
          <div className="relative mb-3">
            <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8696a0]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск или новый чат"
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg text-[#d1d7db] placeholder-[#8696a0] outline-none"
              style={{ background: '#2a3942' }}
            />
          </div>
          {/* Фильтры */}
          <div className="flex gap-1">
            {([['all', 'Все'], ['direct', 'Личные'], ['group', 'Группы']] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                  filter === key
                    ? 'bg-[#00a884] text-white'
                    : 'text-[#8696a0] hover:bg-white/10'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </header>

        {/* Чаты */}
        <div className="flex-1 overflow-y-auto">
          {visibleChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setActiveChatId(chat.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-white/5 ${
                activeChatId === chat.id ? 'bg-[#2a3942]' : 'hover:bg-[#202c33]'
              }`}
            >
              <div className="relative shrink-0">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-semibold ${avatarColor(chat.name)}`}>
                  {chat.type === 'group' ? <Icon name="Users" size={20} /> : initials(chat.name)}
                </div>
                {chat.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#00a884] border-2 border-[#111b21]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[#e9edef] font-medium text-sm truncate">{chat.name}</span>
                  <span className={`text-[11px] shrink-0 ${chat.unread > 0 ? 'text-[#00a884]' : 'text-[#8696a0]'}`}>{chat.time}</span>
                </div>
                <div className="flex items-center justify-between gap-2 mt-0.5">
                  <span className="text-xs text-[#8696a0] truncate">{chat.last}</span>
                  {chat.unread > 0 && (
                    <span className="shrink-0 min-w-[20px] h-5 px-1.5 rounded-full bg-[#00a884] text-white text-[11px] font-semibold flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
          {visibleChats.length === 0 && (
            <div className="p-8 text-center text-sm text-[#8696a0]">Ничего не найдено</div>
          )}
        </div>
      </section>

      {/* Область переписки */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Шапка чата */}
        <header className="h-[60px] px-4 flex items-center justify-between shrink-0" style={{ background: '#202c33' }}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0 ${avatarColor(activeChat.name)}`}>
              {activeChat.type === 'group' ? <Icon name="Users" size={18} /> : initials(activeChat.name)}
            </div>
            <div>
              <div className="text-[#e9edef] font-medium text-sm">{activeChat.name}</div>
              <div className="text-[11px] text-[#8696a0]">
                {activeChat.type === 'group'
                  ? `${activeChat.members} участников`
                  : activeChat.online ? 'В сети' : activeChat.role}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {['Search', 'Phone', 'MoreVertical'].map((ic) => (
              <button key={ic} className="w-9 h-9 rounded-full flex items-center justify-center text-[#8696a0] hover:text-[#d1d7db] hover:bg-white/10 transition-colors">
                <Icon name={ic} size={20} />
              </button>
            ))}
          </div>
        </header>

        {/* Сообщения — паттерн фона как у WhatsApp */}
        <div
          className="flex-1 overflow-y-auto px-6 py-4 space-y-1"
          style={{
            background: '#0b141a',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23182229' fill-opacity='0.8'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        >
          {/* Метка шифрования */}
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[11px] text-[#8696a0]" style={{ background: '#182229' }}>
              <Icon name="Lock" size={12} className="text-[#8696a0]" />
              Сообщения защищены сквозным шифрованием
            </div>
          </div>

          {activeChat.messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.fromMe ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              <div
                className={`relative max-w-[65%] px-3 pt-2 pb-1.5 rounded-lg text-sm leading-relaxed shadow-sm`}
                style={{
                  background: msg.fromMe ? '#005c4b' : '#202c33',
                  borderRadius: msg.fromMe ? '8px 8px 2px 8px' : '8px 8px 8px 2px',
                }}
              >
                {activeChat.type === 'group' && !msg.fromMe && (
                  <div className="text-[12px] font-semibold mb-1" style={{ color: '#00a884' }}>{msg.author}</div>
                )}
                <span className="text-[#e9edef]">{msg.text}</span>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[10px] text-[#8696a0]">{msg.time}</span>
                  {msg.fromMe && <Icon name="CheckCheck" size={14} className="text-[#53bdeb]" />}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Поле ввода */}
        <footer className="px-4 py-3 flex items-center gap-3 shrink-0" style={{ background: '#202c33' }}>
          <button className="text-[#8696a0] hover:text-[#d1d7db] transition-colors">
            <Icon name="Smile" size={24} />
          </button>
          <button className="text-[#8696a0] hover:text-[#d1d7db] transition-colors">
            <Icon name="Paperclip" size={24} />
          </button>
          <div className="flex-1 relative">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
              }}
              placeholder="Введите сообщение"
              className="w-full px-4 py-2.5 rounded-lg text-sm text-[#e9edef] placeholder-[#8696a0] outline-none"
              style={{ background: '#2a3942' }}
            />
          </div>
          <button
            onClick={sendMessage}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-colors shrink-0"
            style={{ background: draft.trim() ? '#00a884' : '#2a3942' }}
          >
            <Icon name={draft.trim() ? 'Send' : 'Mic'} size={20} className="text-white" />
          </button>
        </footer>
      </main>
    </div>
  );
};

export default Index;
