import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function RiwayatPesanan() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    // Ambil data riwayat dari localStorage saat halaman dibuka
    const savedOrders = JSON.parse(localStorage.getItem("riwayatPesanan")) || [];
    
    // Filter pesanan agar hanya menampilkan milik user yang sedang login saat ini
    const userOrders = savedOrders.filter(order => order.user === user?.email);
    setOrders(userOrders);
  }, [user]);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>Riwayat Pesanan Saya</h1>
      
      {orders.length === 0 ? (
        <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", border: "1px solid #ccc" }}>
          <p style={{ color: "#666", margin: 0 }}>Belum ada pesanan yang diselesaikan.</p>
        </div>
      ) : (
        orders.map((order) => (
          <div 
            key={order.id} 
            style={{ 
              background: "#fff", 
              padding: "20px", 
              marginBottom: "20px", 
              borderRadius: "8px", 
              border: "1px solid #ccc",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
              <span style={{ fontSize: "14px", color: "#666" }}>Tanggal: <strong>{order.date}</strong></span>
              <span style={{ fontSize: "14px", color: "#16a34a", fontWeight: "bold" }}>Berhasil Diselesaikan</span>
            </div>

            {/* Menampilkan daftar barang yang dibeli dalam pesanan ini */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "15px" }}>
              {order.items.map((item, index) => (
                <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "15px" }}>{item.nama} x {item.quantity}</span>
                  <span style={{ fontSize: "15px", color: "#555" }}>Rp {(item.harga * item.quantity).toLocaleString("id-ID")}</span>
                </div>
              ))}
            </div>
            
            <div style={{ borderTop: "1px solid #eee", paddingTop: "10px", display: "flex", justifyContent: "space-between" }}>
              <strong>Total Belanja:</strong>
              <strong style={{ color: "#2563eb" }}>Rp {order.total.toLocaleString("id-ID")}</strong>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default RiwayatPesanan;