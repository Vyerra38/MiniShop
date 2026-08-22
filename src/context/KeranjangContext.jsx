import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const KeranjangContext = createContext();

export function KeranjangProvider({ children }) {
  const [item, setItem] = useLocalStorage("keranjang_belanja", []);

  function tambahKeKeranjang(produk) {
    setItem((prevItem) => {
      // Cek produk sudah ada di keranjang sebelumnya
      const ada = prevItem.find((p) => p.id === produk.id);
      
      if (ada) {
        // tambah quantity-nya
        return prevItem.map((p) => 
          p.id === produk.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        // Jika belum ada, masukkan produk baru dengan quantity 1
        return [...prevItem, { ...produk, quantity: 1 }];
      }
    });
  }

  function hapusDariKeranjang(id) {
    setItem((prev) => prev.filter((p) => p.id !== id));
  }

  function ubahJumlah(id, jumlahBaru) {
    if (jumlahBaru <= 0) {
      hapusDariKeranjang(id);
      return;
    }
    setItem((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: jumlahBaru } : p))
    );
  }

  return (
    <KeranjangContext.Provider value={{ item, tambahKeKeranjang, hapusDariKeranjang, ubahJumlah }}>
      {children}
    </KeranjangContext.Provider>
  );
}

export function useKeranjang() {
  return useContext(KeranjangContext);
}