import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, } from "react-router-dom";
import { cn } from "@/lib/utils"
import { Menu, X, LogIn, House, CarFront, LayersIcon, ArrowRightLeft, Calculator, LogOutIcon } from 'lucide-react'
import Footer from "./Footer";
import { featchCarData, getlatestCar } from "@/Redux/Slice/DataSlice";
import { useDispatch } from "react-redux";
import AuthNavbar from "./AuthNavbar";

const menuItems = [
  {
    name: 'Home',
    href: '/',
    icon: House,
    color: "text-sky-500"
  },
  {
    name: 'Cars',
    href: '/cars',
    icon: CarFront,
    color: "text-violet-500"
  },
  {
    name: 'Category',
    href: '/category',
    icon: LayersIcon,
    color: "text-green-500"
  },
  {
    name: 'Comparison Cars',
    href: '/Comparison',
    icon: ArrowRightLeft,
    color: "text-[crimson]"
  },
  {
    name: 'EMI Calculator',
    href: '/calculator',
    icon: Calculator,
    color: "text-themecolor"
  },

]


const Navbar = () => {
  // dispatch function  import 
  const dispatch = useDispatch();
  useEffect(() => {
    //feaatching the data when its load  
    dispatch(featchCarData()).then(() => {
      //after dispatching the main  data then featch the leatest car  
      dispatch(getlatestCar());
    });
  }, []);

  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <div className="relative w-full ">
      <div className="mx-auto bg-black text-white  flex max-w-[100%] shadow-lg  items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <img src="./src/assets/icon.png" alt="" className="fill-current h-14 mr-2 w-14 " />
          <span className="font-bold text-xl tracking-tight  mt-4 ">
            Carvely
          </span>
        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={cn(" text-md group flex p-3 w-full justify-start font-medium cursor-pointer   hover:text-white hover:bg-white/10 rounded-lg transition"
                    , location.pathname === item.href ? "text-white bg-white/10 " : "text-zinc-400"
                  )}
                >
                  <item.icon className={cn("h-5 w-5 mr-3", item.color)} />

                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden lg:block">
          {/* <AuthNavbar /> */}
        </div>
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <img src="./src/assets/icon.png" alt="" className="fill-current h-14 mr-2 w-14 " />
                    <span className="font-bold text-xl tracking-tight text-black mt-4">
                      Carvely
                    </span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={cn("-m-3 flex items-center rounded-md p-3 text-lg font-semibold ",
                          location.pathname === item.href ? "text-white bg-gray-300  " : "text-zinc-400"

                        )}
                      >

                        <span className="ml-3 flex text-base font-medium text-gray-900">
                          <item.icon className={cn("h-5 w-5 mr-3", item.color)} />

                          {item.name}
                        </span>
                      </NavLink>
                    ))}
                  </nav>
                </div>
                <div className=" mt-3">
                  {/* <AuthNavbar /> */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Outlet />

      <Footer />
    </div >
  )
};

export default Navbar;
