import { ConciergeBell, ShieldCheck, ShoppingBag } from "lucide-react";
import About from "./About";
function ThreeCard() {
  const cards = [
    { title: "ດ້ານບໍລິການ", desc: "ພວກເຮົາມີລະບົບແອັດມິນໃຫ້ແກ່ຮ້ານຂອງທ່ານໃຫ້ທ່ານສາມາດຈັດການສິນຄ້າຂອງທ່ານເອງ ຮູ້ຈຳນວນສິນຄ້າທີ່ຂາຍໄປ, ລາຍຮັບລາຍຈ່າຍ, ສິນຄ້າໝົດສະຕັອກ, ແລະ ລາຍງານທັ້ງສິນຄ້າໄດ້ຂາຍດີ-ບໍ່ໄດ້ຂາຍດີ" , icon: <ConciergeBell/>},
    { title: "ຄວາມປອດໄພ", desc: "ພວກເຮົາມີບໍລິການຕິດຕາມ log ການເຄື່ອນໄຫວຕ່າງໆ, ບໍ່ຖືກໂກງແນ່ນອນເພາະທຸກໆຮ້ານທີ່ນີ້ຕ້ອງຜ່ານການປະກອບເອກະສານຢັ້ນຢືນຕົວຕົນມາຢ່າງດີແລ້ວ ແລະ ພວກເຮົາມີທິມງານດູແລລະບົບຫຼັງບ້ານໃຫ້ພ້ອມ" , icon: <ShieldCheck/>},
    { title: "ດ້ານການຊື້-ຂາຍ", desc: "ຊື້ງ່າຍ-ຈ່າຍງ່າຍ ເຫັນຫຼາຍຮ້ານ, ຫຼາຍສິນຄ້າ, ເລືອກສິນຄ້າ ແລະ ລາຄາຕາມທີ່ເຮົາຕ້ອງການໄດ້ທີ່ນີ້ທັງໝົດເລີຍ ມີໂປຣໂມຊັນສຳລັບສິນຄ້າໄດ້ຂາຍດີ ແລະ ລູກຄ້າປະຈຳພ້ອມ ບໍ່ເສຍເວລາໄປເລາະຫາຮ້ານ ແລະ ຖາມລາຄາ" , icon: <ShoppingBag/>},
  ];

  return (
    <div className="container mx-auto relative z-10 -mt-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl px-4 mx-auto">
        {cards.map((card, index) => (
          <div 
            key={index} 
            className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 flex flex-col justify-between h-56 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div>
              <div className="flex justify-center">
                 {card.icon}&nbsp;<h3 className="text-xl font-bold text-sky-900 mb-2">{card.title}</h3>
              </div><hr className="text-yellow-600" />
              <p className="text-gray-600 text-sm mt-3">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <About/>
    </div>
  );
}

export default ThreeCard;