import './globals.css';

export const metadata = {
  title: 'test',  // ここにページタイトルを指定
  description: 'test page',  // ここにページの説明を指定
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
