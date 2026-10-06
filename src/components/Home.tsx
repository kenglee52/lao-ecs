import ImagePoster from "../assets/images/poster.png";

function Home() {
  return (
    <section className="min-h-[60vh] bg-gradient-to-br from-sky-800 to-sky-950 w-full relative pb-32 pt-16 flex flex-col md:flex-row items-center justify-evenly">
      <div className="flex flex-col px-3 z-10 max-w-xl">
        <h1 className="text-[22px] md:text-3xl text-white font-bold mb-4">
          E-COMMERCE SERVICE <span className="text-yellow-500">ALL IN ONE</span>
        </h1>
        <p className="text-lg text-white mb-10 leading-relaxed font-light">
          ຕະຫຼາດແຫ່ງດີຈີຕອນ ລວມທຸກຕະຫຼາດທົ່ວປະເທດເຂົ້າດ້ວຍກັນໃນທີ່ດຽວ <br className="hidden sm:inline" />
          ເຂົ້າມາເລືອກຕະຫຼາດ ແລະ ສິນຄ້າຂອງທ່ານໄດ້ທີ່ນີ້ເລີຍ ທີ່ດຽວຄົບທຸກຢ່າງ
        </p>
        <div className="flex gap-3">
          <button className="cursor-pointer rounded-xl p-3 bg-yellow-600 font-bold text-white hover:bg-amber-700 hover:scale-95 transform transition">
            ດາວໂຫລດແອັບຕອນນີ້
          </button>
        </div>
      </div>
      <div className="flex relative mt-8 md:mt-0 z-10">
        <div className="absolute inset-0 bg-yellow-600/30 rounded-3xl blur-xl scale-95 pointer-events-none" />
        <div className="relative p-3 bg-white rounded-3xl shadow-2xl border-4 border-yellow-500/40 transform transition-all duration-300 hover:scale-[1.03]">
          <img 
            src={ImagePoster} 
            className="object-cover max-w-xs rounded-2xl w-full h-auto block" 
            alt="Univers Shopping Poster" 
          />
        </div>

      </div>

    </section>
  );
}

export default Home;