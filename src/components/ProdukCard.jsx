import { Link } from "react-router-dom";
import Button from './Button';
import { useKeranjang } from '../context/KeranjangContext';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProdukCard({ id, nama, harga, image }) {
  const { tambahKeKeranjang } = useKeranjang();
  const { user } = useAuth();
  const navigate = useNavigate();

  const beliSekarang = () => {
    // Cek apakah user sudah login
    if (!user) {
      alert("Silakan login terlebih dahulu untuk membeli produk!");
      navigate("/login");
      return;
    }

    // Jika sudah login, lanjut proses beli
    tambahKeKeranjang({ id, nama, harga, image });
    navigate("/keranjang");
  };

  return (
    <div 
      className="produk-card" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        border: '1px solid #ccc', 
        padding: '10px', 
        margin: '10px', 
        width: '200px', 
        borderRadius: '10px', 
        textAlign: 'center', 
        backgroundColor: '#f9f8f8ea',
        height: '100%' 
      }}
    >
      
      {/* Gabungan gambar dan judul dengan Link ke halaman detail */}
      <Link to={`/produk/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img 
          src={image} 
          alt={nama} 
          style={{ 
            width: '100%', 
            height: '200px', 
            objectFit: 'contain', 
            borderRadius: '8px', 
            padding: '10px', 
            backgroundColor: 'white',
            display: 'block' 
          }} 
        />
        <h3>{nama}</h3>
      </Link>

      <p>Harga: Rp. {harga.toLocaleString('id-ID')}</p>

      {/* marginTop: 'auto' berfungsi mendorong bagian tombol ini agar selalu rata di bawah */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
        
        {/* Baris Atas: Lihat Detail dan Ikon Keranjang Berdampingan */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5px' }}>
          <Link 
            to={`/produk/${id}`} 
            style={{ 
              flex: 1, padding: '6px', fontSize: '13px', backgroundColor: '#e0e0e0', color: '#333', textDecoration: 'none', borderRadius: '5px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}
          >
            Lihat Detail
          </Link>

          <button 
            onClick={() => {
              tambahKeKeranjang({ id, nama, harga, image });
              alert(nama + " berhasil ditambahkan ke keranjang!");
            }}
            style={{ padding: '6px 12px', cursor: 'pointer', backgroundColor: 'grey', border: 'none', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart-icon lucide-shopping-cart">
              <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
            </svg>
          </button>
        </div>

        <button 
          onClick={beliSekarang} 
          style={{ flex: 1, padding: '6px', fontSize: '13px', backgroundColor: "grey", color: "black", textDecoration: 'none', borderRadius: '5px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' , cursor: "pointer", fontWeight: "bold", width: "100%" }}
        >
           Beli Sekarang
        </button>
      </div>
    </div>
  );
}

export default ProdukCard;