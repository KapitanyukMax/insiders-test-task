'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext.js';
import { useValidation } from '../hooks/validation.js';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailTaken, setIsEmailTaken] = useState(false);
  const {
    isEmailValid,
    setIsEmailValid,
    isPasswordValid,
    revalidateEmail,
    revalidatePassword,
    validateEmailAndPassword,
  } = useValidation();
  const { handleRegister, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/profile');
    }
  }, [user, router]);

  if (loading) return <p>Loading...</p>;

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmailAndPassword(email, password)) {
      return;
    }

    try {
      await handleRegister(name, email, password);
      router.push('/login');
    } catch (error) {
      if (
        error.message.startsWith('Email address') &&
        error.message.endsWith('is invalid')
      ) {
        setIsEmailValid(false);
        setIsEmailTaken(false);
      } else {
        setIsEmailTaken(true);
      }
    }
  };

  return (
    <div className={styles['login-page-container']}>
      <h1>Зареєструйтеся</h1>
      <form className={styles['login-form']} onSubmit={handleSubmit}>
        <label
          className={`${styles['error-label']} ${
            !isEmailTaken ? styles.undisplayed : ''
          }`}
        >
          Акаунт з таким email вже існує
        </label>
        <input
          type="text"
          placeholder="Ім'я"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button type="submit">Зареєструватися</button>

        <p className={styles.links}>
          <Link href="/login">Вхід</Link>
        </p>
      </form>
    </div>
  );
}
