import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SummitPass - Pendaftaran Pendaki",
  description:
    "Daftarkan tim pendakian Anda untuk ekspedisi Gunung Prau. Isi detail pendaki, tambahkan anggota tim, dan lanjutkan ke pembayaran.",
};

export default function RegisterPage() {
  return (
    <div className="pt-24 pb-32 px-6 max-w-4xl mx-auto">
      {/* Progress Stepper */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.1rem] text-secondary">
            Langkah 2 dari 3
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.1rem] text-on-surface-variant">
            Pendaftaran Pendaki
          </span>
        </div>
        <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden flex">
          <div className="h-full bg-tertiary/40 w-1/3 border-r border-background"></div>
          <div className="h-full forest-gradient w-1/3"></div>
          <div className="h-full w-1/3"></div>
        </div>
      </section>

      {/* Page Hero */}
      <div className="mb-12 relative h-48 rounded-2xl overflow-hidden shadow-sm">
        <img
          alt="Barisan Gunung"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDahOVSTR5FWxPHw7k1CZ81kbZBzKNebDFPEqF2wjYPw2wZu1jzA1GdnOWCK95uVhKTLjMlbXfmIWPlMA_AxO5lG8T-tZASaxlGIXcKtZJ0bLTf27UPsoE2DTLQ-c4SMluIWsTpQYoyWCxEyTF4L9veoaLfoyQk096x3__bGLIeyMKRa9Yc2b-m6uLknWJyFkJzcQQUjUp2HQsGgD_wtGFfq8vWuufNBld8CVQAfBiInLdbzTXt8RnteFGaYueK8RpLpb1fPNhvcRk"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-on-background/60 to-transparent flex items-end p-8">
          <h1 className="font-headline text-4xl font-bold text-white tracking-tight">
            Detail Pendaki
          </h1>
        </div>
      </div>

      <form className="space-y-8">
        {/* Hiker Data Card (Primary Member) */}
        <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-[0_4px_24px_rgba(26,36,33,0.06)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-headline text-xl font-bold text-primary">
              Pendaki Utama
            </h2>
            <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
              Wajib
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant ml-1">
                Nama Lengkap
              </label>
              <input
                className="w-full bg-surface-variant/30 border-none rounded-xl px-4 py-3 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/30 focus:outline-none border-b-2 border-transparent focus:border-primary transition-all text-on-surface"
                placeholder="Budi Santoso"
                type="text"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant ml-1">
                Nomor KTP
              </label>
              <input
                className="w-full bg-surface-variant/30 border-none rounded-xl px-4 py-3 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/30 focus:outline-none border-b-2 border-transparent focus:border-primary transition-all text-on-surface"
                placeholder="3301xxxxxxxxxxxx"
                type="text"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant ml-1">
                Nomor HP
              </label>
              <input
                className="w-full bg-surface-variant/30 border-none rounded-xl px-4 py-3 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/30 focus:outline-none border-b-2 border-transparent focus:border-primary transition-all text-on-surface"
                placeholder="0812xxxxxxxx"
                type="tel"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant ml-1">
                Kontak Darurat
              </label>
              <input
                className="w-full bg-surface-variant/30 border-none rounded-xl px-4 py-3 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/30 focus:outline-none border-b-2 border-transparent focus:border-primary transition-all text-on-surface"
                placeholder="Nomor HP Keluarga"
                type="tel"
              />
            </div>
          </div>
        </div>

        {/* Bento Layout for Secondary Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Add Team Member Card */}
          <button
            className="md:col-span-2 group bg-surface-container-high hover:bg-secondary-container transition-colors rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-4 active:scale-[0.98] duration-200"
            type="button"
          >
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined font-bold">
                person_add
              </span>
            </div>
            <div>
              <h3 className="font-headline font-bold text-on-surface">
                Tambah Anggota Tim
              </h3>
              <p className="text-sm text-on-surface-variant">
                Ingin mendaftarkan lebih dari satu pendaki?
              </p>
            </div>
          </button>

          {/* Weather/Altitude HUD Component */}
          <div className="glass-panel rounded-2xl p-6 border border-white/50 flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start">
              <span className="material-symbols-outlined text-primary">
                cloudy_snowing
              </span>
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                  Base Camp
                </p>
                <p className="font-headline font-bold text-xl">12°C</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                Puncak Target
              </p>
              <div className="flex items-end gap-2">
                <span className="font-headline font-black text-2xl text-on-background">
                  2.565
                </span>
                <span className="text-xs font-bold text-secondary mb-1">
                  METER
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Transactional CTA */}
        <div className="pt-6">
          <Link
            href="/booking/confirmation"
            className="w-full forest-gradient text-white font-headline font-bold text-lg py-5 rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.97] transition-all flex items-center justify-center gap-3"
          >
            Lanjutkan ke Pembayaran
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
          <p className="text-center mt-4 text-xs text-on-surface-variant font-medium">
            Dengan melanjutkan, Anda menyetujui Protokol Keselamatan Ketinggian dan Surat Pernyataan Tanggung Jawab.
          </p>
        </div>
      </form>

      {/* Map Background Fragment (Aesthetic only) */}
      <div className="fixed top-0 right-0 w-1/3 h-full -z-10 opacity-10 pointer-events-none">
        <img
          alt="Peta Topografi"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgqYAJ3hqB5aJhQtJ5mK_kpRzHoFo4ZyNjW_rlEuuUTDRhdUTpnzIKxFlWu0c6u0nEoNR6MLUcL8N5AG93a6_vBeYlPZpyStY2hm3NcjtLVIG7BZKFwdNBoCAjcd3PrICv1_L1EVA8VXAW0HNwe5BY4FMPtyIjoCrnlEAgeKKwDf9JVyvTX5wRUjzGr8exIWw4p7Mo018KQ-Ngb3-r52DFoYVUzbCR7Bu8lGin9XmRKqLiGmHw6lu7sli1VQt3POXJSeDMipZFICs"
        />
      </div>
    </div>
  );
}
