import { useState, useEffect } from "react";
import ProdukCard from "../components/ProdukCard";
import { DaftarProduk } from "../data/produk"; 

function Home() {
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [kataKunci, setKataKunci] = useState("");
  const [kategoriPilihan, setKategoriPilihan] = useState("Semua");

  const [halamanAktif, setHalamanAktif] = useState(1);
  const produkPerHalaman = 4; // Jumlah produk per halaman

  useEffect(() => {
    // Simulasi fetch data lokal menggunakan Promise & setTimeout (seolah-olah dari server)
    const ambilDataLokal = new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulasi kondisi berhasil atau gagal (misal kita anggap selalu sukses)
        if (DaftarProduk) {
          resolve(DaftarProduk);
        } else {
          reject(new Error("Gagal memuat data produk lokal"));
        }
      }, 1000); // Jeda waktu 1 detik untuk simulasi loading
    });

    ambilDataLokal
      .then((data) => {
        setProduk(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Tampilan saat data sedang dimuat (memenuhi syarat modul Minggu 10)
  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">Memuat produk toko...</p>
      </div>
    );
  }

  // Tampilan jika terjadi error
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 font-semibold">Terjadi kesalahan: {error}</p>
      </div>
    );
  }

  // Logika pencarian : Berdasarkan Kata Kunci DAN Kategori
  const produkTersaring = produk.filter((item) => {
    const cocokNama = item.nama.toLowerCase().includes(kataKunci.toLowerCase());
    const cocokKategori = kategoriPilihan === "Semua" || item.kategori === kategoriPilihan;
    return cocokNama && cocokKategori;
  });

  // Logika Pagination
  const indexAkhir = halamanAktif * produkPerHalaman;
  const indexMulai = indexAkhir - produkPerHalaman;
  const produkTampil = produkTersaring.slice(indexMulai, indexAkhir);

  const totalHalaman = Math.ceil(produkTersaring.length / produkPerHalaman);

  const keHalamanBerikutnya = () => {
    if (halamanAktif < totalHalaman) {
      setHalamanAktif(halamanAktif + 1);
    };
  };

  const keHalamanSebelumnya = () => {
    if (halamanAktif > 1) {
      setHalamanAktif(halamanAktif - 1);
    };
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Teks Sambutan */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Selamat Datang di Minishop!</h2>
        <p className="text-gray-600 mt-1">Silakan pilih produk favoritmu di bawah ini.</p>

        {/* Input Pencarian */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Cari produk..."
            value={kataKunci}
            onChange={(e) => {
              setKataKunci(e.target.value); 
              setHalamanAktif(1);
            }} // Reset halaman ke 1 saat kata kunci berubah
            style={{
              padding: "8px 16px",
              width: "300px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />
          {/* Dropdown Filter Kategori (Tugas Mingguan) */}
          <select
            value={kategoriPilihan}
            onChange={(e) => setKategoriPilihan(e.target.value)}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
              backgroundColor: "#fff",
            }}
          >
            <option value="Semua">Semua Kategori</option>
            <option value="Buket">Fresh Flowers</option>
            <option value="flower">Artificial Flowers</option>
          </select>
        </div>
      </div>

      {/* Menampilkan daftar produk dari data lokal yang disimulasikan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {produkTersaring.length === 0 ? (
          <p className="text-gray-500 col-span-full">Produk tidak ditemukan.</p>
        ) : (
          produkTampil.map((item) => (
            <ProdukCard
              key={item.id}
              id={item.id}
              nama={item.nama}
              harga={item.harga}
              image={item.image}
            />
          ))
        )}
      </div>
      {totalHalaman > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
          onClick={keHalamanSebelumnya}
          disabled={halamanAktif === 1}
          className="px-4 py-2 border rounded-lg bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            Sebelumnya
          </button>

        <span className="text-gray-700 font-medium">
          Halaman {halamanAktif} dari {totalHalaman}
        </span>

        <button
          onClick={keHalamanBerikutnya}
          disabled={halamanAktif === totalHalaman}
          className="px-4 py-2 border rounded-lg bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          Selanjutnya
        </button>
        </div>
      )}
    </div>
  );
}

export default Home;