import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useKeranjang } from "../context/KeranjangContext";
import { useAuth } from "../context/AuthContext";

function Keranjang() {
  const { item, hapusDariKeranjang, ubahJumlah, kosongkanKeranjang } = useKeranjang(); 
  const { user } = useAuth();
  const navigate = useNavigate();

  const [metodePembayaran, setMetodePembayaran] = useState("Transfer Bank");

  const total = item.reduce((sum, p) => sum + (p.harga * p.quantity), 0);

  const handleCheckout = () => {
    if (!user) {
      alert("Silakan login terlebih dahulu untuk melakukan checkout!");
      navigate("/login");
      return;
    }

    if (item.length === 0) {
      alert("Keranjang masih kosong!");
      return;
    }

    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleDateString("id-ID"),
      user: user.email, 
      items: item,
      total: total,
      metodePembayaran: metodePembayaran,
    };

    const existingOrders = JSON.parse(localStorage.getItem("riwayatPesanan")) || [];
    const updatedOrders = [newOrder, ...existingOrders];
    localStorage.setItem("riwayatPesanan", JSON.stringify(updatedOrders));

    if (typeof kosongkanKeranjang === "function") {
      kosongkanKeranjang();
    } else {
      item.forEach(produk => hapusDariKeranjang(produk.id));
    }

    alert(`Checkout berhasil via ${metodePembayaran}! Pesanan Anda telah dicatat.`);
    navigate("/riwayat");
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '850px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ marginBottom: '25px', color: '#333', textAlign: 'center' }}>Keranjang Belanja Kamu</h2>
      
      {item.length === 0 ? (
        <div style={{ background: '#fff', padding: '40px', borderRadius: '12px', textAlign: 'center', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <p style={{ fontWeight: 'bold', color: '#666', marginBottom: '15px', fontSize: '16px' }}>Keranjang kamu masih kosong.</p>
          <button 
            onClick={() => navigate("/")}
            style={{ padding: '10px 20px', backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Mulai Belanja
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Daftar Produk di Keranjang (Dibuat Full Lebar & Simetris) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {item.map((produk) => (
              <div key={produk.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #e5e7eb', padding: '15px 20px', borderRadius: '12px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <img src={produk.image} alt={produk.nama} style={{ width: '75px', height: '75px', objectFit: 'cover', borderRadius: '8px' }} />
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '18px', color: '#1f2937' }}>{produk.nama}</h4>
                    <p style={{ margin: 0, color: '#4b5563', fontWeight: '600' }}>Rp. {produk.harga.toLocaleString('id-ID')}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#f9fafb' }}>
                    <button onClick={() => ubahJumlah(produk.id, produk.quantity - 1)} style={{ padding: '6px 12px', background: '#e5e7eb', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>-</button>
                    <span style={{ padding: '0 15px', fontWeight: 'bold' }}>{produk.quantity}</span>
                    <button onClick={() => ubahJumlah(produk.id, produk.quantity + 1)} style={{ padding: '6px 12px', background: '#e5e7eb', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+</button>
                  </div>
                  <button onClick={() => hapusDariKeranjang(produk.id)} style={{ padding: '8px 12px', backgroundColor: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>Hapus</button>
                </div>

              </div>
            ))}
          </div>

          {/* Kotak Ringkasan & Pembayaran (Di Tengah & Lebar) */}
          <div style={{ background: '#fff', padding: '25px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '15px' }}>
              <span style={{ fontSize: '18px', color: '#4b5563', fontWeight: '500' }}>Total Belanja:</span>
              <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#16a34a' }}>Rp {total.toLocaleString('id-ID')}</span>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '12px', color: '#374151', fontSize: '15px' }}>Pilih Metode Pembayaran:</label>
              <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '15px', color: '#4b5563', padding: '8px', border: '1px solid #f3f4f6', borderRadius: '6px', background: metodePembayaran === "Transfer Bank" ? '#f0fdf4' : 'transparent' }}>
                  <input 
                    type="radio" 
                    name="metode" 
                    value="Transfer Bank" 
                    checked={metodePembayaran === "Transfer Bank"} 
                    onChange={(e) => setMetodePembayaran(e.target.value)} 
                  /> Transfer Bank (BCA / Mandiri)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '15px', color: '#4b5563', padding: '8px', border: '1px solid #f3f4f6', borderRadius: '6px', background: metodePembayaran === "E-Wallet (GoPay / DANA)" ? '#f0fdf4' : 'transparent' }}>
                  <input 
                    type="radio" 
                    name="metode" 
                    value="E-Wallet (GoPay / DANA)" 
                    checked={metodePembayaran === "E-Wallet (GoPay / DANA)"} 
                    onChange={(e) => setMetodePembayaran(e.target.value)} 
                  /> E-Wallet (GoPay / DANA)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '15px', color: '#4b5563', padding: '8px', border: '1px solid #f3f4f6', borderRadius: '6px', background: metodePembayaran === "COD (Bayar di Tempat)" ? '#f0fdf4' : 'transparent' }}>
                  <input 
                    type="radio" 
                    name="metode" 
                    value="COD (Bayar di Tempat)" 
                    checked={metodePembayaran === "COD (Bayar di Tempat)"} 
                    onChange={(e) => setMetodePembayaran(e.target.value)} 
                  /> COD (Bayar di Tempat)
                </label>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              style={{
                backgroundColor: '#16a34a',
                color: 'white',
                padding: '14px 20px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '16px',
                width: '100%',
                boxShadow: '0 4px 6px rgba(22, 163, 74, 0.2)'
              }}
            >
              Selesaikan Pesanan (Checkout)
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default Keranjang;