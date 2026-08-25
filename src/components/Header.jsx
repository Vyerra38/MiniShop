import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  return (
    <header className="bg-green-200 p-4 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-2">
        
        {/* Logo / Judul */}
        <div className="text-xl font-bold text-gray-800">
          MINISHOP
        </div>

        {/* Menu Navigasi menggunakan Link */}
        <nav className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm sm:text-base">
          <Link to="/" className="hover:underline">Beranda</Link>
          <Link to="/keranjang" className="hover:underline">Keranjang</Link>
          <Link to="/riwayat" className="hover:underline">Riwayat Pesanan</Link>
          <Link to="/login" className="hover:underline font-medium">Login</Link>
        </nav>

      </div>
    </header>
  );
}

export default Header;