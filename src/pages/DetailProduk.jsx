import { useParams, useNavigate, Link } from "react-router-dom";
import { DaftarProduk } from "../data/produk"; 
import { useKeranjang } from "../context/KeranjangContext";
import { useAuth } from "../context/AuthContext";

function DetailProduk() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tambahKeKeranjang } = useKeranjang();
  const { user } = useAuth();

  // memastikan tipe data id cocok dengan tipe data produk.id (Number)
  const produk = DaftarProduk.find((p) => p.id === Number(id));

  if (!produk) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Produk tidak ditemukan</h2>
        <Link to="/" style={{ color: "#2563eb", textDecoration: "underline" }}>Kembali ke Beranda</Link>
      </div>
    );
  }

  // Fungsi Tambah ke Keranjang dari halaman detail
  const handleTambahKeranjang = () => {
    tambahKeKeranjang(produk);
    alert(`${produk.nama} berhasil ditambahkan ke keranjang!`);
  };

  // Fungsi Beli Sekarang dari halaman detail
  const handleBeliSekarang = () => {
    if (!user) {
      alert("Silakan login terlebih dahulu untuk membeli produk!");
      navigate("/login");
      return;
    }
    tambahKeKeranjang(produk);
    navigate("/keranjang");
  };

  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
      <Link to="/" style={{ textDecoration: "none", color: "#666", marginBottom: "20px", display: "inline-block" }}>
        &larr; Kembali ke Beranda
      </Link>

      <div style={{ display: "flex", gap: "30px", background: "#fff", padding: "20px", borderRadius: "10px", border: "1px solid #ddd", flexWrap: "wrap" }}>
        
        {/* Gambar Produk */}
        <div style={{ flex: "1", minWidth: "250px" }}>
          <img 
            src={produk.image} 
            alt={produk.nama} 
            style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "8px" }} 
          />
        </div>

        {/* Informasi Detail Produk */}
        <div style={{ flex: "1.5", minWidth: "250px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ margin: "0 0 10px 0", fontSize: "24px" }}>{produk.nama}</h2>
            <p style={{ fontSize: "20px", fontWeight: "bold", color: "#2563eb", marginBottom: "15px" }}>
              Rp {produk.harga.toLocaleString("id-ID")}
            </p>
            <p style={{ color: "#555", lineHeight: "1.5", marginBottom: "20px" }}>
              {produk.deskripsi || "Deskripsi produk belum tersedia. Produk ini berkualitas tinggi dan siap menemani kebutuhanmu!"}
            </p>
          </div>

          {/* Tombol Aksi */}
          <div style={{ display: "flex", gap: "10px" }}>
            <button 
              onClick={handleTambahKeranjang}
              style={{ 
                flex: 1, 
                padding: "10px", 
                backgroundColor: "#fbcfe8", 
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