import { useRef, useState } from "react";
import type {
  ChangeEvent,
  FormEvent,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
} from "react";
import { X, User, Briefcase, UploadCloud, PenTool, Trash2, Eye, EyeOff, CheckCircle2 } from "lucide-react";

/* ===================== CONFIG ===================== */
const API_URL = "https://app-6ac709b8.deploy.meerasolution.com/user";
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string; // unsigned preset
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// ຄ່າຄົງທີ່ທີ່ frontend ກຳນົດເອງ (ບໍ່ໃຫ້ຜູ້ໃຊ້ແກ້ໄຂ)
const DEFAULT_ROLE = "SHOP_OWNER";
const DEFAULT_IS_ACTIVE = false;

const PROVINCE_DISTRICTS: Record<string, string[]> = {
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

const MIN_PASSWORD_LENGTH = 8;

interface Address {
  province: string;
  district: string;
  village: string;
}

type SignatureMethod = "upload" | "digital";

/* ===================== HELPERS ===================== */
async function uploadToCloudinary(file: Blob): Promise<string> {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  // "auto" ຮອງຮັບທັງຮູບ ແລະ PDF
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`, {
    method: "POST",
    body: data,
  });
  if (!res.ok) {
    throw new Error("ອັບໂຫຼດໄຟລ໌ໄປ Cloudinary ບໍ່ສຳເລັດ");
  }
  const json = await res.json();
  return json.secure_url as string;
}

async function dataUrlToBlob(dataUrl: string): Promise<Blob> {
  const res = await fetch(dataUrl);
  return res.blob();
}

function validateFiles(files: File[]): string | null {
  for (const f of files) {
    if (f.size > MAX_FILE_SIZE) return `ໄຟລ໌ "${f.name}" ໃຫຍ່ກວ່າ 5MB`;
  }
  return null;
}

/* ===================== COMPONENTS ===================== */
interface AddressBlockProps {
  title: string;
  address: Address;
  onChange: (address: Address) => void;
}

function AddressBlock({ title, address, onChange }: AddressBlockProps) {
  const districts = address.province ? PROVINCE_DISTRICTS[address.province] || [] : [];

  const handleProvinceChange = (e: ChangeEvent<HTMLSelectElement>) => {
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
            onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange({ ...address, district: e.target.value })}
            disabled={!address.province}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none bg-white disabled:bg-gray-100 disabled:text-gray-400"
          >
            <option value="">-- ເລືອກເມືອງ --</option>
            {districts.map((d, i) => (
              <option key={`${d}-${i}`} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <input
          type="text"
          placeholder="ບ້ານ"
          value={address.village}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange({ ...address, village: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
        />
      </div>
    </div>
  );
}

interface PasswordFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

function PasswordField({ label, value, onChange, error }: PasswordFieldProps) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          autoComplete="new-password"
          className={`w-full px-4 py-2.5 pr-11 border rounded-lg focus:ring-2 outline-none transition-all ${
            error
              ? "border-red-400 focus:ring-red-300"
              : "border-gray-300 focus:ring-sky-500 focus:border-sky-500"
          }`}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
          aria-label={show ? "ເຊື່ອງລະຫັດຜ່ານ" : "ສະແດງລະຫັດຜ່ານ"}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  maxLength?: number;
}

function TextField({ label, value, onChange, type = "text", placeholder, maxLength }: TextFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
      />
    </div>
  );
}

interface FileDropProps {
  label: string;
  hint: string;
  accept: string;
  multiple?: boolean;
  files: File[];
  onChange: (files: File[]) => void;
  tall?: boolean;
}

function FileDrop({ label, hint, accept, multiple, files, onChange, tall }: FileDropProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <label
        className={`flex flex-col items-center justify-center w-full ${
          tall ? "h-32" : "h-32"
        } border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 px-2 text-center">
          {files.length > 0 ? (
            <>
              <CheckCircle2 className="w-6 h-6 mb-2 text-green-600" />
              <p className="text-sm text-green-700 break-all">
                {files.length === 1 ? files[0].name : `ເລືອກແລ້ວ ${files.length} ໄຟລ໌`}
              </p>
            </>
          ) : (
            <>
              <UploadCloud className="w-6 h-6 mb-2 text-gray-500" />
              <p className="text-sm text-gray-500">{hint}</p>
            </>
          )}
        </div>
        <input
          type="file"
          multiple={multiple}
          className="hidden"
          accept={accept}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(Array.from(e.target.files ?? []))}
        />
      </label>
    </div>
  );
}

interface SignatureCanvasProps {
  savedSignature: string | null;
  onSave: (dataUrl: string) => void;
  onCancel: () => void;
}

