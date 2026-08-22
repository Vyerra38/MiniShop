import { BrowserRouter, Routes, Route } from "react-router-dom";
import {AuthProvider} from './context/AuthContext.jsx';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import DetailProduk from './pages/DetailProduk.jsx';
import Keranjang from './pages/Keranjang.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import RiwayatPesanan from './pages/RiwayatPesanan.jsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div>

          <main style={{ padding: '20px', backgroundColor: '#f4d6e4e4', minHeight: '80vh' }}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/produk/:id" element={<DetailProduk />} />
                <Route path="/keranjang" element={<Keranjang />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/riwayat" element={<RiwayatPesanan />} />

                {/* untuk menampilkan Halaman 404 */}
                <Route path="*" element={<h2 style={{ textAlign: 'center', padding: '50px' }}>404 - Halaman Tidak Ditemukan</h2>} />
              </Route>
            </Routes>
          </main>

        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;