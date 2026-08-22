import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return(
        <header style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '20px 40px', 
            backgroundColor: '#d3fcd4e4',
            width: '100%',
            boxSizing: 'border-box'
        }}>
            <h2 style={{ color: '#555', margin: 0, fontSize: '20px' }}>MINISHOP</h2>
            
            {/* Menggunakan display flex dan margin-left untuk memberi jarak */}
            <div style={{ display: 'flex',alignItems: 'center', gap: '30px' }}>
                <Link to="/" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold', fontSize: '16px' }}>Beranda</Link>
                <Link to="/keranjang" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold', fontSize: '16px' }}>Keranjang</Link>
                <Link to="/riwayat" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold', fontSize: '16px' }}>Riwayat Pesanan</Link>

                {user ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <span style={{ color: '#555', fontSize: '16px' }}>Halo, {user.email}</span>
                        <button
                            onClick={() => {
                                logout();
                                navigate("/login");
                            }}
                            style={{ color: '#dc2626', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link to="/login" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold', fontSize: '16px' }}>
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
}

export default Header;