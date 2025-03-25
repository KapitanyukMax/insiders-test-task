import "./styles/globals.css";

export const metadata = {
  title: "Authentication App",
  description: "Insiders Test Task",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
