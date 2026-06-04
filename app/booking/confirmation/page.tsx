import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SummitPass | Pemesanan Dikonfirmasi",
  description:
    "Pemesanan ekspedisi Gunung Prau Anda telah dikonfirmasi. Lihat tiket digital, detail pemesanan, dan prakiraan cuaca.",
};

export default function ConfirmationPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 pt-32 pb-24 flex flex-col items-center">
      {/* Success Icon */}
      <div className="w-20 h-20 bg-primary text-on-primary rounded-full flex items-center justify-center mb-6 shadow-md">
        <span
          className="material-symbols-outlined !text-4xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          check_circle
        </span>
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface text-center mb-4 tracking-tight font-headline">
        Pendakian Dikonfirmasi
      </h1>
      <p className="text-on-surface-variant text-center max-w-md mb-12">
        Petualangan Anda telah aman. Kami telah mengirimkan detail rencana perjalanan dan konfirmasi ke email terdaftar Anda.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
        {/* Left Column - Details */}
        <section className="md:col-span-7 flex flex-col gap-6">
          <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-[0_4px_24px_rgba(26,28,25,0.04)] relative overflow-hidden border border-surface-container">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
            <h2 className="text-sm font-bold text-secondary uppercase tracking-[0.1rem] mb-6">
              Detail Pemesanan
            </h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary mt-1">
                  landscape
                </span>
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">
                    Tujuan Gunung
                  </p>
                  <p className="text-xl font-bold text-on-surface font-headline">
                    Ekspedisi Gunung Prau
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary mt-1">
                    calendar_today
                  </span>
                  <div>
                    <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">
                      Tanggal Pendakian
                    </p>
                    <p className="text-lg font-bold text-on-surface font-headline">
                      24 Agt 2024
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary mt-1">
                    groups
                  </span>
                  <div>
                    <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">
                      Jumlah Pendaki
                    </p>
                    <p className="text-lg font-bold text-on-surface font-headline">
                      3 Pendaki
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary mt-1">
                  info
                </span>
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">
                    Tipe Izin SIMAKSI
                  </p>
                  <p className="text-lg font-bold text-on-surface font-headline">
                    SIMAKSI Jalur Patakbanteng
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Weather Forecast */}
          <div className="bg-surface-container-low rounded-2xl p-6 flex items-center justify-between border border-surface-container-high/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                <span className="material-symbols-outlined">
                  cloudy_snowing
                </span>
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                  Prakiraan Cuaca
                </p>
                <p className="font-bold text-on-surface">
                  12°C • Langit Cerah
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-secondary/40">
              chevron_right
            </span>
          </div>
        </section>

        {/* Right Column - Digital Ticket */}
        <section className="md:col-span-5">
          <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-[0_24px_48px_rgba(26,28,25,0.08)] flex flex-col items-center border border-surface-container-highest">
            <h2 className="text-sm font-bold text-on-surface uppercase tracking-[0.1rem] mb-8 text-center">
              Tiket Digital
            </h2>

            {/* QR Code */}
            <div className="relative p-4 bg-white rounded-2xl mb-8 ring-1 ring-surface-container-highest">
              <img
                alt="Tiket Kode QR"
                className="w-48 h-48 md:w-56 md:h-56"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBD33OBC450VKt6YKc8wVSTC48uGqUXjjn19aBMlAx-gGhEhccd9I47Q5dktPu-X1qh0vqKHaS-mhO40ln4_9xEsNFOXcS9l4lpEU7xw15QgnBR91Nq4C-WqIhxoA-qfaTAuSlEC6QU9suvbj7l7TqQwdU398yokZ0W5boS2eXFmu4gHEuZ-vWbQ_PgN1FQ5ok8k5fryesKLiS5Mq6c0kiqYLyGir-dBRcvjMGXNAV8B8bXUgWbnnYlPP8Za_6p6ab02iq6zYgONks"
              />
              <div className="absolute inset-0 border-2 border-primary/10 rounded-2xl pointer-events-none"></div>
            </div>

            {/* Ticket ID */}
            <div className="text-center mb-8">
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2rem] mb-1">
                ID Tiket
              </p>
              <p className="text-lg font-mono font-bold text-on-surface">
                SP-284-992-X
              </p>
            </div>

            {/* Tear Line */}
            <div className="w-full h-[1px] bg-surface-container-high mb-8 relative">
              <div className="absolute -left-10 -top-2 w-4 h-4 bg-background rounded-full border-r border-surface-container-high"></div>
              <div className="absolute -right-10 -top-2 w-4 h-4 bg-background rounded-full border-l border-surface-container-high"></div>
            </div>

            <p className="text-center text-xs text-on-surface-variant italic">
              Tunjukkan kode QR ini di pos pemeriksaan basecamp untuk validasi digital SIMAKSI Anda.
            </p>
          </div>
        </section>
      </div>

      {/* Action Buttons */}
      <div className="mt-12 flex flex-col sm:flex-row gap-4 w-full justify-center">
        <button className="px-10 py-5 bg-primary text-white rounded-2xl font-bold font-headline flex items-center justify-center gap-3 transition-all hover:bg-primary/90 active:scale-95 shadow-lg shadow-primary/20">
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'wght' 600" }}
          >
            download
          </span>
          Unduh Tiket
        </button>
        <Link
          href="/"
          className="px-10 py-5 text-on-surface font-bold font-headline flex items-center justify-center gap-2 border-b-2 border-secondary/20 hover:border-secondary hover:bg-secondary/5 transition-all active:scale-95 rounded-t-lg"
        >
          <span className="material-symbols-outlined">home</span>
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
