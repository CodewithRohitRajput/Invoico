import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import './globals.css';
import Navbar from '@/(components)/navbar/page';
import Sidebar from '@/(components)/sidebar/page';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className='h-full'>
     <body className="bg-gray-50 w-full h-full m-0 p-0">
        <Navbar />
        <div className="flex h-screen w-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-auto bg-black">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}