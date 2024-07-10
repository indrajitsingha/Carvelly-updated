

import { Car, CarFront, LayersIcon, LayoutDashboard, TagIcon, Users, VideoIcon } from "lucide-react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { useSelector } from "react-redux"

const Routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/admin",
        color: "text-sky-500"
    },
    {
        label: "Add cars",
        icon: Car,
        href: "/admin/addcar",
        color: "text-violet-500"
    },
    {
        label: "Show Cars",
        icon: CarFront,
        href: "/admin/showcars",
        color: "text-pink-700"
    },

    {
        label: "Add Brands",
        icon: TagIcon,
        href: "/admin/AddBrand",
        color: "text-emerald-500"
    },
    {
        label: "Add Categories",
        icon: LayersIcon,
        href: "/admin/AddCategories",
        color: "text-green-500"
    },
    {
        label: "Add Admin",
        icon: Users,
        href: "/admin/AddAdmin",
        color: "text-orange-700"
    },

]
const Sidebar = () => {

    const { user } = useSelector((data) => data.Auth)

    const location = useLocation()

    return (
        <div className="space-y-4 relative py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="  px-3 py-2 flex-1">
                <Link to="/dashboard" className="flex items-center pl-3 mb-14">
                    <img src="../src/assets/icon.png" alt="" className="fill-current h-14 mr-2 w-14 " />
                    <h1 className={cn(" text-2xl font-bold mt-4")}>
                        Carvelly
                    </h1>
                </Link>
                <div className="space-y-1">
                    {
                        Routes.map((route) => {
                            return (
                                <NavLink to={route.href} key={route.href}
                                    className={cn(" text-md group flex p-3 w-full justify-start font-medium cursor-pointer   hover:text-white hover:bg-white/10 rounded-lg transition"
                                        , location.pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
                                    )} >
                                    <div className=" flex items-center flex-1">
                                        <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                        {route.label}
                                    </div>
                                </NavLink>
                            )
                        })
                    }
                </div>
            </div>
            <div className=" absolute bottom-0 space-y-1 w-[100%] flex justify-center">
                <div className="text-md  group flex p-3 gap-1 w-[90%] mb-4 justify-start font-medium cursor-pointer   hover:text-white hover:bg-white/10 rounded-lg transition text-white bg-white/10">
                    <Avatar className="">
                        <AvatarImage className=" h-14 w-14 object-contain rounded-lg" src={user?.Avatar} />
                        <AvatarFallback>Avatar</AvatarFallback>
                    </Avatar>
                    <div className="text-center text-primary-foreground ">
                        <div className="text-lg font-medium">{user?.Name}</div>
                        <div className="text-sm text-primary-foreground/80">{user?.user?.email}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar