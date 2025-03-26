'use client';
import { useEffect, useRef } from 'react';
import { useAuth } from '../context/authContext.js';
import { useRouter } from 'next/navigation';
import ImageUploadModal from '../components/ImageUploadModal/index.jsx';
import styles from './page.module.css';

export default function ProfilePage() {
  const { user, loading, handleLogout } = useAuth();
  const router = useRouter();
  const modalRef = useRef(null);

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
      <ImageUploadModal ref={modalRef} user={user} />

      <p className={styles.text}>Ім&apos;я: {user.name}</p>
      <p className={styles.text}>Email: {user.email}</p>
      <button onClick={() => modalRef.current?.showModal()}>
        Оновити зображення
      </button>
      <div className={styles['button-menu-container']}>
        <button onClick={handleLogout}>Вийти</button>
        <button onClick={handleHomeClick}>Головна</button>
      </div>
    </div>
  );
}
