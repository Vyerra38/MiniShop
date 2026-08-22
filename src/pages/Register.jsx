import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    konfirmasiPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.email.includes("@")) {
      setError("Email tidak valid");
      return;
    }

    if (form.password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    if (form.password !== form.konfirmasiPassword) {
      setError("Konfirmasi password tidak sama");
      return;
    }

    // 1. Ambil data user yang sudah pernah daftar sebelumnya (jika ada)
    const existingUsers = JSON.parse(localStorage.getItem("daftarUser")) || [];

    // 2. Cek apakah email sudah terdaftar
    const emailSudahAda = existingUsers.find((u) => u.email === form.email);
    if (emailSudahAda) {
      setError("Email sudah terdaftar, silakan login!");
      return;
    }

    // 3. Simpan user baru ke dalam array
    const newUser = { email: form.email, password: form.password };
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem("daftarUser", JSON.stringify(updatedUsers));

    setError("");
    alert("Registrasi berhasil! Silakan login.");
    navigate("/login");
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Daftar Akun Baru</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Konfirmasi Password</label>
            <input
              type="password"
              placeholder="Ulangi Password"
              value={form.konfirmasiPassword}
              onChange={(e) => setForm({ ...form, konfirmasiPassword: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition"
          >
            Daftar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;