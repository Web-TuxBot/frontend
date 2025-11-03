import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Анимированный пингвин из Header.jsx
const PenguinAI = ({ className = "" }) => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className={`flex-shrink-0 drop-shadow-2xl ${className}`}>
    {/* Анимированный градиентный фон */}
    <circle cx="50" cy="50" r="50" fill="url(#sphereGradient)">
      <animate attributeName="r" values="50;48;50;52;50" dur="4s" repeatCount="indefinite"/>
    </circle>
    
    {/* Вращающиеся кольца */}
    <g transform="rotate(0 50 50)">
      <circle cx="50" cy="50" r="45" fill="none" stroke="url(#ringGradient)" strokeWidth="2" strokeDasharray="4 4">
        <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="8s" repeatCount="indefinite"/>
      </circle>
    </g>
    
    {/* Тело пингвина */}
    <ellipse cx="50" cy="62" rx="24" ry="18" fill="#2D3748" stroke="#4A5568" strokeWidth="2"/>
    <ellipse cx="50" cy="56" rx="20" ry="14" fill="white"/>
    
    {/* Голова */}
    <circle cx="50" cy="35" r="16" fill="#2D3748" stroke="#4A5568" strokeWidth="2"/>
    <circle cx="50" cy="35" r="13" fill="white"/>
    
    {/* Белый живот с градиентом */}
    <path d="M32 50 Q50 68 68 50 L68 72 Q50 78 32 72 Z" fill="url(#bellyGradient)"/>
    
    {/* Глазы с анимацией */}
    <g className="animate-pulse">
      <circle cx="43" cy="33" r="3.5" fill="#1A202C">
        <animate attributeName="r" values="3.5;4;3.5" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="57" cy="33" r="3.5" fill="#1A202C">
        <animate attributeName="r" values="3.5;4;3.5" dur="2s" repeatCount="indefinite" begin="0.5s"/>
      </circle>
      
      {/* Блики в глазах */}
      <circle cx="44" cy="32" r="1.2" fill="white"/>
      <circle cx="58" cy="32" r="1.2" fill="white"/>
    </g>
    
    {/* Оранжевый клюв с свечением */}
    <path d="M45 40L55 40L50 45Z" fill="url(#beakGradient)" filter="url(#beakGlow)"/>
    
    {/* Оранжевые лапы с текстурой */}
    <ellipse cx="40" cy="72" rx="4" ry="2.5" fill="url(#feetGradient)"/>
    <ellipse cx="60" cy="72" rx="4" ry="2.5" fill="url(#feetGradient)"/>
    
    {/* Стильные акценты - пульсирующие нейросети */}
    <g stroke="url(#neuralGradient)" strokeWidth="2.5" fill="none" opacity="0.9">
      <path d="M40 25C35 18 40 14 45 17" strokeLinecap="round">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="1.8s" repeatCount="indefinite"/>
        <animate attributeName="stroke-width" values="2.5;3.5;2.5" dur="1.8s" repeatCount="indefinite"/>
      </path>
      <path d="M50 22C50 17 55 17 55 22" strokeLinecap="round">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="1.8s" repeatCount="indefinite" begin="0.2s"/>
        <animate attributeName="stroke-width" values="2.5;3.5;2.5" dur="1.8s" repeatCount="indefinite" begin="0.2s"/>
      </path>
      <path d="M60 25C65 18 60 14 55 17" strokeLinecap="round">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="1.8s" repeatCount="indefinite" begin="0.4s"/>
        <animate attributeName="stroke-width" values="2.5;3.5;2.5" dur="1.8s" repeatCount="indefinite" begin="0.4s"/>
      </path>
    </g>
    
    {/* Терминал с анимированным кодом */}
    <rect x="38" y="52" width="24" height="8" rx="3" fill="#1A202C" opacity="0.95"/>
    <g className="animate-pulse">
      <circle cx="42" cy="56" r="2" fill="#48BB78">
        <animate attributeName="fill" values="#48BB78;#68D391;#48BB78" dur="1.2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="50" cy="56" r="2" fill="#ED8936">
        <animate attributeName="fill" values="#ED8936;#F6AD55;#ED8936" dur="1.2s" repeatCount="indefinite" begin="0.4s"/>
      </circle>
      <circle cx="58" cy="56" r="2" fill="#4299E1">
        <animate attributeName="fill" values="#4299E1;#63B3ED;#4299E1" dur="1.2s" repeatCount="indefinite" begin="0.8s"/>
      </circle>
    </g>
    
    {/* Мигающий курсор */}
    <rect x="62" y="55" width="1" height="3" fill="#FFFFFF">
      <animate attributeName="opacity" values="1;0;1" dur="0.8s" repeatCount="indefinite"/>
    </rect>
    
    {/* Парящие квантовые частицы */}
    <g>
      {[...Array(8)].map((_, i) => (
        <circle
          key={i}
          cx={50 + Math.cos(i * 0.785) * 35}
          cy={50 + Math.sin(i * 0.785) * 35}
          r={1 + Math.random() * 1.5}
          fill="url(#particleGradient)"
          opacity="0.8"
        >
          <animate
            attributeName="r"
            values={`${1 + Math.random() * 1.5};${2 + Math.random() * 2};${1 + Math.random() * 1.5}`}
            dur={`${2 + Math.random() * 2}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.4;0.9;0.4"
            dur={`${3 + Math.random() * 2}s`}
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 50 50`}
            to={`360 50 50`}
            dur={`${12 + Math.random() * 8}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </g>
    
    {/* Энергетические волны */}
    <g stroke="url(#waveGradient)" strokeWidth="2" fill="none" opacity="0.7">
      <circle cx="50" cy="50" r="40" strokeDasharray="5 5">
        <animate attributeName="r" values="40;43;40" dur="3s" repeatCount="indefinite"/>
        <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="10s" repeatCount="indefinite"/>
      </circle>
    </g>

    {/* Градиенты и фильтры */}
    <defs>
      <radialGradient id="sphereGradient" cx="30%" cy="30%">
        <stop offset="0%" stopColor="#4C51BF" />
        <stop offset="50%" stopColor="#434190" />
        <stop offset="100%" stopColor="#322659" />
      </radialGradient>
      
      <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4299E1" />
        <stop offset="50%" stopColor="#9F7AEA" />
        <stop offset="100%" stopColor="#4299E1" />
      </linearGradient>
      
      <linearGradient id="bellyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#F7FAFC" />
      </linearGradient>
      
      <linearGradient id="beakGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ED8936" />
        <stop offset="100%" stopColor="#DD6B20" />
      </linearGradient>
      
      <linearGradient id="feetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ED8936" />
        <stop offset="50%" stopColor="#E53E3E" />
        <stop offset="100%" stopColor="#ED8936" />
      </linearGradient>
      
      <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4299E1" />
        <stop offset="50%" stopColor="#9F7AEA" />
        <stop offset="100%" stopColor="#4299E1" />
      </linearGradient>
      
      <linearGradient id="particleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4299E1" />
        <stop offset="100%" stopColor="#9F7AEA" />
      </linearGradient>
      
      <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4299E1" />
        <stop offset="50%" stopColor="#9F7AEA" />
        <stop offset="100%" stopColor="#4299E1" />
      </linearGradient>
      
      <filter id="beakGlow">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur"/>
        <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 0.5 0 0 0  0 0 0 0 0  0 0 0 1 0" result="glow"/>
        <feComposite in="SourceGraphic" in2="glow" operator="over"/>
      </filter>
    </defs>
  </svg>
);

const ChatBot = () => {
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const navigate = useNavigate();
  
  // Инициализация состояний из localStorage
  const initializeState = () => {
    const savedChats = localStorage.getItem('tuxbot-chats');
    const savedCurrentChat = localStorage.getItem('tuxbot-current-chat');
    
    return {
      chats: savedChats ? JSON.parse(savedChats) : [],
      currentChatId: savedCurrentChat || null
    };
  };

  // Состояния
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState(initializeState().chats);
  const [currentChatId, setCurrentChatId] = useState(initializeState().currentChatId);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [selectedModel, setSelectedModel] = useState('Qwen-2.5-1.5B-Instruct');
  const [hoveredMessage, setHoveredMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Сохранение в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('tuxbot-chats', JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    if (currentChatId) {
      localStorage.setItem('tuxbot-current-chat', currentChatId);
    }
  }, [currentChatId]);

  // Загрузка сообщений при смене текущего чата
  useEffect(() => {
    if (currentChatId) {
      const currentChat = chats.find(chat => chat.id === currentChatId);
      if (currentChat) {
        setMessages(currentChat.messages || []);
      }
    } else {
      setMessages([]);
    }
  }, [currentChatId, chats]);

  // Модели для выбора - теперь только две
  const models = [
    'Qwen-2.5-1.5B-Instruct',
    'Llama-3-8B-Instruct'
  ];

  // Автоматическое изменение высоты textarea
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  // Прокрутка к последнему сообщению
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Генерация названия чата на основе первого сообщения
  const generateChatTitle = (message) => {
    const cleanMessage = message.replace(/[`*#]/g, '').trim();
    if (cleanMessage.length <= 20) return cleanMessage;
    return cleanMessage.substring(0, 20) + '...';
  };

  // Обновление сообщений в текущем чате
  const updateCurrentChatMessages = (newMessages) => {
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === currentChatId 
          ? { ...chat, messages: newMessages, lastUpdated: new Date().toISOString() }
          : chat
      )
    );
  };

  // Имитация API вызова к модели
  const simulateAIResponse = async (userMessage) => {
    setIsLoading(true);
    
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    const linuxCommands = {
      "директория": "Для просмотра текущей директории используйте команду: `pwd`",
      "файлы": "Для просмотра файлов в директории: `ls` - простой список, `ls -la` - детализированный список",
      "обновление": "Для обновления пакетов в Ubuntu: `sudo apt update && sudo apt upgrade`",
      "установка": "Для установки пакетов: `sudo apt install имя_пакета`",
      "процессы": "Для просмотра процессов: `ps aux` или `top` для интерактивного просмотра",
      "сеть": "Для проверки сети: `ping example.com` или `netstat -tuln` для портов",
      "права": "Для изменения прав: `chmod 755 файл` или `chown пользователь:группа файл`",
      "поиск": "Для поиска файлов: `find / -name \"имя_файла\" 2>/dev/null`"
    };

    const lowerMessage = userMessage.toLowerCase();
    let response = "Я могу помочь вам с командами Linux. Уточните, что именно вас интересует: работа с файлами, процессы, сеть или что-то другое?";

    Object.keys(linuxCommands).forEach(key => {
      if (lowerMessage.includes(key)) {
        response = linuxCommands[key];
      }
    });
    
    setIsLoading(false);
    return response;
  };

  // Обработка отправки сообщения
  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');

    let chatId = currentChatId;

    // Создаем новый чат если это первое сообщение
    if (!currentChatId) {
      const newChat = {
        id: Date.now(),
        title: generateChatTitle(inputValue),
        date: new Date().toLocaleDateString(),
        messages: [userMessage],
        lastUpdated: new Date().toISOString()
      };
      
      setChats(prev => [newChat, ...prev]);
      setCurrentChatId(newChat.id);
      chatId = newChat.id;
    } else {
      // Обновляем существующий чат
      updateCurrentChatMessages(newMessages);
    }

    // Получаем ответ от AI
    const aiResponse = await simulateAIResponse(inputValue);
    
    const botMessage = {
      id: Date.now() + 1,
      text: aiResponse,
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      feedback: null
    };

    const finalMessages = [...newMessages, botMessage];
    setMessages(finalMessages);
    
    // Обновляем чат с сообщением бота
    if (chatId) {
      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === chatId 
            ? { ...chat, messages: finalMessages, lastUpdated: new Date().toISOString() }
            : chat
        )
      );
    }

    // Имитация сохранения в базу данных
    console.log('Сохранено в базу данных:', {
      chatId,
      userMessage,
      botMessage,
      model: selectedModel
    });
  };

  // Создание нового чата
  const handleNewChat = () => {
    setCurrentChatId(null);
    setMessages([]);
    setInputValue('');
  };

  // Выбор существующего чата
  const handleSelectChat = (chatId) => {
    setCurrentChatId(chatId);
  };

  // Удаление чата
  const handleDeleteChat = (chatId, e) => {
    e.stopPropagation();
    setShowDeleteConfirm(chatId);
  };

  const handleConfirmDelete = () => {
    setChats(prev => prev.filter(chat => chat.id !== showDeleteConfirm));
    if (currentChatId === showDeleteConfirm) {
      setCurrentChatId(null);
      setMessages([]);
    }
    setShowDeleteConfirm(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  // Выход из аккаунта
  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    // Очистка localStorage при выходе
    localStorage.removeItem('tuxbot-chats');
    localStorage.removeItem('tuxbot-current-chat');
    navigate('/');
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  // Обработка нажатия Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && inputValue.trim() && !isLoading) {
      e.preventDefault();
      handleSend();
    }
  };

  // Обработка фидбэка сообщения
  const handleFeedback = (messageId, feedbackType) => {
    const updatedMessages = messages.map(msg => 
      msg.id === messageId ? { ...msg, feedback: feedbackType } : msg
    );
    
    setMessages(updatedMessages);
    
    // Обновляем в чатах
    if (currentChatId) {
      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === currentChatId 
            ? { ...chat, messages: updatedMessages }
            : chat
        )
      );
    }
    
    // Имитация сохранения фидбэка в базу данных
    console.log('Фидбэк сохранен в message_feedbacks:', {
      messageId,
      feedback: feedbackType,
      timestamp: new Date().toISOString()
    });
  };

  // Регенерация ответа
  const handleRegenerate = async (messageId) => {
    const messageIndex = messages.findIndex(msg => msg.id === messageId);
    if (messageIndex > 0) {
      const userMessage = messages[messageIndex - 1];
      if (userMessage.isUser) {
        // Удаляем старый ответ и генерируем новый
        const newMessages = messages.slice(0, messageIndex);
        setMessages(newMessages);
        updateCurrentChatMessages(newMessages);
        
        const newResponse = await simulateAIResponse(userMessage.text);
        
        const newBotMessage = {
          id: Date.now(),
          text: newResponse,
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          feedback: null
        };
        
        const finalMessages = [...newMessages, newBotMessage];
        setMessages(finalMessages);
        updateCurrentChatMessages(finalMessages);
      }
    }
  };

  const isNewChat = !currentChatId || messages.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex">
      {/* Боковая панель */}
      <div className="w-80 bg-white/95 backdrop-blur-sm border-r border-slate-200/80 flex flex-col shadow-xl">
        {/* Кнопка нового чата */}
        <div className="p-6 border-b border-slate-200/60">
          <button
            onClick={handleNewChat}
            className="w-full p-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center group"
          >
            <span className="mr-3 group-hover:scale-110 transition-transform">+</span>
            <span>Новый чат</span>
          </button>
        </div>

        {/* Список чатов */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-3">
            {chats.length === 0 ? (
              <div className="text-center text-slate-500 py-12">
                <div className="w-20 h-20 mx-auto mb-4 bg-slate-100 rounded-2xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <p className="text-sm font-medium">Нет сохраненных чатов</p>
                <p className="text-xs mt-2 text-slate-400">Начните новый диалог с TuxBot</p>
              </div>
            ) : (
              chats.map(chat => (
                <div
                  key={chat.id}
                  className={`relative p-4 rounded-2xl cursor-pointer transition-all duration-300 group border-2 ${
                    currentChatId === chat.id 
                      ? 'bg-blue-50/80 border-blue-200 shadow-md backdrop-blur-sm' 
                      : 'bg-white/60 border-transparent hover:bg-white/80 hover:border-slate-200/60 backdrop-blur-sm'
                  }`}
                  onClick={() => handleSelectChat(chat.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-slate-800 truncate mb-2">
                        {chat.title}
                      </div>
                      <div className="text-xs text-slate-500 flex justify-between items-center">
                        <span>{chat.date}</span>
                        <span className="bg-slate-100 px-2 py-1 rounded-full text-slate-600">
                          {chat.messages?.length || 0} сообщ.
                        </span>
                      </div>
                    </div>
                    
                    {/* Кнопка удаления чата */}
                    <button
                      onClick={(e) => handleDeleteChat(chat.id, e)}
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300 ml-3 text-red-500 hover:text-red-600 p-2 bg-red-50 hover:bg-red-100 rounded-xl"
                      title="Удалить чат"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Кнопка выхода */}
        <div className="p-6 border-t border-slate-200/60 bg-white/80 backdrop-blur-sm">
          <button 
            onClick={handleLogout}
            className="w-full p-4 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center group"
          >
            <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Выйти из аккаунта
          </button>
        </div>
      </div>

      {/* Основная область чата */}
      <div className="flex-1 flex flex-col">
        {/* Заголовок с выбором модели */}
        {currentChatId && (
          <div className="bg-white/95 backdrop-blur-sm border-b border-slate-200/60 px-8 py-6 shadow-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
                  <PenguinAI className="w-full h-full" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">TuxBot AI Assistant</h1>
                  <p className="text-sm text-slate-600">Ваш помощник в мире Linux</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-slate-600 font-medium">Модель:</span>
                <select 
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-sm shadow-sm hover:border-slate-400 transition-colors"
                >
                  {models.map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {currentChatId ? (
          // Область диалога для существующего чата
          <>
            <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-gradient-to-b from-white/50 to-blue-50/20">
              {messages.length === 0 ? (
                <div className="text-center text-slate-500 py-20">
                  <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 rounded-3xl flex items-center justify-center shadow-inner">
                    <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-slate-700">Этот чат пуст</p>
                  <p className="text-sm mt-2 text-slate-500">Начните общение с TuxBot</p>
                </div>
              ) : (
                messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-2xl rounded-3xl p-6 shadow-lg relative transition-all duration-300 backdrop-blur-sm ${
                        message.isUser
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-br-lg shadow-blue-200'
                          : 'bg-white/90 border border-slate-200/60 rounded-bl-lg shadow-slate-200'
                      }`}
                      onMouseEnter={() => !message.isUser && setHoveredMessage(message.id)}
                      onMouseLeave={() => !message.isUser && setHoveredMessage(null)}
                    >
                      <div className="flex items-center mb-3">
                        <div className={`w-3 h-3 rounded-full mr-3 ${
                          message.isUser ? 'bg-blue-200' : 'bg-green-400'
                        }`}></div>
                        <div className="text-sm font-semibold opacity-90">
                          {message.isUser ? 'Вы' : 'TuxBot'}
                        </div>
                        <div className={`text-xs ml-4 ${message.isUser ? 'text-blue-200' : 'text-slate-500'}`}>
                          {message.timestamp}
                        </div>
                      </div>
                      <div className="whitespace-pre-wrap leading-relaxed text-[15px]">
                        {message.text}
                      </div>

                      {/* Иконки фидбэка для сообщений бота */}
                      {!message.isUser && hoveredMessage === message.id && (
                        <div className="absolute -bottom-12 left-0 flex space-x-3 bg-white/95 backdrop-blur-sm border border-slate-200/60 rounded-2xl px-4 py-3 shadow-xl">
                          <button
                            onClick={() => handleFeedback(message.id, 'like')}
                            className={`p-2 rounded-xl transition-all duration-200 ${
                              message.feedback === 'like' 
                                ? 'text-green-600 bg-green-50 border border-green-200 shadow-sm' 
                                : 'text-slate-500 hover:text-green-600 hover:bg-green-50 border border-transparent hover:border-green-200'
                            }`}
                            title="Понравился ответ"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                            </svg>
                          </button>
                          
                          <button
                            onClick={() => handleFeedback(message.id, 'dislike')}
                            className={`p-2 rounded-xl transition-all duration-200 ${
                              message.feedback === 'dislike' 
                                ? 'text-red-600 bg-red-50 border border-red-200 shadow-sm' 
                                : 'text-slate-500 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200'
                            }`}
                            title="Не понравился ответ"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" />
                            </svg>
                          </button>
                          
                          <button
                            onClick={() => handleRegenerate(message.id)}
                            className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 border border-transparent hover:border-blue-200 transition-all duration-200"
                            title="Сгенерировать другой ответ"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-2xl rounded-3xl p-6 bg-white/90 border border-slate-200/60 shadow-lg rounded-bl-lg backdrop-blur-sm">
                    <div className="flex items-center space-x-4 text-slate-600">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <span className="text-sm font-medium">TuxBot печатает ответ...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Поле ввода внизу для существующего чата */}
            <div className="border-t border-slate-200/60 bg-white/95 backdrop-blur-sm p-8">
              <div className="max-w-4xl mx-auto">
                <div className="flex space-x-4 items-end">
                  <div className="flex-1 relative">
                    <textarea
                      ref={textareaRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Введите ваш вопрос о Linux командах..."
                      className="w-full border-2 border-slate-300/80 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none min-h-[70px] bg-white/80 backdrop-blur-sm transition-all duration-200 placeholder-slate-500 text-slate-800 hover:border-slate-400"
                      rows="1"
                      disabled={isLoading}
                    />
                  </div>
                  {inputValue.trim() && !isLoading && (
                    <button
                      onClick={handleSend}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] mb-1 flex items-center space-x-3"
                    >
                      <span>Отправить</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                  {isLoading && (
                    <button
                      disabled
                      className="bg-slate-400 text-white px-8 py-4 rounded-2xl font-semibold mb-1 flex items-center space-x-3 cursor-not-allowed shadow-lg"
                    >
                      <span>Отправка...</span>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          // Приветственный экран для нового чата
          <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-white/50 to-blue-50/30">
            <div className="text-center max-w-4xl w-full">
              <div className="w-40 h-40 mx-auto mb-8 rounded-[2rem] flex items-center justify-center shadow-2xl overflow-hidden">
                <PenguinAI className="w-full h-full" />
              </div>
              
              <h1 className="text-5xl font-black text-slate-800 mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">TuxBot</span> AI Assistant
              </h1>
              
              <p className="text-2xl text-slate-600 mb-12 font-light">
                Чем сегодня я могу Вам помочь?
              </p>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-slate-200/60 max-w-2xl mx-auto">
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Задайте вопрос о Linux командах, настройке системы, терминале..."
                    className="w-full border-2 border-slate-300/80 rounded-2xl px-6 py-5 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none min-h-[140px] bg-white/80 backdrop-blur-sm transition-all duration-200 text-slate-800 placeholder-slate-500 hover:border-slate-400"
                    rows="3"
                    disabled={isLoading}
                  />
                </div>
                {inputValue.trim() && !isLoading && (
                  <button
                    onClick={handleSend}
                    className="mt-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-12 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] text-lg flex items-center space-x-3 mx-auto"
                  >
                    <span>Начать диалог</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
                {isLoading && (
                  <button
                    disabled
                    className="mt-6 bg-slate-400 text-white px-12 py-4 rounded-2xl font-semibold text-lg flex items-center space-x-3 mx-auto cursor-not-allowed shadow-lg"
                  >
                    <span>Запуск чата...</span>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </button>
                )}
              </div>

              {/* Быстрые подсказки */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                {[
                  "Как посмотреть файлы в директории?",
                  "Команды для работы с процессами",
                  "Настройка сети в Ubuntu"
                ].map((hint, index) => (
                  <button
                    key={index}
                    onClick={() => setInputValue(hint)}
                    className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-300 text-slate-700 hover:text-blue-700 text-sm font-medium hover:scale-[1.02] hover:shadow-lg"
                  >
                    {hint}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Модальное окно подтверждения удаления чата */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-md mx-4 shadow-2xl border border-slate-200/60">
            <div className="w-20 h-20 mx-auto mb-6 bg-red-50 rounded-3xl flex items-center justify-center">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-center mb-3 text-slate-800">Удалить чат?</h3>
            <p className="text-slate-600 text-center mb-8 leading-relaxed">Вы уверены, что хотите удалить этот чат? Это действие нельзя отменить.</p>
            <div className="flex space-x-4">
              <button
                onClick={handleCancelDelete}
                className="flex-1 border-2 border-slate-300 text-slate-700 py-4 rounded-2xl hover:bg-slate-50 transition duration-200 font-semibold hover:border-slate-400"
              >
                Отмена
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl transition duration-200 font-semibold shadow-lg hover:shadow-xl"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно подтверждения выхода */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-md mx-4 shadow-2xl border border-slate-200/60">
            <div className="w-20 h-20 mx-auto mb-6 bg-orange-50 rounded-3xl flex items-center justify-center">
              <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-center mb-3 text-slate-800">Выйти из аккаунта?</h3>
            <p className="text-slate-600 text-center mb-8 leading-relaxed">Вы уверены, что хотите выйти? Все несохраненные данные будут потеряны.</p>
            <div className="flex space-x-4">
              <button
                onClick={handleCancelLogout}
                className="flex-1 border-2 border-slate-300 text-slate-700 py-4 rounded-2xl hover:bg-slate-50 transition duration-200 font-semibold hover:border-slate-400"
              >
                Отмена
              </button>
              <button
                onClick={handleConfirmLogout}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl transition duration-200 font-semibold shadow-lg hover:shadow-xl"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;