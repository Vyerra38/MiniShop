import { createContext, useContext, useState, useEffect } from "react";

const KeranjangContext = createContext();

export function KeranjangProvider({ children }) {
  // Menggunakan localStorage agar data keranjang persis seperti modul tugas
  const [keranjang, setKeranjang] = useState(() => {
    const dataSimpanan = localStorage.getItem("keranjang");
    return dataSimpanan ? JSON.parse(dataSimpanan) : [];
  });

  useEffect(() => {
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
  }, [keranjang]);

  // Fungsi Tambah ke Keranjang
  const tambahKeKeranjang = (produkBaru) => {
    setKeranjang((prevKeranjang) => {
      const ada = prevKeranjang.find((item) => item.id === produkBaru.id);
      if (ada) {
        return prevKeranjang.map((item) =>
          item.id === produkBaru.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prevKeranjang, { ...produkBaru, quantity: 1 }];
    });
  };

  // 1. FUNGSI UBAH JUMLAH (+ / -)
  const ubahJumlah = (id, jumlahBaru) => {
    setKeranjang((prevKeranjang) =>
      prevKeranjang
        .map((item) => {
          if (item.id === id) {
            return { ...item, quantity: jumlahBaru };
          }
          return item;
        })
        .filter((item) => item.quantity > 0) // Otomatis hapus jika jumlah 0
    );
  };

  // 2. FUNGSI HAPUS DARI KERANJANG
  const hapusDariKeranjang = (id) => {
    setKeranjang((prevKeranjang) => prevKeranjang.filter((item) => item.id !== id));
  };

  return (
    <KeranjangContext.Provider
      value={{ keranjang, tambahKeKeranjang, ubahJumlah, hapusDariKeranjang }}
    >
      {children}
    </KeranjangContext.Provider>
  );
}

export function useKeranjang() {
  return useContext(KeranjangContext);
}