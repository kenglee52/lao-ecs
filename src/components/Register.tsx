import { useState } from "react";
import { FileText, CheckCircle2 } from "lucide-react";
import RegistrationForm from "./RegistrationForm"; 

function Register() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div id="register" className="bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 md:p-10">
        <div className="flex items-center gap-3 mb-6 border-b pb-4">
          <FileText className="text-sky-800 shrink-0" size={32} />
          <h1 className="text-2xl md:text-3xl text-sky-800 font-bold">
            ເງື່ອນໄຂ ແລະ ນະໂຍບາຍການເປີດຮ້ານ
          </h1>
        </div>

        <div className="prose text-gray-600 mb-8 space-y-4">
          <p>
            ຍິນດີຕ້ອນຮັບເຂົ້າສູ່ລະບົບຮ້ານຄ້າອອນລາຍຂອງພວກເຮົາ. ກະລຸນາອ່ານເງື່ອນໄຂ ແລະ 
            ນະໂຍບາຍດ້ານລຸ່ມນີ້ໃຫ້ເຂົ້າໃຈກ່ອນດຳເນີນການສະໝັກ:
          </p>
          
          <ul className="space-y-3 list-none p-0">
            <li className="flex gap-2 items-start">
              <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={20} />
              <span><strong>ຂໍ້ມູນທີ່ຖືກຕ້ອງ:</strong> ຜູ້ສະໝັກຕ້ອງໃຫ້ຂໍ້ມູນທີ່ເປັນຄວາມຈິງ ແລະ ສາມາດຕິດຕໍ່ໄດ້.</span>
            </li>
            <li className="flex gap-2 items-start">
              <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={20} />
              <span><strong>ສິນຄ້າທີ່ຖືກກົດໝາຍ:</strong> ຫ້າມວາງຂາຍສິນຄ້າທີ່ຜິດກົດໝາຍ ຫຼື ລະເມີດລິຂະສິດ.</span>
            </li>
            <li className="flex gap-2 items-start">
              <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={20} />
              <span><strong>ຄວາມຮັບຜິດຊອບ:</strong> ທາງຮ້ານຄ້າຕ້ອງຮັບຜິດຊອບຕໍ່ຄຸນນະພາບສິນຄ້າ ແລະ ການຈັດສົ່ງໃຫ້ລູກຄ້າ.</span>
            </li>
            <li className="flex gap-2 items-start">
              <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={20} />
              <span><strong>ເອກະສານຢັ້ງຢືນຕົວຕົນ:</strong> ໃນການສະໝັກນີ້ຈຳເປັນຕ້ອງໄດ້ອັບໂຫລດເອະສານເພື່ອຢັ້ງຢືງຕົວຕົນເຊັ່ນ: ສຳມະໂນຄົວ, ບັດປະຈຳຕົວ ຫຼື ໜັງສືຜ່ານແດນ</span>
            </li>
            <li className="flex gap-2 items-start">
              <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={20} />
              <span><strong>ເອກະສານຢັ້ງຢືນທຸລະກິດ:</strong> ໃບອານຸຍາດເປີດຮ້ານ ຫຼື ເປີດແບລນສິນຄ້າ</span>
            </li>
          </ul>

          <p className="text-sm text-gray-500 mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
            * ການກົດ "ສະໝັກດຽວນີ້" ໝາຍຄວາມວ່າທ່ານໄດ້ອ່ານ ແລະ ຍອມຮັບເງື່ອນໄຂທັງໝົດຂອງພວກເຮົາແລ້ວ.
          </p>
        </div>

        <div className="flex justify-center">
          <button 
            onClick={() => setIsDialogOpen(true)}
            className="px-8 cursor-pointer py-3 bg-sky-700 text-white text-lg font-semibold rounded-full hover:bg-sky-800 hover:shadow-lg hover:shadow-sky-700/40 transition-all transform hover:-translate-y-0.5"
          >
            ຍອມຮັບເງື່ອນໄຂ ແລະ ສະໝັກດຽວນີ້
          </button>
        </div>
      </div>
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <RegistrationForm onClose={() => setIsDialogOpen(false)} />
        </div>
      )}
    </div>
  );
}

export default Register;