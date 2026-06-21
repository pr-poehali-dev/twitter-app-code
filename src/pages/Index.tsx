import { useState } from 'react';
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

const Index = () => {
  const [activeNav, setActiveNav] = useState('chats');
  const [activeChat, setActiveChat] = useState<Chat>(chats[0]);
  const [filter, setFilter] = useState<'all' | 'direct' | 'group'>('all');
  const [search, setSearch] = useState('');

  const visibleChats = chats
    .filter((c) => (activeNav === 'archive' ? c.archived : !c.archived))
    .filter((c) => (filter === 'all' ? true : c.type === filter))
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  const initials = (name: string) =>
    name.split(' ').map((w) => w[0]).slice(0, 2).join('');

  return (
    <div className="flex h-screen bg-background text-foreground font-sans overflow-hidden">
      {/* Левая навигация */}
      <aside className="w-[68px] bg-primary flex flex-col items-center py-6 gap-2 shrink-0">
        <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-6">
          <Icon name="Lock" size={20} className="text-white" />
        </div>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveNav(item.id)}
            className={`w-11 h-11 rounded-lg flex items-center justify-center transition-colors ${
              activeNav === item.id
                ? 'bg-white/15 text-white'
                : 'text-white/50 hover:text-white hover:bg-white/10'
            }`}
            title={item.label}
          >
            <Icon name={item.icon} size={20} />
          </button>
        ))}
        <div className="mt-auto">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white text-sm font-semibold">
            ВЫ
          </div>
        </div>
      </aside>

      {/* Список чатов */}
      <section className="w-[340px] border-r border-border flex flex-col bg-card shrink-0">
        <header className="px-5 pt-6 pb-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-semibold tracking-tight">
              {navItems.find((n) => n.id === activeNav)?.label}
            </h1>
            <button className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="Plus" size={18} />
            </button>
          </div>
          <div className="relative">
            <Icon
              name="Search"
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по сообщениям и контактам"
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-secondary border border-transparent focus:border-accent focus:bg-card outline-none transition-colors"
            />
          </div>
          <div className="flex gap-1 mt-4">
            {([
              ['all', 'Все'],
              ['direct', 'Личные'],
              ['group', 'Группы'],
            ] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  filter === key
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-secondary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          {visibleChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`w-full flex items-center gap-3 px-5 py-3.5 text-left border-b border-border/60 transition-colors ${
                activeChat.id === chat.id ? 'bg-secondary' : 'hover:bg-secondary/50'
              }`}
            >
              <div className="relative shrink-0">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-semibold ${
                    chat.type === 'group'
                      ? 'bg-accent/10 text-accent'
                      : 'bg-primary/10 text-primary'
                  }`}
                >
                  {chat.type === 'group' ? <Icon name="Users" size={18} /> : initials(chat.name)}
                </div>
                {chat.online && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-card" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-sm truncate">{chat.name}</span>
                  <span className="text-[11px] text-muted-foreground shrink-0">{chat.time}</span>
                </div>
                <div className="flex items-center justify-between gap-2 mt-0.5">
                  <span className="text-xs text-muted-foreground truncate">{chat.last}</span>
                  {chat.unread > 0 && (
                    <span className="shrink-0 min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-white text-[10px] font-semibold flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
          {visibleChats.length === 0 && (
            <div className="p-8 text-center text-sm text-muted-foreground">Ничего не найдено</div>
          )}
        </div>
      </section>

      {/* Окно переписки */}
      <main className="flex-1 flex flex-col bg-background min-w-0">
        <header className="h-[73px] px-6 flex items-center justify-between border-b border-border bg-card shrink-0">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold ${
                activeChat.type === 'group' ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'
              }`}
            >
              {activeChat.type === 'group' ? <Icon name="Users" size={18} /> : initials(activeChat.name)}
            </div>
            <div>
              <div className="font-semibold text-sm">{activeChat.name}</div>
              <div className="text-xs text-muted-foreground">
                {activeChat.type === 'group'
                  ? `${activeChat.members} участников`
                  : activeChat.online
                  ? 'В сети'
                  : activeChat.role}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {['Phone', 'Video', 'Search', 'MoreVertical'].map((ic) => (
              <button
                key={ic}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                <Icon name={ic} size={18} />
              </button>
            ))}
          </div>
        </header>

        {/* Баннер шифрования */}
        <div className="px-6 py-2 bg-accent/5 border-b border-border flex items-center justify-center gap-2">
          <Icon name="ShieldCheck" size={14} className="text-accent" />
          <span className="text-xs text-muted-foreground">
            Сообщения защищены сквозным шифрованием
          </span>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          {activeChat.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col animate-fade-in ${msg.fromMe ? 'items-end' : 'items-start'}`}
            >
              {activeChat.type === 'group' && !msg.fromMe && (
                <span className="text-[11px] text-accent font-medium mb-1 ml-1">{msg.author}</span>
              )}
              <div
                className={`max-w-[60%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.fromMe
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-card border border-border rounded-bl-md'
                }`}
              >
                {msg.text}
              </div>
              <div className="flex items-center gap-1 mt-1 px-1">
                <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                {msg.fromMe && <Icon name="CheckCheck" size={12} className="text-accent" />}
              </div>
            </div>
          ))}
        </div>

        {/* Поле ввода */}
        <footer className="px-6 py-4 border-t border-border bg-card shrink-0">
          <div className="flex items-center gap-2 bg-secondary rounded-xl px-3 py-2">
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="Paperclip" size={20} />
            </button>
            <input
              placeholder="Введите сообщение…"
              className="flex-1 bg-transparent outline-none text-sm py-1"
            />
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="Smile" size={20} />
            </button>
            <button className="w-9 h-9 rounded-lg bg-accent text-white flex items-center justify-center hover:opacity-90 transition-opacity">
              <Icon name="Send" size={18} />
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
