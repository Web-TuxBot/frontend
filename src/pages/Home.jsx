
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';

const terminalLines = [
  { command: "Как посмотреть рабочую директорию?", response: "🔧 Чтобы посмотреть рабочую директорию используйте pwd" },
  { command: "Как установить docker на Manjaro OS?", response: "📡 Чтобы установить Docker на Manjaro OS используйте pacman -S docker" },
  { command: "Как удалить директорию?", response: "🔍 Чтобы удалить директорию используйте rm -rf /путь/к/директории/" }
];

const Home = () => {
  const [mounted, setMounted] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);

  const startTypingEffect = useCallback(() => {
    let currentIndex = 0;
    const currentCommand = terminalLines[currentLine].command;
    
    const typeInterval = setInterval(() => {
      if (currentIndex <= currentCommand.length) {
        setTypedText(currentCommand.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentLine(prev => (prev + 1) % terminalLines.length);
          setTypedText('');
        }, 3000);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentLine]);

  useEffect(() => {
    setMounted(true);
    const cleanup = startTypingEffect();
    return cleanup;
  }, [startTypingEffect]);

  // Мемоизированные компоненты для оптимизации
  const FeatureCard = useMemo(() => ({ icon, title, description, delay }) => (
    <div 
      className={`group bg-gray-800/50 rounded-xl p-6 border border-white/10 transition-all duration-300 hover:border-cyan-500/50 hover:bg-gray-800/70 hover:shadow-lg hover:shadow-cyan-500/10 ${mounted ? 'opacity-100' : 'opacity-0'}`}
      style={{ 
        transitionDelay: `${delay}ms`,
        transform: 'translateZ(0)',
        willChange: 'transform, opacity'
      }}
    >
      <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cyan-500/30 transition-colors">
        <span className="text-2xl">{icon}</span>
      </div>
      
      <h3 className="text-xl font-bold mb-3 text-white">
        {title}
      </h3>
      <p className="text-gray-300 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  ), [mounted]);

  const UserTypeCard = useMemo(() => ({ title, description, icon, delay }) => (
    <div 
      className={`group bg-gray-800/40 rounded-lg p-4 border border-white/5 transition-all duration-300 hover:border-cyan-500/30 hover:bg-gray-800/60 ${mounted ? 'opacity-100' : 'opacity-0'}`}
      style={{ 
        transitionDelay: `${delay}ms`,
        transform: 'translateZ(0)',
        willChange: 'transform, opacity'
      }}
    >
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/30 transition-colors">
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-white mb-2">{title}</h4>
          <p className="text-gray-400 text-xs leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  ), [mounted]);

  // Мемоизированные данные
  const statsData = useMemo(() => [
    { value: "100%", label: "Точность", color: "text-green-400" },
    { value: "24/7", label: "Доступность", color: "text-cyan-400" },
    { value: "AI", label: "Технологии", color: "text-purple-400" }
  ], []);

  const userTypesData = useMemo(() => [
    { icon: "🏠", title: "Домашние пользователи", description: "Легкое освоение Linux для повседневных задач", delay: "0" },
    { icon: "🎓", title: "Начинающие пользователи", description: "Пошаговое изучение терминала", delay: "50" },
    { icon: "💻", title: "Разработчики", description: "Автоматизация рабочих процессов", delay: "100" },
    { icon: "🛠️", title: "Системные администраторы", description: "Решение задач администрирования", delay: "150" }
  ], []);

  const featuresData = useMemo(() => [
    { icon: "⚡", title: "Генерация команд", description: "Автоматическая генерация bash-команд по текстовому запросу пользователя", delay: "0" },
    { icon: "🔍", title: "Разбор команд", description: "Детальный анализ существующих команд bash-терминала", delay: "100" }
  ], []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl"
          style={{ transform: 'translateZ(0)' }}
        ></div>
        <div 
          className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"
          style={{ transform: 'translateZ(0)' }}
        ></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Left Content */}
            <div className="lg:w-1/2 w-full">
              <div className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 mb-6 shadow-lg">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping mr-2"></div>
                  <span className="text-cyan-300 text-sm font-medium">AI Помощник для Linux • 2025</span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-black mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    TuxBot
                  </span>
                </h1>
                <h2 className="text-2xl lg:text-3xl text-white/90 font-light mb-6 leading-relaxed">
                  Ваш интеллектуальный <span className="text-cyan-300 font-semibold">AI-помощник</span> в терминале
                </h2>
                
                <p className="text-gray-300 mb-8 max-w-lg text-lg leading-relaxed">
                  Инновационная система для освоения и работы с <span className="text-cyan-300 font-semibold">bash-терминалом GNU/Linux</span> на основе искусственного интеллекта.
                </p>

                {/* Quick Stats */}
                <div className="flex gap-8 mb-6">
                  {statsData.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Terminal */}
            <div className="lg:w-1/2 w-full">
              <div className={`transition-all duration-700 delay-300 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <div 
                  className="bg-gray-800/80 rounded-xl p-6 border border-cyan-500/20 backdrop-blur-sm shadow-xl"
                  style={{ transform: 'translateZ(0)' }}
                >
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-400 text-sm font-mono ml-2">terminal — tuxbot</span>
                    </div>
                    <div className="text-gray-500 text-xs font-mono">user@linux:~</div>
                  </div>
                  
                  {/* Terminal Content */}
                  <div className="font-mono text-sm space-y-3">
                    <div className="bg-gray-700/30 rounded-lg p-3 border-l-2 border-cyan-500">
                      <div className="flex items-center">
                        <span className="text-green-400 mr-3 font-bold">$</span>
                        <span className="text-white font-medium">
                          {typedText}
                          <span className="animate-pulse bg-cyan-400 ml-1">▊</span>
                        </span>
                      </div>
                      <div className="text-cyan-300 ml-7 mt-2 font-medium">
                        {terminalLines[currentLine].response}
                      </div>
                    </div>
                    
                    {/* Previous commands */}
                    <div className="space-y-2 border-t border-gray-700/50 pt-3">
                      {terminalLines.slice(0, currentLine).map((line, idx) => (
                        <div key={idx} className="opacity-70 hover:opacity-100 transition-opacity">
                          <div className="flex items-center">
                            <span className="text-green-400 mr-3">$</span>
                            <span className="text-gray-300 text-xs">{line.command}</span>
                          </div>
                          <div className="text-cyan-400/80 ml-7 text-xs mt-1">{line.response}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Functions Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className={`text-center mb-12 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 mb-4 shadow-lg">
              <span className="text-blue-300 text-sm font-medium">Функции системы</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Возможности TuxBot
              </span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
              Мощное клиент-серверное веб-приложение с интеллектуальным чат-ботом на основе современных LLM-моделей
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {featuresData.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={feature.delay}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className={`text-center mb-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl lg:text-3xl font-black mb-4">
              <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                Для кого создан TuxBot?
              </span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
              Профессиональное решение для всех категорий пользователей GNU/Linux
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {userTypesData.map((userType, index) => (
              <UserTypeCard
                key={index}
                icon={userType.icon}
                title={userType.title}
                description={userType.description}
                delay={userType.delay}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className={`max-w-2xl mx-auto transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            <h2 className="text-3xl lg:text-4xl font-black mb-6 leading-tight">
              Начните работу с <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">TuxBot</span> сегодня
            </h2>
            
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Присоединяйтесь к сообществу прогрессивных пользователей GNU/Linux
            </p>

            {/* Final CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link 
                to="/auth/register" 
                className="bg-green-600 hover:bg-green-500 text-white font-bold px-10 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 text-base min-w-40 text-center"
                style={{ transform: 'translateZ(0)' }}
              >
                🚀 Начать бесплатно
              </Link>
              
              <Link 
                to="/auth/login" 
                className="border border-cyan-500/50 hover:border-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-100 hover:text-white font-bold px-10 py-4 rounded-xl transition-all duration-300 hover:scale-105 text-base min-w-40 text-center"
                style={{ transform: 'translateZ(0)' }}
              >
                🔑 Войти в систему
              </Link>
            </div>

            {/* Additional info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-400 text-sm">
              <div className="flex items-center justify-center space-x-3 bg-gray-800/30 rounded-lg py-3 px-4">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-medium">Bash-терминал</span>
              </div>
              <div className="flex items-center justify-center space-x-3 bg-gray-800/30 rounded-lg py-3 px-4">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="font-medium">LLM-модель</span>
              </div>
              <div className="flex items-center justify-center space-x-3 bg-gray-800/30 rounded-lg py-3 px-4">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="font-medium">Linux</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;