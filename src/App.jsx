import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import { AuthProvider } from './context/AuthContext.jsx';
import Layout from './components/Layout.jsx';

// Menggunakan Lazy Loading untuk halaman-halaman
const Home = lazy(() => import('./pages/Home.jsx'));
const DetailProduk = lazy(() => import('./pages/DetailProduk.jsx'));
const Keranjang = lazy(() => import('./pages/Keranjang.jsx'));
const Register = lazy(() => import('./pages/Register.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const RiwayatPesanan = lazy(() => import('./pages/RiwayatPesanan.jsx'));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '50px' }}>Memuat halaman...</div>}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/produk/:id" element={<DetailProduk />} />
              <Route path="/keranjang" element={<Keranjang />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/riwayat" element={<RiwayatPesanan />} />

              {/* Halaman 404 */}
              <Route 
                path="*" 
                element={
                  <div style={{ textAlign: 'center', padding: '50px' }}>
                    <h2>404 - Halaman Tidak Ditemukan</h2>
                  </div>
                } 
              />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;