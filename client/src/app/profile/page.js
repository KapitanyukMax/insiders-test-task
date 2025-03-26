'use client';
import { useEffect } from 'react';
import { useAuth } from '../context/authContext.js';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function ProfilePage() {
  const { user, loading, handleLogout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login');
    }
  }, [user, loading, router]);

  function handleHomeClick() {
    router.push('/');
  }

  if (loading) return <p>Loading...</p>;

  if (!user) return null;

  return (
    <div>
      <p className={styles.text}>Ім&apos;я: {user.name}</p>
      <p className={styles.text}>Email: {user.email}</p>
      <div className={styles['button-menu-container']}>
        <button onClick={handleLogout}>Вийти</button>
        <button onClick={handleHomeClick}>Головна</button>
      </div>
    </div>
  );
}