type CanvasPointerEvent =
  | ReactMouseEvent<HTMLCanvasElement>
  | ReactTouchEvent<HTMLCanvasElement>;

function SignatureCanvas({ savedSignature, onSave, onCancel }: SignatureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const [hasDrawing, setHasDrawing] = useState(false);

  const getCtx = () => canvasRef.current?.getContext("2d") ?? null;

  const getPos = (e: CanvasPointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const point = "touches" in e ? e.touches[0] : e;
    return {
      x: ((point.clientX - rect.left) / rect.width) * canvas.width,
      y: ((point.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const startDraw = (e: CanvasPointerEvent) => {
    e.preventDefault();
    const ctx = getCtx();
    const pos = getPos(e);
    if (!ctx || !pos) return;
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    isDrawing.current = true;
  };

  const draw = (e: CanvasPointerEvent) => {
    if (!isDrawing.current) return;
    e.preventDefault();
    const ctx = getCtx();
    const pos = getPos(e);
    if (!ctx || !pos) return;
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#0c4a6e";
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    setHasDrawing(true);
  };

  const stopDraw = () => {
    isDrawing.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawing(false);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!hasDrawing || !canvas) return;
    onSave(canvas.toDataURL("image/png"));
  };

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

/* ===================== MAIN FORM ===================== */
interface RegistrationFormProps {
  onClose: () => void;
}

const emptyAddress: Address = { province: "", district: "", village: "" };

function RegistrationForm({ onClose }: RegistrationFormProps) {
  // ຂໍ້ມູນສ່ວນຕົວ
  const [laoName, setLaoName] = useState("");
  const [laoLastname, setLaoLastname] = useState("");
  const [engName, setEngName] = useState("");
  const [engLastname, setEngLastname] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");

  const [censusAddress, setCensusAddress] = useState<Address>(emptyAddress);
  const [currentAddress, setCurrentAddress] = useState<Address>(emptyAddress);

  // ເອກະສານ
  const [documentType, setDocumentType] = useState("id_card");
  const [documentId, setDocumentId] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);

  // ທຸລະກິດ
  const [brandType, setBrandType] = useState("");
  const [brandName, setBrandName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [registrationFile, setRegistrationFile] = useState<File[]>([]);
  const [logoFile, setLogoFile] = useState<File[]>([]);

  // ລາຍເຊັນ
  const [signatureMethod, setSignatureMethod] = useState<SignatureMethod>("upload");
  const [savedSignature, setSavedSignature] = useState<string | null>(null);
  const [signatureFile, setSignatureFile] = useState<File[]>([]);

  // ລະຫັດຜ່ານ
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ສະຖານະການສົ່ງ
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const passwordError =
    password && password.length < MIN_PASSWORD_LENGTH
      ? `ລະຫັດຜ່ານຕ້ອງມີຢ່າງໜ້ອຍ ${MIN_PASSWORD_LENGTH} ຕົວອັກສອນ`
      : undefined;
  const confirmError =
    confirmPassword && password !== confirmPassword ? "ລະຫັດຜ່ານບໍ່ຕົງກັນ" : undefined;

  const handleSignatureMethodChange = (method: SignatureMethod) => {
    setSignatureMethod(method);
    setSavedSignature(null);
    setSignatureFile([]);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    // ກວດສອບຂໍ້ມູນພື້ນຖານ
    if (!laoName.trim() || !engName.trim() || !gender || !tel.trim()) {
      setSubmitError("ກະລຸນາຕື່ມຂໍ້ມູນທີ່ຈຳເປັນ (ຊື່, ເພດ, ເບີໂທລະສັບ)");
      return;
    }
    if (password.length < MIN_PASSWORD_LENGTH || password !== confirmPassword) {
      setSubmitError("ກະລຸນາກວດສອບລະຫັດຜ່ານ");
      return;
    }
    const sizeError = validateFiles([...documentFiles, ...registrationFile, ...logoFile, ...signatureFile]);
    if (sizeError) {
      setSubmitError(sizeError);
      return;
    }

    setSubmitting(true);
    try {
      // 1) ອັບໂຫຼດຮູບທັງໝົດໄປ Cloudinary ພ້ອມກັນ → ໄດ້ URL
      const signatureUpload = async (): Promise<string | undefined> => {
        if (signatureMethod === "digital" && savedSignature) {
          return uploadToCloudinary(await dataUrlToBlob(savedSignature));
        }
        if (signatureMethod === "upload" && signatureFile[0]) {
          return uploadToCloudinary(signatureFile[0]);
        }
        return undefined;
      };

      const [documentImage, registrationImage, logo, signature] = await Promise.all([
        Promise.all(documentFiles.map((f) => uploadToCloudinary(f))),
        registrationFile[0] ? uploadToCloudinary(registrationFile[0]) : Promise.resolve(undefined),
        logoFile[0] ? uploadToCloudinary(logoFile[0]) : Promise.resolve(undefined),
        signatureUpload(),
      ]);

      // 2) ສ້າງ payload ຕາມ CreateUserDto
      const payload = {
        laoName,
        laoLastname,
        engName,
        engLastname,
        gender,
        birth,
        tel,
        email,
        password,

        bornProvince: censusAddress.province,
        bornDistrict: censusAddress.district,
        bornVillage: censusAddress.village,
        presentProvince: currentAddress.province,
        presentDistrict: currentAddress.district,
        presentVillage: currentAddress.village,

        documentType,
        documentId,
        issueDate,
        expiryDate,
        documentImage: documentImage.length ? documentImage : undefined,

        brandType,
        brandName,
        registrationNumber,
        registrationDate,
        registrationImage,
        logo,
        signature,

        // ກຳນົດຈາກ frontend ສະເໝີ
        role: DEFAULT_ROLE,
        isActive: DEFAULT_IS_ACTIVE,
      };

      // ຕັດຄ່າວ່າງ "" ອອກ (IsOptional ຂ້າມສະເພາະ undefined/null, ບໍ່ແມ່ນ "")
      const body = Object.fromEntries(
        Object.entries(payload).filter(([, v]) => v !== "" && v !== undefined),
      );

      // 3) ສົ່ງໄປ back-end
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        const msg = Array.isArray(err?.message) ? err.message.join(", ") : err?.message;
        throw new Error(msg || `ສົ່ງຂໍ້ມູນບໍ່ສຳເລັດ (${res.status})`);
      }

      setSubmitSuccess(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "ເກີດຂໍ້ຜິດພາດ, ກະລຸນາລອງໃໝ່");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">

      {/* Header (Sticky) */}
      <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
        <h2 className="text-2xl text-sky-800 font-bold">
          ແບບຟອມສະໝັກຮ້ານຄ້າອອນລາຍ
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Form Content (Scrollable) */}
      <div className="overflow-y-auto p-6 sm:p-8">
        {submitSuccess ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <CheckCircle2 className="text-green-600" size={56} />
            <h3 className="text-xl font-semibold text-gray-800">ສົ່ງແບບຟອມສຳເລັດ</h3>
            <p className="text-gray-500">ກະລຸນາລໍຖ້າການອະນຸມັດຈາກຜູ້ດູແລລະບົບ</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-sky-700 text-white rounded-lg font-medium hover:bg-sky-800 transition-colors"
            >
              ປິດ
            </button>
          </div>
        ) : (
          <form id="registration-form" onSubmit={handleSubmit} className="space-y-10">

            {/* ================= SECTION 1: ຂໍ້ມູນສ່ວນຕົວ ================= */}
            <section>
              <div className="flex items-center gap-2 border-b border-gray-200 pb-2 mb-6">
                <User className="text-sky-600" size={24} />
                <h3 className="text-lg font-semibold text-gray-800">1. ຂໍ້ມູນສ່ວນຕົວ</h3>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField label="ຊື່ (ພາສາລາວ) *" value={laoName} onChange={setLaoName} />
                  <TextField label="ນາມສະກຸນ (ພາສາລາວ) *" value={laoLastname} onChange={setLaoLastname} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField label="ຊື່ (ພາສາອັງກິດ) *" value={engName} onChange={setEngName} />
                  <TextField label="ນາມສະກຸນ (ພາສາອັງກິດ) *" value={engLastname} onChange={setEngLastname} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ເພດ *</label>
                    <select
                      value={gender}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => setGender(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all bg-white"
                    >
                      <option value="">-- ເລືອກເພດ --</option>
                      <option value="male">ຊາຍ</option>
                      <option value="female">ຍິງ</option>
                      <option value="other">ອື່ນໆ</option>
                    </select>
                  </div>
                  <TextField label="ວັນ, ເດືອນ, ປີເກີດ *" type="date" value={birth} onChange={setBirth} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField label="ເບີໂທລະສັບ *" type="tel" placeholder="020 XXXXXXXX" maxLength={11} value={tel} onChange={setTel} />
                  <TextField label="ອີເມວ (Email) *" type="email" placeholder="example@mail.com" value={email} onChange={setEmail} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <PasswordField label="ລະຫັດຜ່ານ *" value={password} onChange={setPassword} error={passwordError} />
                  <PasswordField label="ຢືນຢັນລະຫັດຜ່ານ *" value={confirmPassword} onChange={setConfirmPassword} error={confirmError} />
                </div>

                <AddressBlock title="ທີ່ຢູ່ຕາມສຳມະໂນຄົວ" address={censusAddress} onChange={setCensusAddress} />
                <AddressBlock title="ທີ່ຢູ່ປັດຈຸບັນ" address={currentAddress} onChange={setCurrentAddress} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ປະເພດເອກະສານອ້າງອີງ *</label>
                    <select
                      value={documentType}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => setDocumentType(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none bg-white"
                    >
                      <option value="id_card">ບັດປະຈຳຕົວ</option>
                      <option value="passport">ໜັງສືຜ່ານແດນ (Passport)</option>
                      <option value="family_book">ປຶ້ມສຳມະໂນຄົວ</option>
                    </select>
                  </div>
                  <TextField label="ເລກທີເອກະສານ *" value={documentId} onChange={setDocumentId} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField label="ວັນທີອອກເອກະສານ *" type="date" value={issueDate} onChange={setIssueDate} />
                  <TextField label="ວັນໝົດອາຍຸ *" type="date" value={expiryDate} onChange={setExpiryDate} />
                </div>

                <FileDrop
                  label="ອັບໂຫຼດຮູບເອກະສານ *"
                  hint="ກົດເພື່ອອັບໂຫຼດ (PNG, JPG ຫຼື PDF, ສູງສຸດ 5MB)"
                  accept="image/*,.pdf"
                  multiple
                  files={documentFiles}
                  onChange={setDocumentFiles}
                />
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
                    <select
                      value={brandType}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => setBrandType(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none bg-white"
                    >
                      <option value="">-- ເລືອກປະເພດທຸລະກິດ --</option>
                      <option value="retail">ຮ້ານຄ້າປີກ</option>
                      <option value="wholesale">ຮ້ານຄ້າສົ່ງ</option>
                      <option value="food">ຮ້ານອາຫານ/ເຄື່ອງດື່ມ</option>
                      <option value="service">ບໍລິການ</option>
                      <option value="ຮ້່ານຂາຍທົ່ວໄປ">ຮ້່ານຂາຍທົ່ວໄປ</option>
                    </select>
                  </div>
                  <TextField label="ຊື່ຮ້ານ ຫຼື ຊື່ແບຣນ *" value={brandName} onChange={setBrandName} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField label="ເລກທີໃບຈົດທະບຽນ *" value={registrationNumber} onChange={setRegistrationNumber} />
                  <TextField label="ວັນທີອອກໃບທະບຽນ *" type="date" value={registrationDate} onChange={setRegistrationDate} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FileDrop
                    label="ອັບໂຫຼດໃບທະບຽນ *"
                    hint="ອັບໂຫຼດເອກະສານ"
                    accept="image/*,.pdf"
                    files={registrationFile}
                    onChange={setRegistrationFile}
                  />
                  <FileDrop
                    label="ອັບໂຫລດໂປຣຟາຍຮ້ານ ຫຼື ໂລໂກ"
                    hint="ອັບໂຫລດໂປຣຟາຍຮ້ານ ຫຼື ໂລໂກ"
                    accept="image/*,.pdf"
                    files={logoFile}
                    onChange={setLogoFile}
                  />

                  {/* ລາຍເຊັນ */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ລາຍເຊັນ *</label>

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
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 px-2 text-center">
                          {signatureFile.length > 0 ? (
                            <>
                              <CheckCircle2 className="w-6 h-6 mb-2 text-green-600" />
                              <p className="text-sm text-green-700 break-all">{signatureFile[0].name}</p>
                            </>
                          ) : (
                            <>
                              <UploadCloud className="w-6 h-6 mb-2 text-gray-500" />
                              <p className="text-sm text-gray-500">ອັບໂຫຼດຮູບລາຍເຊັນ</p>
                            </>
                          )}
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setSignatureFile(Array.from(e.target.files ?? []))
                          }
                        />
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

            {submitError && (
              <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
                {submitError}
              </div>
            )}
          </form>
        )}
      </div>

      {/* Footer / Action Buttons */}
      {!submitSuccess && (
        <div className="border-t border-gray-100 bg-gray-50 p-6 flex justify-end gap-3 rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            ຍົກເລີກ
          </button>
          <button
            type="submit"
            form="registration-form"
            disabled={submitting}
            className="px-8 py-2.5 bg-sky-700 text-white rounded-lg font-medium hover:bg-sky-800 transition-colors shadow-lg shadow-sky-700/30 disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed"
          >
            {submitting ? "ກຳລັງສົ່ງ..." : "ສົ່ງແບບຟອມ"}
          </button>
        </div>
      )}
    </div>
  );
}

export default RegistrationForm;