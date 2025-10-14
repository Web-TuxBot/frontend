// src/pages/Login.js
import React, { useState, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Демо-данные зарегистрированных пользователей
const REGISTERED_USERS = [
  { username: 'admin', email: 'admin@example.com', password: 'admin123' },
  { username: 'user123', email: 'user@example.com', password: 'password123' },
  { username: 'testuser', email: 'test@example.com', password: 'test123' }
];

const Login = () => {
  const navigate = useNavigate();
  
  // Состояния
  const [formData, setFormData] = useState({
    login: '', // Может быть email или username
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Мемоизированные обработчики
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очистка ошибки при изменении поля
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  const validateForm = useCallback(() => {
    const newErrors = {};

    // Проверка логина (email или username)
    if (!formData.login.trim()) {
      newErrors.login = 'Введите email или имя пользователя';
    } else {
      // Проверяем, является ли ввод email'ом
      const isEmail = /\S+@\S+\.\S+/.test(formData.login);
      
      if (isEmail) {
        // Если введен email, проверяем его корректность
        if (!/\S+@\S+\.\S+/.test(formData.login)) {
          newErrors.login = 'Некорректный формат email';
        }
      }
      
      // Проверяем существование пользователя
      const userExists = REGISTERED_USERS.some(user => 
        user.email === formData.login || user.username === formData.login
      );
      
      if (!userExists) {
        newErrors.login = 'Неизвестный email или имя пользователя';
      }
    }

    // Проверка пароля
    if (!formData.password) {
      newErrors.password = 'Введите пароль';
    } else {
      // Находим пользователя
      const user = REGISTERED_USERS.find(user => 
        user.email === formData.login || user.username === formData.login
      );
      
      // Проверяем пароль только если пользователь существует
      if (user && user.password !== formData.password) {
        newErrors.password = 'Неверный пароль';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Имитация API запроса
    setTimeout(() => {
      setIsLoading(false);
      
      // Находим пользователя для приветствия
      const user = REGISTERED_USERS.find(user => 
        user.email === formData.login || user.username === formData.login
      );
      
      setMessage(`Добро пожаловать, ${user?.username || 'пользователь'}!`);
      
      // Переход в чат после короткой задержки
      setTimeout(() => {
        navigate('/auth/chatbot');
      }, 1000);
      
    }, 1500);
  }, [validateForm, formData.login, navigate]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  // Мемоизированные компоненты иконок
  const PasswordVisibilityIcon = useMemo(() => 
    showPassword ? (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
      </svg>
    ) : (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ), [showPassword]);

  const LoadingSpinner = useMemo(() => (
    <div className="flex items-center">
      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Вход...
    </div>
  ), []);

  // Базовые стили для инпутов
  const inputBaseClasses = "relative block w-full px-3 py-3 border placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-200";
  const inputErrorClasses = "border-red-500 focus:ring-red-500 focus:border-red-500";
  const inputNormalClasses = "border-gray-300";

  // Компонент поля ввода с ошибкой
  const InputField = useCallback(({ id, name, type, placeholder, value, onChange, error, ...props }) => (
    <div>
      <label htmlFor={id} className="sr-only">{placeholder}</label>
      <input
        id={id}
        name={name}
        type={type}
        required
        value={value}
        onChange={onChange}
        className={`${inputBaseClasses} ${error ? inputErrorClasses : inputNormalClasses}`}
        placeholder={placeholder}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  ), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Вход в систему
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Введите свои данные для входа
          </p>
        </div>

        {message && (
          <div className="bg-green-500/20 border border-green-500/50 text-green-300 px-4 py-3 rounded-lg">
            {message}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <InputField
              id="login"
              name="login"
              type="text"
              placeholder="Email или имя пользователя"
              value={formData.login}
              onChange={handleChange}
              error={errors.login}
            />

            <div className="relative">
              <InputField
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Пароль"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800 transition duration-200"
                onClick={togglePasswordVisibility}
              >
                {PasswordVisibilityIcon}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 shadow-lg"
            >
              {isLoading ? LoadingSpinner : 'Войти'}
            </button>
          </div>

          <div className="text-center">
            <Link 
              to="/auth/register" 
              className="text-blue-300 hover:text-blue-200 transition duration-200 font-medium"
            >
              Нет аккаунта? Зарегистрируйтесь
            </Link>
          </div>

          {/* Демо-подсказка */}
          <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
            <p className="text-xs text-gray-400 text-center">
              Демо-данные:<br />
              Логин: <span className="text-blue-300">admin</span> / Пароль: <span className="text-blue-300">admin123</span><br />
              Логин: <span className="text-blue-300">user@example.com</span> / Пароль: <span className="text-blue-300">password123</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;