import "./globals.css";

export const metadata = {
  title: "beProfessional - Gestion deportiva, sin fricciones",
  description: "Plataforma de gestion deportiva para clubes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
