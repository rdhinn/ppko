"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserRecord {
  user_id: string;
  nama: string;
  email: string;
  no_hp: string;
  password?: string;
  tanggal_daftar: string;
  status_akun: string;
}

interface ProfileRecord {
  profile_id: string;
  user_id: string;
  no_ktp: string;
  tanggal_lahir: string;
  golongan_darah: string;
  kontak_darurat: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserRecord | null>(null);
  const [profile, setProfile] = useState<ProfileRecord | null>(null);
  const [activeTab, setActiveTab] = useState<"card" | "db">("card");

  useEffect(() => {
    const fetchUserData = () => {
      const storedUser = localStorage.getItem("summitpass_user");
      const storedProfile = localStorage.getItem("summitpass_profile");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        // If not registered, redirect to register
        router.push("/register");
      }

      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    // Clear user auth data
    localStorage.removeItem("summitpass_user");
    localStorage.removeItem("summitpass_profile");
    localStorage.removeItem("summitpass_temp_user");
    
    // Dispatch auth state event
    window.dispatchEvent(new Event("summitpass_auth"));
    
    // Redirect to home/register
    router.push("/register");
  };

  if (!user || !profile) {
    return (
      <div className="pt-32 pb-32 flex flex-col items-center justify-center min-h-screen">
        <span className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></span>
        <p className="mt-4 text-on-surface-variant font-medium text-sm">Memuat Dashboard Pendaki...</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-32 px-6 max-w-4xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-primary/5 p-8 rounded-3xl border border-primary/10">
        <div>
          <span className="text-primary font-bold text-xs uppercase tracking-widest">Dashboard SummitPass</span>
          <h1 className="text-3xl font-headline font-black text-on-surface mt-1">
            Selamat Datang, {user.nama}!
          </h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Status Akun: <span className="bg-primary/20 text-primary px-2.5 py-0.5 rounded-full font-bold text-xs">{user.status_akun}</span>
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/mountain/prau"
            className="forest-gradient text-white px-5 py-3 rounded-2xl font-bold text-sm shadow-md hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">hiking</span>
            Pesan Pendakian
          </Link>
          <button
            onClick={handleLogout}
            className="bg-white border border-outline-variant/60 text-error px-5 py-3 rounded-2xl font-bold text-sm shadow-sm hover:bg-error/5 active:scale-95 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            Reset/Keluar
          </button>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex border-b border-outline-variant/30 gap-6">
        <button
          onClick={() => setActiveTab("card")}
          className={`pb-4 text-sm font-bold uppercase tracking-wider border-b-2 transition-all ${
            activeTab === "card"
              ? "border-primary text-primary"
              : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Kartu Pendaki Digital
        </button>
        <button
          onClick={() => setActiveTab("db")}
          className={`pb-4 text-sm font-bold uppercase tracking-wider border-b-2 transition-all ${
            activeTab === "db"
              ? "border-primary text-primary"
              : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Status Database (SQL)
        </button>
      </div>

      {/* Tab Content 1: Digital Hiker Pass Card */}
      {activeTab === "card" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Hiker Card Component */}
          <div className="md:col-span-7">
            <div className="forest-gradient rounded-3xl p-8 text-white shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[380px] card-shadow">
              {/* Pattern Background overlay */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
              
              {/* Card Header */}
              <div className="flex justify-between items-start z-10">
                <div>
                  <h3 className="font-headline font-black text-2xl tracking-widest uppercase">SUMMITPASS</h3>
                  <span className="text-[9px] tracking-[0.2em] opacity-80 uppercase font-bold">KARTU PENDAKI DIGITAL</span>
                </div>
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase border border-white/25">
                  STATUS: {user.status_akun}
                </span>
              </div>

              {/* Card Body - Profile */}
              <div className="my-8 flex items-center gap-6 z-10">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/30 bg-white/10 shrink-0">
                  <img
                    alt="Foto Profil Pendaki"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVIdhlHt_abCB2b30N_jdc1D7L7q-mR1Ul4EiVLrsmaCU-UuxHTk5m2qnQrCxUWAB_4PmXWg6ZCeJnVz1QZxl3dP0YMG6M4LcvpD1bkA8AdoG2qkqnqgYPS7q6isDy4nYsmqxyUf6TrQNkHxi9RUNaNJ9OEC0-vW5iIwpC9E6rMdQptjxVmjgvvvosJd6685mD9ZySzUxSpbEQVoyFN9eQrlRfyeanpbYHKVbYFmu33kVkfnSclyLjpH65HTT8kIexUjd3Vgj-OUI"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-xl font-bold font-headline leading-none">{user.nama}</p>
                  <p className="text-xs opacity-75 font-mono">ID: {user.user_id}</p>
                  <p className="text-xs opacity-75 font-mono">NIK: {profile.no_ktp}</p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-6 border-t border-white/20 flex justify-between items-end z-10 font-mono text-[10px]">
                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                  <div>
                    <span className="block opacity-60">GOL. DARAH</span>
                    <span className="font-bold text-sm">{profile.golongan_darah}</span>
                  </div>
                  <div>
                    <span className="block opacity-60">LAHIR</span>
                    <span className="font-bold">{profile.tanggal_lahir}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block opacity-60">TGL DAFTAR</span>
                  <span className="font-bold">{user.tanggal_daftar}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Details & QR */}
          <div className="md:col-span-5 space-y-6">
            {/* QR Code Validation ticket */}
            <div className="bg-white border border-outline-variant/30 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
              <span className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-4">Validasi SIMAKSI Digital</span>
              <div className="p-3 bg-surface-container-low rounded-2xl border border-outline-variant/20 mb-4">
                <img
                  alt="QR Code Validation"
                  className="w-32 h-32"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBD33OBC450VKt6YKc8wVSTC48uGqUXjjn19aBMlAx-gGhEhccd9I47Q5dktPu-X1qh0vqKHaS-mhO40ln4_9xEsNFOXcS9l4lpEU7xw15QgnBR91Nq4C-WqIhxoA-qfaTAuSlEC6QU9suvbj7l7TqQwdU398yokZ0W5boS2eXFmu4gHEuZ-vWbQ_PgN1FQ5ok8k5fryesKLiS5Mq6c0kiqYLyGir-dBRcvjMGXNAV8B8bXUgWbnnYlPP8Za_6p6ab02iq6zYgONks"
                />
              </div>
              <p className="text-xs text-on-surface-variant max-w-[200px] leading-relaxed">
                Pindai kode QR ini di basecamp pendakian resmi untuk validasi izin masuk.
              </p>
            </div>

            {/* Profile info list */}
            <div className="bg-white border border-outline-variant/30 rounded-3xl p-6 space-y-4 shadow-sm">
              <h4 className="font-bold text-sm text-secondary uppercase tracking-wider border-b border-outline-variant/20 pb-2">Kontak Informasi</h4>
              <div className="grid grid-cols-3 text-xs">
                <span className="text-on-surface-variant font-medium">No. HP:</span>
                <span className="col-span-2 text-on-surface font-bold font-mono">{user.no_hp}</span>
              </div>
              <div className="grid grid-cols-3 text-xs">
                <span className="text-on-surface-variant font-medium">Email:</span>
                <span className="col-span-2 text-on-surface font-bold">{user.email}</span>
              </div>
              <div className="grid grid-cols-3 text-xs">
                <span className="text-on-surface-variant font-medium">Darurat:</span>
                <span className="col-span-2 text-on-surface font-bold font-mono">{profile.kontak_darurat}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 2: Visual SQL Database Representation */}
      {activeTab === "db" && (
        <div className="space-y-8">
          <div className="bg-surface-container/30 border border-outline-variant/30 rounded-3xl p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-3xl">database</span>
              <div>
                <h3 className="font-headline font-bold text-xl">Database Simulator (SQLite/PostgreSQL)</h3>
                <p className="text-xs text-on-surface-variant">Berikut adalah representasi tabel database relasional yang tersimpan di sistem.</p>
              </div>
            </div>

            {/* Table Users */}
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-primary/10 px-4 py-2.5 rounded-xl border border-primary/20">
                <span className="font-mono text-xs font-black text-primary">Tabel: Users</span>
                <span className="bg-white text-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-mono">5 Kolom</span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-outline-variant/30">
                <table className="w-full text-left border-collapse font-mono text-xs">
                  <thead>
                    <tr className="bg-surface-container-high text-on-surface-variant border-b border-outline-variant/30">
                      <th className="p-3 font-bold">user_id (PK)</th>
                      <th className="p-3 font-bold">nama</th>
                      <th className="p-3 font-bold">email</th>
                      <th className="p-3 font-bold">no_hp</th>
                      <th className="p-3 font-bold">password</th>
                      <th className="p-3 font-bold">tanggal_daftar</th>
                      <th className="p-3 font-bold">status_akun</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b border-outline-variant/20 hover:bg-surface-container-low/40">
                      <td className="p-3 font-bold text-primary">{user.user_id}</td>
                      <td className="p-3 text-on-surface font-medium">{user.nama}</td>
                      <td className="p-3 text-on-surface-variant">{user.email}</td>
                      <td className="p-3 text-on-surface-variant">{user.no_hp}</td>
                      <td className="p-3 text-on-surface-variant italic">******** (disamarkan)</td>
                      <td className="p-3 text-on-surface-variant">{user.tanggal_daftar}</td>
                      <td className="p-3 font-bold"><span className="text-primary bg-primary-container px-2 py-0.5 rounded text-[10px] uppercase font-sans font-bold">Aktif</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table Profil Pendaki */}
            <div className="space-y-3 pt-4">
              <div className="flex justify-between items-center bg-secondary/10 px-4 py-2.5 rounded-xl border border-secondary/20">
                <span className="font-mono text-xs font-black text-secondary">Tabel: Profil Pendaki</span>
                <span className="bg-white text-secondary px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-mono">6 Kolom</span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-outline-variant/30">
                <table className="w-full text-left border-collapse font-mono text-xs">
                  <thead>
                    <tr className="bg-surface-container-high text-on-surface-variant border-b border-outline-variant/30">
                      <th className="p-3 font-bold">profile_id (PK)</th>
                      <th className="p-3 font-bold">user_id (FK)</th>
                      <th className="p-3 font-bold">no_ktp</th>
                      <th className="p-3 font-bold">tanggal_lahir</th>
                      <th className="p-3 font-bold">golongan_darah</th>
                      <th className="p-3 font-bold">kontak_darurat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b border-outline-variant/20 hover:bg-surface-container-low/40">
                      <td className="p-3 font-bold text-secondary">{profile.profile_id}</td>
                      <td className="p-3 text-primary font-bold">{profile.user_id}</td>
                      <td className="p-3 text-on-surface-variant">{profile.no_ktp}</td>
                      <td className="p-3 text-on-surface-variant">{profile.tanggal_lahir}</td>
                      <td className="p-3 text-on-surface font-black text-center">{profile.golongan_darah}</td>
                      <td className="p-3 text-on-surface-variant">{profile.kontak_darurat}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
