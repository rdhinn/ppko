"use client";

import { useState } from "react";

interface Partner {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export default function PartnerSection() {
  const partners: Partner[] = [
    {
      id: "trip",
      title: "Mitra Perjalanan",
      description: "Tawarkan paket open trip, private trip, atau sharing cost dengan pengelolaan mudah.",
      icon: "route",
    },
    {
      id: "camping",
      title: "Mitra Area Perkemahan",
      description: "Promosikan area perkemahan Anda lengkap dengan opsi penyewaan tenda dan perlengkapan.",
      icon: "camping",
    },
    {
      id: "porter",
      title: "Mitra Porter",
      description: "Tingkatkan visibilitas Anda di kalangan pendaki dan dapatkan penghasilan tambahan yang stabil.",
      icon: "hiking",
    },
    {
      id: "guide",
      title: "Mitra Guide (Pemandu)",
      description: "Pimpin pendakian dengan aman dan bagikan pengalaman serta edukasi unik seputar jalur pendakian.",
      icon: "explore",
    },
    {
      id: "rental",
      title: "Mitra Rental Alat",
      description: "Sediakan sewa peralatan mendaki berkualitas tinggi untuk mendukung keselamatan pendaki.",
      icon: "backpack",
    },
    {
      id: "event",
      title: "Mitra Event & Acara",
      description: "Publikasikan festival gunung, gathering pendaki, atau acara petualangan Anda ke audiens yang tepat.",
      icon: "calendar_month",
    },
  ];

  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    phone: "",
    location: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleOpenModal = (partner: Partner) => {
    setSelectedPartner(partner);
    setStatus("idle");
    setFormData({
      businessName: "",
      contactName: "",
      phone: "",
      location: "",
    });
  };

  const handleCloseModal = () => {
    setSelectedPartner(null);
    setStatus("idle");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.contactName || !formData.phone || !formData.location) {
      alert("Harap lengkapi semua data!");
      return;
    }
    
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <section className="space-y-10 py-8 mx-6">
      {/* Title Header */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl md:text-4xl font-headline font-extrabold text-primary tracking-tight">
          Mari Bergabung dan Tumbuh Bersama SummitPass
        </h2>
        <p className="text-on-surface-variant max-w-xl mx-auto font-medium text-base">
          Berkolaborasi untuk menciptakan kemajuan ekonomi bagi warga lokal
        </p>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="bg-white rounded-3xl p-6 border border-outline-variant/40 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg card-shadow group"
          >
            <div>
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-2xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {partner.icon}
                </span>
              </div>
              
              {/* Card Title */}
              <h3 className="font-headline font-bold text-xl text-primary mb-2 group-hover:text-primary/80 transition-colors">
                {partner.title}
              </h3>
              
              {/* Card Description */}
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6 font-medium">
                {partner.description}
              </p>
            </div>

            {/* Button */}
            <button
              onClick={() => handleOpenModal(partner)}
              className="forest-gradient hover:opacity-90 active:scale-[0.98] text-white font-bold py-3 rounded-2xl transition-all text-sm w-full font-headline cursor-pointer mt-auto"
            >
              Gabung sebagai Mitra
            </button>
          </div>
        ))}
      </div>

      {/* Modal Dialog */}
      {selectedPartner && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 animate-fadeIn">
          <div className="bg-surface rounded-3xl max-w-lg w-full overflow-hidden border border-outline-variant/30 shadow-2xl relative animate-scaleUp">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface w-8 h-8 rounded-full bg-surface-container-high/60 flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            {status !== "success" ? (
              <div className="p-6 md:p-8 space-y-6">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 bg-primary/10 px-3 py-1 rounded-full text-primary text-xs font-bold font-headline mb-2">
                    <span className="material-symbols-outlined text-sm">{selectedPartner.icon}</span>
                    Form Kemitraan
                  </div>
                  <h3 className="font-headline font-black text-2xl text-on-surface">
                    Daftar {selectedPartner.title}
                  </h3>
                  <p className="text-on-surface-variant text-sm">
                    Lengkapi formulir singkat di bawah ini. Tim kami akan segera menganalisis profil bisnis Anda.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                      Nama Lengkap / Nama Bisnis
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. CV Prau Adventure atau John Doe"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                      Nama Penanggung Jawab
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Budi Santoso"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                      Nomor WhatsApp aktif
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 081234567890"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                      Wilayah Operasional Utama
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Wonosobo, Gunung Prau, Jawa Tengah"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all font-medium"
                    />
                  </div>

                  <div className="pt-4">
                    {status === "loading" ? (
                      <button
                        type="button"
                        disabled
                        className="w-full bg-primary/40 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm"
                      >
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Memproses Pengajuan...
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="w-full forest-gradient hover:opacity-95 active:scale-98 text-white font-bold py-3.5 rounded-2xl transition-all text-sm font-headline cursor-pointer shadow-md shadow-primary/10"
                      >
                        Kirim Pengajuan Kemitraan
                      </button>
                    )}
                  </div>
                </form>
              </div>
            ) : (
              <div className="p-8 text-center space-y-6 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center text-primary animate-scaleUp">
                  <span className="material-symbols-outlined text-4xl font-extrabold" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-headline font-black text-2xl text-on-surface">
                    Pengajuan Terkirim!
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed font-medium">
                    Terima kasih telah mengajukan kemitraan sebagai <strong className="text-primary">{selectedPartner.title}</strong> untuk wilayah <strong className="text-on-surface">{formData.location}</strong>.
                  </p>
                  <p className="text-on-surface-variant/90 text-xs leading-relaxed max-w-sm mx-auto pt-2 bg-surface-container-low p-3 rounded-2xl border border-outline-variant/20">
                    Tim Kemitraan SummitPass akan segera memverifikasi data Anda dan menghubungi Anda melalui WhatsApp di nomor <span className="font-bold text-primary">{formData.phone}</span> dalam waktu 1x24 jam.
                  </p>
                </div>

                <button
                  onClick={handleCloseModal}
                  className="w-full bg-primary hover:bg-primary/95 text-white font-bold py-3.5 rounded-2xl transition-all text-sm font-headline cursor-pointer mt-4"
                >
                  Kembali ke Beranda
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
