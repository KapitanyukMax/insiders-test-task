'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext.js';
import { useRouter } from 'next/navigation';
import { useValidation } from '../hooks/validation.js';
import Link from 'next/link';
import styles from './page.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {
    isEmailValid,
    isPasswordValid,
    revalidateEmail,
    revalidatePassword,
    validateEmailAndPassword,
  } = useValidation();
  const { handleLogin, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/profile');
    }
  }, [user, router]);

  const handleEmailChange = (e) => {
    e.preventDefault();
    revalidateEmail(e.target.value);
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    revalidatePassword(e.target.value);
    setPassword(e.target.value);
  };

  if (loading) return <p>Loading...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmailAndPassword(email, password)) {
      return;
    }

    try {
      await handleLogin(email, password);
      router.push('/profile');
    } catch (error) {
      if (error.message === 'Email not confirmed') {
        setErrorMessage('Підтвердіть email');
      } else {
        setErrorMessage('Неправильний email або пароль');
      }
    }
  };

  return (
    <div className={styles['login-page-container']}>
      <h1>Увійдіть</h1>
      <form className={styles['login-form']} onSubmit={handleSubmit}>
        <label
          className={`${styles['error-label']} ${
            !errorMessage ? styles.undisplayed : ''
          }`}
        >
          {errorMessage}
        </label>
        <label
          className={`${styles['error-label']} ${
            isEmailValid ? styles.undisplayed : ''
          }`}
        >
          Невалідний email
        </label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <label
          className={`${styles['error-label']} ${
            isPasswordValid ? styles.undisplayed : ''
          }`}
        >
          Невалідний пароль
        </label>
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button type="submit">Увійти</button>

        <p className={styles.links}>
          <Link href="/register">Реєстрація</Link>
          <Link href="/reset-password">Забули пароль</Link>
        </p>
      </form>
    </div>
  );
}
