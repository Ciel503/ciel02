import '../style/cabecalho.css';
import Link from 'next/link';
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
