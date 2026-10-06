import { useRef, useState } from "react";
import { X, User, Briefcase, UploadCloud, PenTool, Trash2 } from "lucide-react";
const PROVINCE_DISTRICTS = {
  "ນະຄອນຫຼວງວຽງຈັນ": ["ຈັນທະບູລີ", "ສີສັດຕະນາກ", "ໄຊເສດຖາ", "ນາຊາຍທອງ", "ໄຊທານີ", "ຫາດຊາຍຟອງ", "ສັງທອງ", "ປາກງື່ມ", "ໝາກແຂ້ງ"],
  "ຜົ້ງສາລີ": ["ຜົ້ງສາລີ", "ຍອດອູ", "ບຸນເໜືອ", "ບຸນໃຕ້", "ນາໝໍ້", "ຂວາ", "ມະໄຊ"],
  "ຫລວງນ້ຳທາ": ["ໜາມທາ", "ສິງ", "ລອງ", "ວຽງພູຄາ", "ນາແລ"],
  "ບໍ່ແກ້ວ": ["ຕົ້ນເຜິ້ງ", "ຫ້ວຍຊາຍ", "ຕົ້ນປື້ງ", "ພະທັບ", "ເມິງ", "ປາກທາ"],
  "ອຸດົມໄຊ": ["ໄຊ", "ນາໝໍ້", "ງາ", "ຫລາ", "ບຶນເໜືອ", "ປາກແບງ", "ຮຸນ", "ຄອບ"],
  "ໄຊຍະບູລີ": ["ໄຊຍະບູລີ", "ຄອບ", "ຫົງສາ", "ຊຽງຮ່ອນ", "ພຽງ", "ແກ່ນທ້າວ", "ທົ່ງມີໄຊ", "ບໍ່ແຕນ", "ພຽງ"],
  "ຫລວງພະບາງ": ["ຫລວງພະບາງ", "ຊຽງເງິນ", "ນານ", "ປາກອູ", "ນຳບາກ", "ງອຍ", "ປາກແຊງ", "ຈອມເພັດ", "ວຽງຄຳ", "ຟົງ", "ຄອບ"],
  "ຫົວພັນ": ["ຊຳເໜືອ", "ຊຽງຄໍ້", "ຫົວເມືອງ", "ວຽງໄຊ", "ວຽງທອງ", "ຮ້ຽມ", "ສົບເບົາ", "ອາດສະພັງທອງ", "ຊອນ", "ແອດ"],
  "ຊຽງຂວາງ": ["ແປກ", "ຄຳ", "ໜອງແຮດ", "ຄູນ", "ໝອກ", "ຜາໄຊ", "ຜຄູດ"],
  "ວຽງຈັນ": ["ໂພນໂຮງ", "ວັງວຽງ", "ແກ້ວອຸດົມ", "ຫີນເຫີບ", "ຝາງ", "ແມດ", "ຊະນະຄາມ", "ຫີນເຫີບ", "ກາສີ", "ໝື່ນ"],
  "ບໍລິຄຳໄຊ": ["ປາກຊັນ", "ທ່າພະບາດ", "ປາກກະດິງ", "ບໍລິຄັນ", "ຄຳເກີດ", "ວຽງທອງ", "ຄຳມ່ວນ"],
  "ຄຳມ່ວນ": ["ທ່າແຂກ", "ໝາຍ", "ຍົມມະລາດ", "ບົວລະພາ", "ນອງບົກ", "ຫິນບູນ", "ໜອງບົກ", "ໄຊບົວທອງ", "ຄູນຄຳ", "ນາກາຍ"],
  "ສະຫວັນນະເຂດ": ["ໄກສອນ ພົມວິຫານ", "ອຸທຸມພອນ", "ອາດສະພັງທອງ", "ພິນ", "ເຊໂປນ", "ນອງ", "ຈຳພອນ", "ຊົນນະບົວລີ", "ທ່າປາງທອງ"],
  "ສາລະວັນ": ["ສາລະວັນ", "ຄົງເຊໂດນ", "ຫລົງ", "ວາປີ", "ຕະໂອ້ຍ", "ຕຸ້ມລານ", "ລະຄອນເພັງ"],
  "ເຊກອງ": ["ລະມາມ", "ດັກຈຶງ", "ກະລືມ", "ທ່າແຕງ"],
  "ຈຳປາສັກ": ["ປາກເຊ", "ຊະນະສົມບູນ", "ບາຈຽງຈະເລີນສຸກ", "ໂພນທອງ", "ປະທຸມພອນ", "ໂຂງ", "ມູນລະປະໂມກ", "ປາກຊ່ອງ", "ສຸຂຸມາ"],
  "ອັດຕະປື": ["ສາມັກຄີໄຊ", "ສານໄຊ", "ສານໜາມໄຊ", "ພູວົງ"],
  "ໄຊສົມບູນ": ["ອະນຸວົງ", "ລ້ອງແຈ້ງ", "ຫອມ", "ທ່າໂທມ"],
};

