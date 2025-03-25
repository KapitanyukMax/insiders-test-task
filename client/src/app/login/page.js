'use client';
import { useState } from 'react';
import { useAuth } from '../context/authContext.js';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginUnsuccessful, setIsLoginUnsuccessful] = useState(false);
  const { handleLogin, user } = useAuth();
  const router = useRouter();

  if (user) {
    router.push('/profile');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(email, password);
      router.push('/profile');
    } catch (err) {
      setIsLoginUnsuccessful(true);
    }
  };

  return (
    <div className={styles['login-page-container']}>
      <h1>Увійдіть</h1>
      <form className={styles['login-form']} onSubmit={handleSubmit}>
        <label
          className={`${styles['error-label']} ${
            !isLoginUnsuccessful ? styles.invisible : ''
          }`}
        >
          Неправильний email або пароль
        </label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Увійти</button>

        <p className={styles.links}><a href='/register'>Реєстрація</a> <a href='/reset-password'>Забули пароль</a></p>
      </form>
    </div>
  );
}
