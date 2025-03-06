'use client';

import Link from 'next/link';
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";
import '@/style/login.css';

export default function AdmPage() {
  return (
    <div className="login-container">
      <div className="login-box admin-box">
        <h1 className="login-title">Painel Administrativo</h1>
        
        <div className="admin-buttons">
          <Link href="/adicionar" className="admin-button">
            <IoMdAdd />
            <span>ADICIONAR</span>
          </Link>

          <Link href="/deletar" className="admin-button">
            <MdDelete />
            <span>DELETAR</span>
          </Link>

          <Link href="/criar-usuario" className="admin-button">
            <FaUserShield />
            <span>ADMINISTRAÇÃO</span>
          </Link>
        </div>

        <div className="login-links">
          <a href="/" className="login-link">Voltar</a>
        </div>
      </div>
    </div>
  );
} 