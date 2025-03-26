'use client';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/authContext.js';
import { useRouter } from 'next/navigation';
import { useValidation } from '../hooks/validation.js';
import Link from 'next/link';
import styles from './page.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { isEmailValid, validateEmail, revalidateEmail } = useValidation();
  const { handleResetPassword, user, loading } = useAuth();
  const router = useRouter();
  const modalRef = useRef(null);

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

  if (loading) return <p>Loading...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return;
    }

    try {
      const message = await handleResetPassword(email);
      console.log(message);
      modalRef.current?.showModal();
    } catch (error) {
      if (error.message === 'Email not confirmed') {
        setErrorMessage('Підтвердіть email');
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div className={styles['login-page-container']}>

      <dialog ref={modalRef} className={styles.modal}>
        <h2>Email з інструкціями надіслано</h2>
        <button onClick={() => router.push('/login')}>Гаразд</button>
      </dialog>

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
        <button type="submit">Увійти</button>

        <p className={styles.links}>
          <Link href="/register">Реєстрація</Link>
          <Link href="/login">Вхід</Link>
        </p>
      </form>
    </div>
  );
}
