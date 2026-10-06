import LogoImage from "../assets/images/Logo.jpeg";

function Footer() {
  return (
    <footer id="contact" className="bg-sky-950 text-sky-100 font-sans border-t border-sky-800/40 relative overflow-hidden">
      {/* ແສງ Background Glow ຕົບແຕ່ງດ້ານຫຼັງ */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* ໂຊນ 1: ໂລໂກ້ + ລາຍລະອຽດແອັບ + ໂຊເຊຍມີເດຍ */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-2xl p-1.5 shadow-md flex items-center justify-center border border-gray-100">
                <img
                  src={LogoImage}
                  alt="App Logo"
                  className="rounded-xl w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-wide">
                  LAO ECS APP
                </h2>
                <span className="text-xs text-sky-300">Mobile Application</span>
              </div>
            </div>

            <p className="text-sky-200/80 text-sm leading-relaxed">
              ສຳຜັດປະສົບການທີ່ດີທີ່ສຸດ ພ້ອມກັບຟີເຈີໃໝ່ໆທີ່ອອກແບບມາເພື່ອອຳນວຍຄວາມສະດວກໃຫ້ທ່ານທຸກທີ່ທຸກເວລາ.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-sky-900/80 hover:bg-indigo-600 text-sky-200 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-sky-900/80 hover:bg-indigo-600 text-sky-200 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-sky-900/80 hover:bg-indigo-600 text-sky-200 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white text-base font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              ຕິດຕໍ່ພວກເຮົາ
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-sky-200/90">
                <svg className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ</span>
              </li>
              <li className="flex items-center gap-3 text-sky-200/90">
                <svg className="w-5 h-5 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span>+856 20 1234 5678</span>
              </li>
              <li className="flex items-center gap-3 text-sky-200/90">
                <svg className="w-5 h-5 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span>contact@yourdomain.la</span>
              </li>
            </ul>
          </div>

          {/* ໂຊນ 4: ຟອມລົງທະບຽນຮັບຂ່າວສານ (Newsletter) */}
          <div>
            <h3 className="text-white text-base font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              ຕິດຕາມຂ່າວສານ
            </h3>
            <p className="text-sky-200/80 text-sm mb-4">
              ລົງທະບຽນອີເມວເພື່ອຮັບອັບເດດຟີເຈີໃໝ່ໆ ແລະ ໂປຣໂມຊັນກ່ອນໃຜ.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2.5">
              <input
                type="email"
                placeholder="ປ້ອນອີເມວຂອງທ່ານ..."
                className="w-full bg-sky-900/60 border border-sky-700/60 text-white placeholder-sky-400 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-400 transition"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-900 font-bold text-sm py-2.5 rounded-xl shadow-md transition duration-300"
              >
                ຕິດຕາມ
              </button>
            </form>
          </div>

        </div>

        {/* ໂຊນ ລິຂະສິດດ້ານລຸ່ມ (Copyright Bar) */}
        <div className="mt-12 pt-6 border-t border-sky-900/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-sky-300/70">
          <p>© {new Date().getFullYear()} Your App Name. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-amber-400 transition">
              ເງື່ອນໄຂການນຳໃຊ້
            </a>
            <a href="#" className="hover:text-amber-400 transition">
              ນະໂຍບາຍຄວາມເປັນສ່ວນຕົວ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;