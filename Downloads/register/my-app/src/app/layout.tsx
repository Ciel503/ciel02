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
  const isMainPage = pathname === '/';
  const isAdminPage = pathname === '/adicionar' || pathname === '/deletar' || pathname === '/adm' || pathname === '/criar-usuario';

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
                {!isLoginPage && !isMainPage && (
                  <>
                    {pathname !== '/adm' && (
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
                    {isAdminPage && pathname !== '/adm' && (
                      <li>
                        <Link href="/criar-usuario" className="nav-link admin-link">
                          <span>ADMINISTRAÇÃO</span>
                        </Link>
                      </li>
                    )}
                  </>
                )}
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
