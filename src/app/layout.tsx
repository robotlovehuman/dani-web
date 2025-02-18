import "./globals.css";
import NavBar from './components/NavBar';

export const metadata = {
  title: "Retro App",
  description: "A simple retro styled site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" />
      </head>
      <body>
        <div className="min-h-screen flex">
          <NavBar />
          {/* Main Content */}
          <div className="flex-1 p-6">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
