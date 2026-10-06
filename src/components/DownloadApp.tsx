import LogoImage from "../assets/images/Logo.jpeg";
function DownloadApp() {
  return (
    <main id="download" className="h-2/3 bg-sky-700 flex items-center justify-center p-6 font-sans">
      
      {/* Card ຫຼັກທີ່ຫຸ້ມທຸກຢ່າງໄວ້ */}
      <div className="max-w-4xl w-full bg-white backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 flex flex-col md:flex-row items-center gap-8 md:gap-14">
        
        {/* ດ້ານຂ້າງ 1: ໂລໂກ້ແອັບ (Logo Side) */}
        <div className="flex-shrink-0 relative group">
          {/* ເອັບເຟັກແສງເຮືອງຢູ່ຫຼັງໂລໂກ້ (Glow Effect) */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-[2.5rem] blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
          
          <div className="relative bg-white p-6 rounded-[2rem] shadow-lg border border-gray-100 flex items-center justify-center">
            {/* ປ່ຽນ SVG ເປັນ <img src="/logo.png" /> ໄດ້ */}
            <div className="w-36 h-36 md:w-48 md:h-48 bg-gradient-to-tr from-indigo-600 to-blue-500 rounded-2xl flex items-center justify-center shadow-inner">
              <img src={LogoImage} alt="" className="rounded-2xl" />
            </div>
          </div>
        </div>

        {/* ດ້ານຂ້າງ 2: ຂໍ້ຄວາມ ແລະ ປຸ່ມດາວໂຫຼດ (Text & Actions Side) */}
        <div className="flex-1 text-center md:text-left">
          <span className="inline-block px-3.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full mb-3 tracking-wide">
            MOBILE APP
          </span>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-yellow-600 tracking-tight mb-4 leading-tight">
            ດາວໂຫຼດແອັບຂອງພວກເຮົາ
          </h1>
          
          <p className="text-base md:text-lg text-sky-700 mb-8 leading-relaxed">
            ສຳຜັດປະສົບການທີ່ດີທີ່ສຸດ ພ້ອມກັບຟີເຈີໃໝ່ໆທີ່ອອກແບບມາເພື່ອອຳນວຍຄວາມສະດວກໃຫ້ທ່ານທຸກທີ່ທຸກເວລາ.
          </p>

          {/* ປຸ່ມດາວໂຫຼດ */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            {/* App Store */}
            <button className="flex items-center gap-3 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-medium transition-all w-full sm:w-auto justify-center shadow-md hover:shadow-lg">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 3.82c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.65 1.35-.58.67-.99 1.74-.85 2.76 1.01.08 2.05-.51 2.57-1.26z"/>
              </svg>
              <div className="text-left">
                <div className="text-[10px] opacity-80 leading-tight">Download on the</div>
                <div className="text-sm font-semibold leading-tight">App Store</div>
              </div>
            </button>

            {/* Google Play */}
            <button className="flex items-center gap-3 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-xl font-medium transition-all w-full sm:w-auto justify-center shadow-md hover:shadow-lg">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5.34 0 .67.11.94.31l13.5 8.5c.67.42.88 1.31.46 1.98-.12.19-.28.35-.46.46l-13.5 8.5c-.27.2-.6.31-.94.31-.83 0-1.5-.67-1.5-1.5z"/>
              </svg>
              <div className="text-left">
                <div className="text-[10px] opacity-80 leading-tight">GET IT ON</div>
                <div className="text-sm font-semibold leading-tight">Google Play</div>
              </div>
            </button>
          </div>
        </div>

      </div>

    </main>
  );
}

export default DownloadApp;