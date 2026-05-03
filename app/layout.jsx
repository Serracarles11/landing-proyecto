import "./globals.css";

export const metadata = {
  title: "beProfessional - Gestion deportiva, sin fricciones",
  description: "Plataforma de gestion deportiva para clubes.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
