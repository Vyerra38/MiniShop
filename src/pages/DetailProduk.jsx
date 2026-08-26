import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useKeranjang } from "../context/KeranjangContext";
import { useAuth } from "../context/AuthContext";

function DetailProduk() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tambahKeKeranjang } = useKeranjang();
  const { user } = useAuth();

  const [produk, setProduk] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mengambil data produk spesifik berdasarkan ID dari Fake Store API
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Gagal mengambil data produk");
        }
        return res.json();
      })
      .then((data) => {
        setProduk(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p>Memuat detail produk...</p>
      </div>
    );
  }

  if (error || !produk) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Produk tidak ditemukan</h2>
        <Link to="/" style={{ color: "#2563eb", textDecoration: "underline" }}>Kembali ke Beranda</Link>
      </div>
    );
  }

  // Konversi harga dari USD ke Rupiah (menyesuaikan dengan Home)
  const hargaRupiah = Math.round(produk.price * 15500);

  // Data terstandarisasi untuk keranjang
  const produkUntukKeranjang = {
    id: produk.id,
    nama: produk.title,
    harga: hargaRupiah,
    image: produk.image
  };

  // Fungsi Tambah ke Keranjang dari halaman detail
  const handleTambahKeranjang = () => {
    tambahKeKeranjang(produkUntukKeranjang);
    alert(`${produk.title} berhasil ditambahkan ke keranjang!`);
  };

  // Fungsi Beli Sekarang dari halaman detail
  const handleBeliSekarang = () => {
    if (!user) {
      alert("Silakan login terlebih dahulu untuk membeli produk!");
      navigate("/login");
      return;
    }
    tambahKeKeranjang(produkUntukKeranjang);
    navigate("/keranjang");
  };

  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
      <Link to="/" style={{ textDecoration: "none", color: "#666", marginBottom: "20px", display: "inline-block" }}>
        &larr; Kembali ke Beranda
      </Link>

      <div style={{ display: "flex", gap: "30px", background: "#fff", padding: "20px", borderRadius: "10px", border: "1px solid #ddd", flexWrap: "wrap" }}>
        
        {/* Gambar Produk */}
        <div style={{ flex: "1", minWidth: "250px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#fff", padding: "10px", borderRadius: "8px" }}>
          <img 
            src={produk.image} 
            alt={produk.title} 
            style={{ width: "100%", maxHeight: "300px", objectFit: "contain", borderRadius: "8px" }} 
          />
        </div>

        {/* Informasi Detail Produk */}
        <div style={{ flex: "1.5", minWidth: "250px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ margin: "0 0 10px 0", fontSize: "24px" }}>{produk.title}</h2>
            <p style={{ fontSize: "20px", fontWeight: "bold", color: "#2563eb", marginBottom: "15px" }}>
              Rp {hargaRupiah.toLocaleString("id-ID")}
            </p>
            <p style={{ color: "#555", lineHeight: "1.5", marginBottom: "20px" }}>
              {produk.description}
            </p>
          </div>

          {/* Tombol Aksi */}
          <div style={{ display: "flex", gap: "10px" }}>
            <button 
              onClick={handleTambahKeranjang}
              style={{ 
                flex: 1, 
                padding: "10px", 
                backgroundColor: "pink", 
                border: "none", 
                borderRadius: "6px", 
                cursor: "pointer", 
                fontWeight: "bold",
                color: "#9d174d"
              }}
            >
              + Keranjang
            </button>
            <button 
              onClick={handleBeliSekarang}
              style={{ 
                flex: 1, 
                padding: "10px", 
                backgroundColor: "#16a34a", 
                color: "white", 
                border: "none", 
                borderRadius: "6px", 
                cursor: "pointer", 
                fontWeight: "bold" 
              }}
            >
              Beli Sekarang
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DetailProduk;