"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterFlow() {
  const router = useRouter();
  
  // Current Step: 1 = Register Form, 2 = OTP Verification, 3 = Account Active, 4 = Complete Profile
  const [step, setStep] = useState(1);
  const [isValidating, setIsValidating] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  // Form State - Users Table
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [noHp, setNoHp] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Form State - OTP Verification
  const [otpCode, setOtpCode] = useState("");
  const [otpError, setOtpError] = useState("");

  // Form State - Profil Pendaki Table
  const [noKtp, setNoKtp] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [golonganDarah, setGolonganDarah] = useState("O");
  const [kontakDarurat, setKontakDarurat] = useState("");

  // Temporary ID generator
  const [userId, setUserId] = useState("");
  const [tanggalDaftar, setTanggalDaftar] = useState("");

  // OTP Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 2 && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  // Validate Step 1 (Registration Form)
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (nama.trim().length < 3) {
      newErrors.nama = "Nama lengkap harus diisi (minimal 3 karakter).";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Format email tidak valid.";
    }
    const phoneRegex = /^[0-9]{10,14}$/;
    if (!phoneRegex.test(noHp)) {
      newErrors.noHp = "Nomor HP harus berupa angka 10-14 digit.";
    }
    if (password.length < 6) {
      newErrors.password = "Kata sandi minimal 6 karakter.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsValidating(true);

    // Simulate "Validasi Sistem"
    setTimeout(() => {
      setIsValidating(false);
      // Generate mock user ID and registration date
      const randomId = "USR-" + Math.random().toString(36).substring(2, 8).toUpperCase();
      const currentDate = new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      setUserId(randomId);
      setTanggalDaftar(currentDate);

      // Save initial user state to localStorage (Status: Tertunda)
      const userObj = {
        user_id: randomId,
        nama,
        email,
        no_hp: noHp,
        password: "*".repeat(password.length), // Disamarkan demi keamanan
        tanggal_daftar: currentDate,
        status_akun: "Tertunda"
      };
      localStorage.setItem("summitpass_temp_user", JSON.stringify(userObj));

      setStep(2); // Go to OTP
      setResendTimer(60);
    }, 1500);
  };

  // Validate Step 2 (OTP Verification)
  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode === "123456") {
      setOtpError("");
      
      // Update status to Aktif in localStorage
      const tempUser = localStorage.getItem("summitpass_temp_user");
      if (tempUser) {
        const user = JSON.parse(tempUser);
        user.status_akun = "Aktif";
        localStorage.setItem("summitpass_temp_user", JSON.stringify(user));
      }
      
      setStep(3); // Go to Account Active Successful screen
    } else {
      setOtpError("Kode OTP salah! Gunakan kode dummy: 123456");
    }
  };

  // Handle Resend OTP
  const handleResendOtp = () => {
    setResendTimer(60);
    setOtpCode("");
    setOtpError("");
    alert("Simulasi: Kode OTP baru telah dikirim via WhatsApp ke " + noHp + " (Gunakan kode: 123456)");
  };

  // Validate Step 4 (Complete Hiker Profile Form)
  const handleCompleteProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    const ktpRegex = /^[0-9]{16}$/;
    if (!ktpRegex.test(noKtp)) {
      newErrors.noKtp = "Nomor KTP harus tepat 16 digit angka.";
    }
    if (!tanggalLahir) {
      newErrors.tanggalLahir = "Tanggal lahir wajib diisi.";
    }
    const contactRegex = /^[0-9]{10,14}$/;
    if (!contactRegex.test(kontakDarurat)) {
      newErrors.kontakDarurat = "Kontak darurat harus berupa nomor HP aktif (10-14 digit).";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save profile data
    const profileId = "PRF-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    const profileObj = {
      profile_id: profileId,
      user_id: userId,
      no_ktp: noKtp,
      tanggal_lahir: tanggalLahir,
      golongan_darah: golonganDarah,
      kontak_darurat: kontakDarurat,
    };

    const tempUser = localStorage.getItem("summitpass_temp_user");
    if (tempUser) {
      const userObj = JSON.parse(tempUser);
      
      // Save finalized database records (simulated tables)
      localStorage.setItem("summitpass_user", JSON.stringify(userObj));
      localStorage.setItem("summitpass_profile", JSON.stringify(profileObj));

      // Remove temp user
      localStorage.removeItem("summitpass_temp_user");

      // Dispatch event to update Header & BottomNav
      window.dispatchEvent(new Event("summitpass_auth"));

      // Direct to Dashboard
      router.push("/dashboard");
    }
  };

  return (
    <div className="pt-28 pb-32 px-6 max-w-2xl mx-auto min-h-screen flex flex-col justify-center">
      {/* Progress Tracker Widget */}
      <div className="mb-8">
        <div className="flex justify-between items-center text-xs font-bold text-secondary uppercase tracking-widest mb-2">
          <span>Langkah {step} dari 4</span>
          <span>
            {step === 1 && "Registrasi Akun"}
            {step === 2 && "Verifikasi OTP"}
            {step === 3 && "Akun Aktif!"}
            {step === 4 && "Lengkapi Profil Pendaki"}
          </span>
        </div>
        <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden flex gap-0.5">
          <div className={`h-full flex-1 transition-all duration-300 ${step >= 1 ? "forest-gradient" : "bg-surface-variant/40"}`}></div>
          <div className={`h-full flex-1 transition-all duration-300 ${step >= 2 ? "forest-gradient" : "bg-surface-variant/40"}`}></div>
          <div className={`h-full flex-1 transition-all duration-300 ${step >= 3 ? "forest-gradient" : "bg-surface-variant/40"}`}></div>
          <div className={`h-full flex-1 transition-all duration-300 ${step >= 4 ? "forest-gradient" : "bg-surface-variant/40"}`}></div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 card-shadow border border-outline-variant/20 relative overflow-hidden">
        {/* Decorative Green Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 forest-gradient"></div>

        {/* Step 1: Registration Form */}
        {step === 1 && (
          <div>
            <div className="text-center mb-8">
              <span className="material-symbols-outlined text-primary text-5xl mb-2">person_add</span>
              <h1 className="text-3xl font-headline font-black text-on-surface">Daftar Akun Baru</h1>
              <p className="text-sm text-on-surface-variant mt-1">
                Langkah awal untuk memulai petualangan mendaki gunung dengan SIMAKSI online.
              </p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant ml-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Contoh: Alex Walker"
                  className="w-full bg-surface-container/50 border border-outline-variant/50 rounded-2xl px-4 py-3.5 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm"
                  disabled={isValidating}
                />
                {errors.nama && <p className="text-xs text-error font-medium ml-1">{errors.nama}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant ml-1">
                  Alamat Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@gmail.com"
                  className="w-full bg-surface-container/50 border border-outline-variant/50 rounded-2xl px-4 py-3.5 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm"
                  disabled={isValidating}
                />
                {errors.email && <p className="text-xs text-error font-medium ml-1">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant ml-1">
                  Nomor HP
                </label>
                <input
                  type="tel"
                  value={noHp}
                  onChange={(e) => setNoHp(e.target.value)}
                  placeholder="081234567890"
                  className="w-full bg-surface-container/50 border border-outline-variant/50 rounded-2xl px-4 py-3.5 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm"
                  disabled={isValidating}
                />
                {errors.noHp && <p className="text-xs text-error font-medium ml-1">{errors.noHp}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant ml-1">
                  Kata Sandi
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-surface-container/50 border border-outline-variant/50 rounded-2xl px-4 py-3.5 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm"
                  disabled={isValidating}
                />
                {errors.password && <p className="text-xs text-error font-medium ml-1">{errors.password}</p>}
              </div>

              <button
                type="submit"
                disabled={isValidating}
                className="w-full forest-gradient text-white py-4 rounded-2xl font-headline font-bold text-base shadow-lg shadow-primary/10 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-3 mt-6"
              >
                {isValidating ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Memvalidasi Sistem...</span>
                  </>
                ) : (
                  <>
                    <span>Daftar Sekarang</span>
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </>
                )}
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-xs text-on-surface-variant">
                Sudah memiliki akun?{" "}
                <Link href="/dashboard" className="text-primary font-bold hover:underline">
                  Masuk di sini
                </Link>
              </p>
            </div>
          </div>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <div>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-container/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="material-symbols-outlined text-primary text-3xl">sms</span>
              </div>
              <h1 className="text-3xl font-headline font-black text-on-surface">Verifikasi OTP</h1>
              <p className="text-sm text-on-surface-variant mt-2">
                Masukkan 6 digit kode OTP yang kami kirimkan ke nomor WhatsApp <span className="font-bold text-on-surface">{noHp}</span>.
              </p>
              <div className="mt-2 inline-flex items-center gap-1.5 bg-secondary-container/40 text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold">
                <span className="material-symbols-outlined text-xs">info</span>
                Simulasi OTP: Gunakan kode <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-secondary-container">123456</span>
              </div>
            </div>

            <form onSubmit={handleOtpVerify} className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-center">
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="Masukkan 6 Digit OTP"
                    className="w-full text-center tracking-[0.4em] font-mono text-2xl bg-surface-container/50 border border-outline-variant/50 rounded-2xl px-4 py-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-black placeholder:tracking-normal placeholder:font-sans placeholder:text-sm placeholder:font-normal"
                    maxLength={6}
                  />
                </div>
                {otpError && <p className="text-xs text-error font-medium text-center">{otpError}</p>}
              </div>

              <button
                type="submit"
                className="w-full forest-gradient text-white py-4 rounded-2xl font-headline font-bold text-base shadow-lg shadow-primary/10 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <span>Verifikasi Kode OTP</span>
                <span className="material-symbols-outlined">verified_user</span>
              </button>
            </form>

            <div className="text-center mt-8">
              {resendTimer > 0 ? (
                <p className="text-xs text-on-surface-variant font-medium">
                  Kirim ulang kode dalam <span className="text-primary font-bold">{resendTimer} detik</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-xs text-primary font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-xs">replay</span>
                  Kirim Ulang OTP
                </button>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Account Active */}
        {step === 3 && (
          <div className="text-center">
            <div className="w-20 h-20 bg-primary text-on-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-md shadow-primary/10 animate-bounce">
              <span className="material-symbols-outlined !text-4xl">check</span>
            </div>
            
            <h1 className="text-3xl font-headline font-black text-on-surface">Akun Anda Aktif!</h1>
            <p className="text-sm text-on-surface-variant mt-2 max-w-md mx-auto">
              Sistem telah memvalidasi OTP Anda. Record baru telah dimasukkan ke dalam <span className="font-bold text-primary">Tabel Users</span>.
            </p>

            {/* Simulated Users Table Entry */}
            <div className="my-6 bg-surface-container/70 border border-outline-variant/30 rounded-2xl p-6 text-left space-y-3 font-mono text-xs shadow-inner">
              <div className="border-b border-outline-variant/30 pb-2 flex justify-between items-center">
                <span className="font-bold text-secondary text-[10px] uppercase">Data Tersimpan (Tabel Users)</span>
                <span className="bg-primary-container text-on-primary-container px-2 py-0.5 rounded text-[8px] font-bold">SQL INSERT</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <span className="text-on-surface-variant">user_id:</span>
                <span className="col-span-2 text-on-surface font-bold">{userId}</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <span className="text-on-surface-variant">nama:</span>
                <span className="col-span-2 text-on-surface font-bold">{nama}</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <span className="text-on-surface-variant">email:</span>
                <span className="col-span-2 text-on-surface font-bold">{email}</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <span className="text-on-surface-variant">no_hp:</span>
                <span className="col-span-2 text-on-surface font-bold">{noHp}</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <span className="text-on-surface-variant">tanggal_daftar:</span>
                <span className="col-span-2 text-on-surface font-bold">{tanggalDaftar}</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <span className="text-on-surface-variant">status_akun:</span>
                <span className="col-span-2 text-primary font-black uppercase">Aktif</span>
              </div>
            </div>

            <button
              onClick={() => setStep(4)}
              className="w-full forest-gradient text-white py-4 rounded-2xl font-headline font-bold text-base shadow-lg shadow-primary/10 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-4"
            >
              <span>Lengkapi Profil Pendaki</span>
              <span className="material-symbols-outlined">badge</span>
            </button>
          </div>
        )}

        {/* Step 4: Complete Hiker Profile */}
        {step === 4 && (
          <div>
            <div className="text-center mb-8">
              <span className="material-symbols-outlined text-primary text-5xl mb-2">id_card</span>
              <h1 className="text-3xl font-headline font-black text-on-surface">Profil Pendaki</h1>
              <p className="text-sm text-on-surface-variant mt-1">
                Lengkapi identitas fisik Anda untuk kebutuhan keamanan evakuasi & izin SIMAKSI Kehutanan.
              </p>
            </div>

            <form onSubmit={handleCompleteProfile} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant ml-1">
                  Nomor KTP (16 Digit)
                </label>
                <input
                  type="text"
                  value={noKtp}
                  onChange={(e) => setNoKtp(e.target.value.replace(/\D/g, "").slice(0, 16))}
                  placeholder="Contoh: 330102xxxxxxxxxx"
                  className="w-full bg-surface-container/50 border border-outline-variant/50 rounded-2xl px-4 py-3.5 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm"
                  maxLength={16}
                />
                {errors.noKtp && <p className="text-xs text-error font-medium ml-1">{errors.noKtp}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant ml-1">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  value={tanggalLahir}
                  onChange={(e) => setTanggalLahir(e.target.value)}
                  className="w-full bg-surface-container/50 border border-outline-variant/50 rounded-2xl px-4 py-3.5 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm"
                />
                {errors.tanggalLahir && <p className="text-xs text-error font-medium ml-1">{errors.tanggalLahir}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant ml-1">
                  Golongan Darah
                </label>
                <select
                  value={golonganDarah}
                  onChange={(e) => setGolonganDarah(e.target.value)}
                  className="w-full bg-surface-container/50 border border-outline-variant/50 rounded-2xl px-4 py-3.5 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm"
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="AB">AB</option>
                  <option value="O">O</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant ml-1">
                  Kontak Darurat (No HP Keluarga/Kerabat)
                </label>
                <input
                  type="tel"
                  value={kontakDarurat}
                  onChange={(e) => setKontakDarurat(e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  className="w-full bg-surface-container/50 border border-outline-variant/50 rounded-2xl px-4 py-3.5 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm"
                />
                {errors.kontakDarurat && <p className="text-xs text-error font-medium ml-1">{errors.kontakDarurat}</p>}
              </div>

              <button
                type="submit"
                className="w-full forest-gradient text-white py-4 rounded-2xl font-headline font-bold text-base shadow-lg shadow-primary/10 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-3 mt-6"
              >
                <span>Simpan Profil & Buka Dashboard</span>
                <span className="material-symbols-outlined">dashboard</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
