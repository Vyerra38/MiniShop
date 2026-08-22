import { Link } from "react-router-dom";
import Button from './Button';
import Badge from './Badge';
import {useKeranjang} from '../context/KeranjangContext';
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
    <div className="produk-card" style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '200px' , borderRadius: '10px', textAlign: 'center', backgroundColor: '#f9f8f8ea'}}>
      <div style={{ textAlign:'left', marginBottom: '10px' }}>
        <Badge text="Baru" backgroundColor="skyblue"/>
      </div>
      
      {/* gabungan gambar dan judul dengan Link ke halaman detail */}
      <Link to={`/produk/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img src={image} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
        <h3>{nama}</h3>
      </Link>

      <p>Harga: Rp. {harga.toLocaleString('id-ID')}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '15px' }}>
        
        {/* Baris Atas: Lihat Detail dan Ikon Keranjang Berdampingan */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5px' }}>
          <Link 
            to={`/produk/${id}`} 
            style={{ flex: 1, padding: '6px', fontSize: '13px', backgroundColor: '#e0e0e0', color: '#333', textDecoration: 'none', borderRadius: '5px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyItem: 'center', justifyContent: 'center'
            }}
          >
            Lihat Detail
          </Link>

          <button 
            onClick={() => {
              tambahKeKeranjang({ id, nama, harga, image });
              alert(nama + " berhasil ditambahkan ke keranjang!");
            }}
            style={{ padding: '6px 12px', cursor:'pointer', backgroundColor: 'pink', border: 'none', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart-icon lucide-shopping-cart">
              <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
            </svg>
          </button>
        </div>
        <Button 
          onClick={beliSekarang} 
          style={{ 
            backgroundColor: "#16a34a",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
            width: "100%"
           }}>
            Beli Sekarang
        </Button>
      </div>
    </div>
  );
}

export default ProdukCard;