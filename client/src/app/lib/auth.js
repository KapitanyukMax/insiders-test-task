const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const register = async (name, email, password) => {
  const res = await fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Registration failed');
  return res.json();
};

export const login = async (email, password) => {
  const res = await fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Login failed');
  return res.json();
};

export const getProfile = async () => {
  const res = await fetch(`${apiUrl}/profile`, { credentials: 'include' });

  if (!res.ok) return null;
  return res.json();
};

export const logout = async () => {
  await fetch(`${apiUrl}/logout`, { method: 'POST', credentials: 'include' });
};
