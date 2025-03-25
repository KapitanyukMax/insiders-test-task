import './styles/globals.css';
import { AuthProvider } from './context/authContext';

export const metadata = {
  title: 'Authentication App',
  description: 'Insiders Test Task',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
