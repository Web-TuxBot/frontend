// src/pages/ChatBot.js
import React, { useState, useRef, useEffect } from 'react';

const ChatBot = () => {
  const messagesEndRef = useRef(null);
  
  // Состояния
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([
    { id: 1, title: 'Настройка nginx', date: '2024-01-15' },
    { id: 2, title: 'Команды Docker', date: '2024-01-14' },
    { id: 3, title: 'Проблемы с сетью', date: '2024-01-13' }
  ]);
  const [currentChatId, setCurrentChatId] = useState(null);

  // Прокрутка к последнему сообщению
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Обработка отправки сообщения
  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date().toLocaleTimeString()
    };

    // Добавляем сообщение пользователя
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Создаем новый чат если это первое сообщение
    if (!currentChatId) {
      const newChat = {
        id: Date.now(),
        title: inputValue.substring(0, 30) + (inputValue.length > 30 ? '...' : ''),
        date: new Date().toLocaleDateString()
      };
      setChats(prev => [newChat, ...prev]);
      setCurrentChatId(newChat.id);
    }

    // Имитация ответа бота
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: "Это пример ответа от TuxBot. В реальной версии здесь будет интеллектуальный ответ на ваш вопрос о Linux.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
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
    // Загружаем тестовые сообщения
    setMessages([
      {
        id: 1,
        text: "Привет! Я TuxBot, ваш AI-помощник для работы с Linux.",
        isUser: false,
        timestamp: "10:00"
      },
      {
        id: 2,
        text: "Как настроить автоматическое обновление в Ubuntu?",
        isUser: true,
        timestamp: "10:01"
      },
      {
        id: 3,
        text: "Для настройки автоматических обновлений в Ubuntu используйте команду: sudo dpkg-reconfigure -plow unattended-upgrades",
        isUser: false,
        timestamp: "10:02"
      }
    ]);
  };

  // Обработка нажатия Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">
      {/* Боковая панель */}
      <div className="w-80 bg-white shadow-xl border-r border-gray-200 flex flex-col">
        {/* Кнопка нового чата */}
        <button
          onClick={handleNewChat}
          className="m-4 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          + Новый чат
        </button>

        {/* Список чатов */}
        <div className="flex-1 overflow-y-auto px-4">
          {chats.map(chat => (
            <div
              key={chat.id}
              className={`relative p-3 mb-2 rounded-lg cursor-pointer transition-all duration-200 group ${
                currentChatId === chat.id 
                  ? 'bg-blue-100 border border-blue-300' 
                  : 'hover:bg-gray-100 border border-transparent'
              }`}
              onClick={() => handleSelectChat(chat.id)}
            >
              <div className="font-medium text-gray-800 truncate">
                {chat.title}
              </div>
              <div className="text-xs text-gray-500">
                {chat.date}
              </div>
            </div>
          ))}
        </div>

        {/* Кнопка выхода */}
        <div className="p-4 border-t border-gray-200">
          <button className="w-full p-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl font-semibold hover:from-red-500 hover:to-pink-500 transition-all duration-300 shadow-lg hover:shadow-xl">
            Выйти из аккаунта
          </button>
        </div>
      </div>

      {/* Основная область чата */}
      <div className="flex-1 flex flex-col">
        {currentChatId ? (
          // Область диалога
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-2xl rounded-2xl p-4 shadow-lg ${
                      message.isUser
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-none'
                        : 'bg-white border border-gray-200 rounded-bl-none'
                    }`}
                  >
                    <div className="text-sm mb-1">
                      {message.isUser ? 'Вы' : 'TuxBot'}
                    </div>
                    <div className="whitespace-pre-wrap">{message.text}</div>
                    <div className={`text-xs mt-2 ${message.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Поле ввода */}
            <div className="p-6 border-t border-gray-200 bg-white">
              <div className="max-w-4xl mx-auto flex space-x-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Введите ваш вопрос о Linux..."
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {inputValue.trim() && (
                  <button
                    onClick={handleSend}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-500 hover:to-emerald-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Отправить
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          // Приветственный экран
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center max-w-2xl">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-4xl">
                🐧
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                TuxBot AI Assistant
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                О чем сегодня Вам хочется узнать?
              </p>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Задайте вопрос о Linux, командах, настройке..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {inputValue.trim() && (
                  <button
                    onClick={handleSend}
                    className="mt-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-500 hover:to-emerald-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Начать диалог
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBot;