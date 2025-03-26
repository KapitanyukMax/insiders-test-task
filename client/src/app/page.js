'use client';
import { useAuth } from './context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login');
    } else if (!loading) {
      console.log(user);
    }
  }, [user, loading, router]);

  function handleProfileClick() {
    router.push('/profile');
  }

  if (loading) return <p>Loading...</p>;

  if (!user) return null;

  return (
    <>
      <h1>Вітаємо, {user.name}</h1>
      <button onClick={handleProfileClick}>
        Профіль
      </button>
    </>
  );
}
