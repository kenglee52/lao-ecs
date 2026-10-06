import { useState } from "react";
import Logo from "../assets/images/Logo.jpeg"
import { 
  Menu, 
  X, 
  Home, 
  Info, 
  Download, 
  Store, 
  PhoneCall, 
} from "lucide-react";

function Navbar() {
  const [activeMenu, setActiveMenu] = useState("ໜ້າຫຼັກ");
  const [openMenu, setOpenMenu] = useState(false);

  const menu = [
    { menu: "ໜ້າຫຼັກ", location: "#", icon: Home },
    { menu: "ກ່ຽວກັບເຮົາ", location: "#about", icon: Info },
    { menu: "ສະໝັກເປີດຮ້ານ", location: "#register", icon: Store },
    { menu: "ດາວໂຫລດແອັບ", location: "#download", icon: Download },
    { menu: "ຂໍ້ມູນຕິດຕໍ່", location: "#contact", icon: PhoneCall },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white backdrop-blur-md border-b border-sky-100 shadow-sm px-3">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-3 cursor-pointer">
            <img src={Logo} className="max-w-[55px] object-fill rounded-xl" alt="" />
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-sky-900 uppercase">
              LAO ECS
            </span>
          </div>
          <nav className="hidden lg:flex items-center space-x-1 lg:space-x-2">
            {menu.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.menu;
              return (
                <a
                  key={index}
                  href={item.location}
                  onClick={() => setActiveMenu(item.menu)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm lg:text-base font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-sky-700 text-white shadow-md shadow-sky-200"
                      : "text-gray-600 hover:text-sky-700 hover:bg-sky-50"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-sky-600"}`} />
                  <span>{item.menu}</span>
                </a>
              );
            })}
          </nav>
          <div className="flex lg:hidden">
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="p-2 rounded-lg text-sky-700 hover:bg-sky-50 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              {openMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      {openMenu && (
        <div className="lg:hidden bg-white border-b border-sky-100 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {menu.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.menu;
            return (
              <a
                key={index}
                href={item.location}
                onClick={() => {
                  setActiveMenu(item.menu);
                  setOpenMenu(false);
                }}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-sky-700 text-white"
                    : "text-gray-700 hover:bg-sky-50 hover:text-sky-700"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-sky-600"}`} />
                <span>{item.menu}</span>
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}

export default Navbar;