const PROVINCES = Object.keys(PROVINCE_DISTRICTS);

function AddressBlock({ title, address, onChange }) {
  const districts = address.province ? PROVINCE_DISTRICTS[address.province] || [] : [];

  const handleProvinceChange = (e) => {
    onChange({ ...address, province: e.target.value, district: "" });
  };

  return (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
      <label className="block text-sm font-semibold text-gray-800 mb-3">{title}</label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <select
            value={address.province}
            onChange={handleProvinceChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none bg-white"
          >
            <option value="">-- ເລືອກແຂວງ --</option>
            {PROVINCES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={address.district}
            onChange={(e) => onChange({ ...address, district: e.target.value })}
            disabled={!address.province}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none bg-white disabled:bg-gray-100 disabled:text-gray-400"
          >
            <option value="">-- ເລືອກເມືອງ --</option>
            {districts.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <input
          type="text"
          placeholder="ບ້ານ"
          value={address.village}
          onChange={(e) => onChange({ ...address, village: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
        />
      </div>
    </div>
  );
}

function SignatureCanvas({ savedSignature, onSave, onCancel }) {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const [hasDrawing, setHasDrawing] = useState(false);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: ((clientX - rect.left) / rect.width) * canvas.width,
      y: ((clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const startDraw = (e) => {
    e.preventDefault();
    const ctx = canvasRef.current.getContext("2d");
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    isDrawing.current = true;
  };

  const draw = (e) => {
    if (!isDrawing.current) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext("2d");
    const { x, y } = getPos(e);
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#0c4a6e";
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasDrawing(true);
  };

  const stopDraw = () => {
    isDrawing.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawing(false);
  };

  const handleSave = () => {
    if (!hasDrawing) return;
    const dataUrl = canvasRef.current.toDataURL("image/png");
    onSave(dataUrl);
  };

  // ຖ້າບັນທຶກລາຍເຊັນແລ້ວ, ສະແດງຮູບແທນ ພ້ອມປຸ່ມຍົກເລີກ
  if (savedSignature) {
    return (
      <div className="border-2 border-sky-200 rounded-lg bg-sky-50 p-4 flex flex-col items-center gap-3">
        <img
          src={savedSignature}
          alt="ລາຍເຊັນທີ່ບັນທຶກໄວ້"
          className="h-28 bg-white border border-gray-200 rounded-md"
        />
        <div className="flex items-center gap-2 text-sm text-sky-700 font-medium">
          <PenTool size={16} />
          ບັນທຶກລາຍເຊັນແລ້ວ (ຊົ່ວຄາວ)
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-1.5 px-4 py-1.5 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
        >
          <Trash2 size={14} />
          ຍົກເລີກການບັນທຶກ
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <canvas
        ref={canvasRef}
        width={500}
        height={160}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={stopDraw}
        className="w-full h-40 bg-white border-2 border-dashed border-gray-300 rounded-lg cursor-crosshair touch-none"
      />
      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-500">ເຊັນລາຍເຊັນຂອງທ່ານໃນກ່ອງຂ້າງເທິງ</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={clearCanvas}
            className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ລຶບ
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!hasDrawing}
            className="px-4 py-1.5 text-sm text-white bg-sky-700 rounded-lg hover:bg-sky-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            ບັນທຶກລາຍເຊັນ
          </button>
        </div>
      </div>
    </div>
  );
}

function RegistrationForm({ onClose }) {
  const [censusAddress, setCensusAddress] = useState({ province: "", district: "", village: "" });
  const [currentAddress, setCurrentAddress] = useState({ province: "", district: "", village: "" });

  const [signatureMethod, setSignatureMethod] = useState("upload"); // "upload" | "digital"
  const [savedSignature, setSavedSignature] = useState(null);

  const handleSignatureMethodChange = (method) => {
    setSignatureMethod(method);
    setSavedSignature(null); // ປ່ຽນວິທີແລ້ວລ້າງລາຍເຊັນທີ່ບັນທຶກໄວ້
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">

      {/* Header (Sticky) */}
      <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
        <h2 className="text-2xl text-sky-800 font-bold">
          ແບບຟອມສະໝັກຮ້ານຄ້າອອນລາຍ
        </h2>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Form Content (Scrollable) */}
      <div className="overflow-y-auto p-6 sm:p-8">
        <form action="" className="space-y-10">

          {/* ================= SECTION 1: ຂໍ້ມູນສ່ວນຕົວ ================= */}
          <section>
            <div className="flex items-center gap-2 border-b border-gray-200 pb-2 mb-6">
              <User className="text-sky-600" size={24} />
              <h3 className="text-lg font-semibold text-gray-800">1. ຂໍ້ມູນສ່ວນຕົວ</h3>
            </div>

            <div className="space-y-5">
              {/* ຊື່ ແລະ ນາມສະກຸນ (ລາວ) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ຊື່ (ພາສາລາວ) *</label>
                  <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ນາມສະກຸນ (ພາສາລາວ) *</label>
                  <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all" />
                </div>
              </div>

              {/* ຊື່ ແລະ ນາມສະກຸນ (ອັງກິດ) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ຊື່ (ພາສາອັງກິດ) *</label>
                  <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ນາມສະກຸນ (ພາສາອັງກິດ) *</label>
                  <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all" />
                </div>
              </div>

              {/* ເພດ ແລະ ວັນເກີດ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ເພດ *</label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all bg-white">
                    <option value="">-- ເລືອກເພດ --</option>
                    <option value="male">ຊາຍ</option>
                    <option value="female">ຍິງ</option>
                    <option value="other">ອື່ນໆ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ວັນ, ເດືອນ, ປີເກີດ *</label>
                  <input type="date" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all" />
                </div>
              </div>

              {/* ຕິດຕໍ່ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ເບີໂທລະສັບ *</label>
                  <input maxLength={11} type="tel" placeholder="020 XXXXXXXX" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ອີເມວ (Email) *</label>
                  <input type="email" placeholder="example@mail.com" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all" />
                </div>
              </div>

              {/* ທີ່ຢູ່ຕາມສຳມະໂນຄົວ */}
              <AddressBlock
                title="ທີ່ຢູ່ຕາມສຳມະໂນຄົວ"
                address={censusAddress}
                onChange={setCensusAddress}
              />

              {/* ທີ່ຢູ່ປັດຈຸບັນ */}
              <AddressBlock
                title="ທີ່ຢູ່ປັດຈຸບັນ"
                address={currentAddress}
                onChange={setCurrentAddress}
              />

              {/* ຂໍ້ມູນເອກະສານ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ປະເພດເອກະສານອ້າງອີງ *</label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none bg-white">
                    <option value="id_card">ບັດປະຈຳຕົວ</option>
                    <option value="passport">ໜັງສືຜ່ານແດນ (Passport)</option>
                    <option value="family_book">ປຶ້ມສຳມະໂນຄົວ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ເລກທີເອກະສານ *</label>
                  <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ວັນທີອອກເອກະສານ *</label>
                  <input type="date" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ວັນໝົດອາຍຸ *</label>
                  <input type="date" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ອັບໂຫຼດຮູບເອກະສານ *</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadCloud className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">ກົດເພື່ອອັບໂຫຼດ</span> ຫຼື ລາກໄຟລ໌ມາວາງທີ່ນີ້</p>
                      <p className="text-xs text-gray-500">PNG, JPG ຫຼື PDF (ສູງສຸດ 5MB)</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*,.pdf" />
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* ================= SECTION 2: ຂໍ້ມູນທຸລະກິດ ================= */}
          <section>
            <div className="flex items-center gap-2 border-b border-gray-200 pb-2 mb-6">
              <Briefcase className="text-sky-600" size={24} />
              <h3 className="text-lg font-semibold text-gray-800">2. ຂໍ້ມູນທຸລະກິດ</h3>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ປະເພດຮ້ານ ຫຼື ແບຣນ *</label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none bg-white">
                    <option value="">-- ເລືອກປະເພດທຸລະກິດ --</option>
                    <option value="retail">ຮ້ານຄ້າປີກ</option>
                    <option value="wholesale">ຮ້ານຄ້າສົ່ງ</option>
                    <option value="food">ຮ້ານອາຫານ/ເຄື່ອງດື່ມ</option>
                    <option value="service">ບໍລິການ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ຊື່ຮ້ານ ຫຼື ຊື່ແບຣນ *</label>
                  <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ເລກທີໃບຈົດທະບຽນ *</label>
                  <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ວັນທີອອກໃບທະບຽນ *</label>
                  <input type="date" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ອັບໂຫຼດໃບທະບຽນ *</label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadCloud className="w-6 h-6 mb-2 text-gray-500" />
                      <p className="text-sm text-gray-500">ອັບໂຫຼດເອກະສານ</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*,.pdf" />
                  </label>
                </div>

                {/* ລາຍເຊັນ: ເລືອກລະຫວ່າງອັບໂຫລດ ຫຼື ເຊັນດີຈີຕອນ */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ລາຍເຊັນ *</label>

                  {/* ຕົວເລືອກວິທີ */}
                  <div className="flex gap-4 mb-3">
                    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input
                        type="radio"
                        name="signatureMethod"
                        checked={signatureMethod === "upload"}
                        onChange={() => handleSignatureMethodChange("upload")}
                        className="accent-sky-600"
                      />
                      ອັບໂຫລດຮູບລາຍເຊັນ
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input
                        type="radio"
                        name="signatureMethod"
                        checked={signatureMethod === "digital"}
                        onChange={() => handleSignatureMethodChange("digital")}
                        className="accent-sky-600"
                      />
                      ເຊັນດີຈີຕອນ
                    </label>
                  </div>

                  {signatureMethod === "upload" ? (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-6 h-6 mb-2 text-gray-500" />
                        <p className="text-sm text-gray-500">ອັບໂຫຼດຮູບລາຍເຊັນ</p>
                      </div>
                      <input type="file" className="hidden" accept="image/*" />
                    </label>
                  ) : (
                    <SignatureCanvas
                      savedSignature={savedSignature}
                      onSave={setSavedSignature}
                      onCancel={() => setSavedSignature(null)}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>

        </form>
      </div>

      {/* Footer / Action Buttons (Sticky at bottom) */}
      <div className="border-t border-gray-100 bg-gray-50 p-6 flex justify-end gap-3 rounded-b-2xl">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          ຍົກເລີກ
        </button>
        <button
          type="submit"
          className="px-8 py-2.5 bg-sky-700 text-white rounded-lg font-medium hover:bg-sky-800 transition-colors shadow-lg shadow-sky-700/30"
        >
          ສົ່ງແບບຟອມ
        </button>
      </div>

    </div>
  );
}

export default RegistrationForm;