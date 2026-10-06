import { BookOpen } from "lucide-react";
import ImageAboutUs from "../assets/images/about_us.png";
import ShoppingImage from "../assets/images/shopping.jpeg";
import FowLowImage from "../assets/images/fowlowDashboard.png";
import DevImage from "../assets/images/dev.png";
import ProImage from "../assets/images/proforsale.png";

function About() {
  const CardInfomation = [
    { title: "ສັ່ງຊຶ້ສິນຄ້າ", image: ShoppingImage, subtitile: "ຢູ່ໃສກໍສາມາດຊື້ໄດ້ ບໍ່ຈຳເປັນຕ້ອງຢູ່ໃກ້ຮ້ານ" },
    { title: "ວິເຄາະຂໍ້ມູນການຂາຍ", image: FowLowImage, subtitile: "ສະຫຼຸບພາບລວມຜ່ານໜ້າ Dashboard ແລະ ພິມລາຍງານໄດ້" },
    { title: "ການດູແລລະບົບ", image: DevImage, subtitile: "ມີບໍລິການນັກພັດທະນາຊອບແວດູແລລະບົບໃຫ້ປອດໄພ" },
    { title: "ໂປຣໂມຊັນ", image: ProImage, subtitile: "ມີໂປຣສຳລັບລູກຄ້າ ແລະ ເຈົ້າຂອງຮ້ານຄ້າທີ່ມີສິນຄ້າຂາຍດີທຸກເດືອນ" },
  ];

  return (
    <main id="about" className="flex flex-col mt-8 md:mt-16 mx-auto">
      <div className="flex justify-center items-center gap-2 mb-8">
        <BookOpen className="text-sky-800 shrink-0" size={32} />
        <h1 className="text-2xl md:text-3xl text-sky-800 font-bold text-center">
          ລາຍລະອຽດກ່ຽວກັບພວກເຮົາ
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 bg-white overflow-hidden">
        <div className="w-full lg:w-1/2">
          <img
            src={ImageAboutUs}
            className="w-full h-full bg-sky-700 object-cover"
            alt="About Us"
          />
        </div>

        <div className="w-full lg:w-1/2 p-6 md:p-8 flex flex-col justify-center">
          <h2 className="text-xl md:text-2xl text-sky-700 font-bold mb-3">
            ປະຫວັດຄວາມເປັນມາຂອງ &nbsp;
            <span className="text-yellow-600">LAO ECS</span>
          </h2>
          <hr className="mb-4 border-gray-200" />

          <div className="text-gray-700 text-base md:text-lg leading-relaxed space-y-4">
            <p className="indent-6">
              <span className="font-semibold text-yellow-600">
                LAO ECS <span className="text-sky-700">(LAO E-COMMERCE SERVICE)</span>
              </span>{" "}
              ໄດ້ສ້າງຕັ້ງຂື້ນໃນເມື່ອວັນທີ 01/09/2026, ຕັ້ງຢູ່ບ້ານ ຫຼັກ 52, ເມືອງ ໂພນໂຮງ ແລະ ແຂວງ ວຽງຈັນ. ເນື່ອງຈາກຍຸກສະໄໝໄດ້ປ່ຽນໄປການຄ້າຂາຍກໍເລີ່ມຫັນມາໃຊ້ໃນຮູບແບບຂອງດີຈີຕອນຫຼາຍຂື້ນແລ້ວ ເນື່ອງຈາກບັນຫາການຖືກໂກງ ແລະ ຊອກຫາສິນຄ້າທີ່ໄດ້ລາຄາດັ່ງໃຈໄດ້ຍາກ, ພວກເຮົາຈື່ງພັດທະນາອົງກອນນີ້ຂື້ນມາເພື່ອລວມເອົາທຸກໆຮ້ານເຂົ້າດ້ວຍກັນໄວ້ໃນທີ່ດຽວ.
            </p>

            <hr className="border-gray-200 my-2" />

            <p className="indent-6">
              ຫຼຸດຜ່ອນບັນຫາການຖືກໂກງຈາກເພຈປອນ, ການຊື້ສິນຄ້າແລ້ວບໍ່ຕົງປົກ, ການຕິດຕາມຈຳນວນສິນຄ້າຂອງຕົນເອງ, ຕິດຕາມລາຍຮັບ, ແຈ້ງເຕືອນສິນຄ້າໃກ້ໝົດ ແລະ ລາຍງານຕ່າງໆເພື່ອໃຫ້ທາງລູກຄ້າມີຄວາມໄວ້ໃຈ ແລະ ທາງເຈົ້າຂອງສິນຄ້າຈັດການໄດ້ງ່າຍ.
            </p>
          </div>
        </div>
      </div>
      <h1 className="text-xl md:text-2xl text-sky-700 font-bold mt-16 text-center">ຂໍ້ມູນລາຍລະອຽດເພີ່ມເຕີມ</h1>
      <div className="w-full max-w-7xl mx-auto px-4 mt-12 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CardInfomation.map((item, index) => (
            <div
              className="flex flex-col bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              key={index}
            >
              <div className="w-full h-48 overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  alt={item.title}
                />
              </div>
              <div className="p-5 flex flex-col items-start flex-1">
                <h3 className="text-lg font-bold text-sky-800 mb-2 text-start">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 text-start leading-relaxed">
                  {item.subtitile}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default About;