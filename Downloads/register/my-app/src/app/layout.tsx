'use client';

import '../style/cabecalho.css';
import Link from 'next/link';
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login' || pathname === '/login-adm' || pathname === '/registro-adm';

  const handleLogout = () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    window.location.href = '/login';
  };

  return (
    <html lang="pt-BR">
      <body>
        <header className="header">
          <div className="container">
            <Link href="/" className="logo">
              FRANCIEL
            </Link>
            <nav>
              <ul className="nav-links">
                {!isLoginPage && (
                  <>
                    <li>
                      <Link href="/adicionar" className="nav-link">
                        <IoMdAdd />
                        <span>ADICIONAR</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/deletar" className="nav-link">
                        <MdDelete />
                        <span>DELETAR</span>
                      </Link>
                    </li>
                  </>
                )}
                <li>
                  <button onClick={handleLogout} className="nav-link logout-button">
                    SAIR
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}
