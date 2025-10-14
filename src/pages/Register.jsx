// src/pages/Register.js
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Константы для демо-данных
const EXISTING_USERNAMES = ['admin', 'user123', 'testuser'];
const DEMO_VERIFICATION_CODE = '123456';

const Register = () => {
  const navigate = useNavigate();
  
  // Состояния
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    code: ''
  });
  
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  // Таймер для повторной отправки кода
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Проверка сложности пароля
  const checkPasswordStrength = useCallback((password) => {
    if (!password) return '';
    
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const mediumRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    
    if (strongRegex.test(password)) return 'strong';
    if (mediumRegex.test(password)) return 'medium';
    return 'weak';
  }, []);

  // Мемоизированные обработчики
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Проверка сложности пароля
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
    
    // Очистка ошибки при изменении поля
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // УБРАНО: автоподтверждение при вводе 6 цифр кода
    // Теперь нужно обязательно нажать кнопку "Подтвердить и войти"
  }, [errors, checkPasswordStrength]);

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Имя пользователя обязательно';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Имя пользователя должно содержать минимум 3 символа';
    } else if (EXISTING_USERNAMES.includes(formData.username)) {
      newErrors.username = 'Это имя пользователя уже занято';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некорректный формат email';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    } else if (passwordStrength === 'weak') {
      newErrors.password = 'Пароль слишком слабый. Добавьте цифры и заглавные буквы';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, passwordStrength]);

  const handleRegister = useCallback(async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Имитация API запроса
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      setMessage(`Код подтверждения отправлен на ${formData.email}`);
      setResendTimer(60); // 60 секунд до возможности повторной отправки
      
      // Автоочистка сообщения
      setTimeout(() => setMessage(''), 5000);
    }, 1500);
  }, [validateForm, formData.email]);

  const handleCodeVerification = useCallback((e) => {
    e.preventDefault();
    
    if (!formData.code.trim()) {
      setErrors({ code: 'Введите код подтверждения' });
      return;
    }

    if (formData.code.length !== 6) {
      setErrors({ code: 'Код должен содержать 6 цифр' });
      return;
    }

    if (formData.code !== DEMO_VERIFICATION_CODE) {
      setErrors({ code: 'Неверный код подтверждения' });
      return;
    }

    // Успешная регистрация - переход только при нажатии кнопки
    navigate('/auth/chatbot');
  }, [formData.code, navigate]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const handleResendCode = useCallback(() => {
    if (resendTimer > 0) return;
    
    setMessage(`Код подтверждения повторно отправлен на ${formData.email}`);
    setResendTimer(60);
    setTimeout(() => setMessage(''), 5000);
  }, [formData.email, resendTimer]);

  const handleBackToRegister = useCallback(() => {
    setStep(1);
    setErrors({});
  }, []);

  // Индикатор сложности пароля
  const PasswordStrengthIndicator = useMemo(() => {
    if (!formData.password) return null;
    
    const strengthColors = {
      weak: 'bg-red-500',
      medium: 'bg-yellow-500',
      strong: 'bg-green-500'
    };
    
    const strengthText = {
      weak: 'Слабый',
      medium: 'Средний',
      strong: 'Сильный'
    };

    return (
      <div className="mt-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-600">Сложность пароля:</span>
          <span className={`text-xs font-medium ${
            passwordStrength === 'weak' ? 'text-red-600' :
            passwordStrength === 'medium' ? 'text-yellow-600' : 'text-green-600'
          }`}>
            {strengthText[passwordStrength]}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className={`h-1.5 rounded-full transition-all duration-300 ${
              strengthColors[passwordStrength]
            }`}
            style={{ 
              width: passwordStrength === 'weak' ? '33%' : 
                     passwordStrength === 'medium' ? '66%' : '100%' 
            }}
          />
        </div>
      </div>
    );
  }, [formData.password, passwordStrength]);

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
      Регистрация...
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
        {step === 1 ? (
          // Шаг 1: Форма регистрации
          <>
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                Создать аккаунт
              </h2>
              <p className="mt-2 text-center text-sm text-gray-300">
                Заполните форму для регистрации
              </p>
            </div>
            
            <form className="mt-8 space-y-6" onSubmit={handleRegister}>
              <div className="space-y-4">
                <InputField
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Имя пользователя"
                  value={formData.username}
                  onChange={handleChange}
                  error={errors.username}
                />

                <InputField
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email адрес"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
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
                  {PasswordStrengthIndicator}
                </div>

                <InputField
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Подтверждение пароля"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 shadow-lg"
                >
                  {isLoading ? LoadingSpinner : 'Создать аккаунт'}
                </button>
              </div>

              <div className="text-center">
                <Link 
                  to="/auth/login" 
                  className="text-blue-300 hover:text-blue-200 transition duration-200 font-medium"
                >
                  Уже есть аккаунт? Войдите
                </Link>
              </div>
            </form>
          </>
        ) : (
          // Шаг 2: Подтверждение email
          <>
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                Подтверждение Email
              </h2>
              <p className="mt-2 text-center text-sm text-gray-300">
                Введите 6-значный код, отправленный на
              </p>
              <p className="text-center text-sm font-medium text-blue-300">
                {formData.email}
              </p>
            </div>

            {message && (
              <div className="bg-green-500/20 border border-green-500/50 text-green-300 px-4 py-3 rounded-lg">
                {message}
              </div>
            )}

            <form className="mt-8 space-y-6" onSubmit={handleCodeVerification}>
              <div>
                <InputField
                  id="code"
                  name="code"
                  type="text"
                  placeholder="Введите 6-значный код"
                  value={formData.code}
                  onChange={handleChange}
                  error={errors.code}
                  maxLength="6"
                  pattern="[0-9]*"
                  inputMode="numeric"
                />
                <p className="mt-1 text-xs text-gray-400">
                  Демо-код: 123456
                </p>
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200 shadow-lg"
                >
                  Подтвердить и войти
                </button>

                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={resendTimer > 0}
                  className={`w-full text-center py-2 transition duration-200 ${
                    resendTimer > 0 
                      ? 'text-gray-500 cursor-not-allowed' 
                      : 'text-blue-300 hover:text-blue-200'
                  }`}
                >
                  {resendTimer > 0 
                    ? `Повторная отправка через ${resendTimer}с` 
                    : 'Отправить код повторно'
                  }
                </button>

                <button
                  type="button"
                  onClick={handleBackToRegister}
                  className="w-full text-center py-2 text-gray-300 hover:text-gray-200 transition duration-200"
                >
                  ← Вернуться к регистрации
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;