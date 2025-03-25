"use client";
import { useAuth } from "../context/authContext.js";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, loading, handleLogout } = useAuth();
  const router = useRouter();

  if (loading) return <p>Loading...</p>;
  
  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div>
      <p>Ім&apos;я: {user.name}</p>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Вийти</button>
    </div>
  );
}
