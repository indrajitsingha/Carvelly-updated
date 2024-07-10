import MobileSidebar from "./Mobile-sidebar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ChevronDownIcon, LogOutIcon } from "lucide-react"
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import supabase from '@/supabase/supabase';
import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { SignoutUser } from "@/Redux/Slice/AutSlice"


const Navbar = () => {
    const Dispatch = useDispatch()
    const navigate = useNavigate();
    const [Session, setSession] = useState(null);

    useEffect(() => {
          console.log("user navbar");
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                setSession(session);
                // navigate("/admin/");
            } else {
                setSession(null);
                console.log("navbar");
                navigate("/AdminLogin");
            }
            console.log(session);
        });
    }, []);
    console.log(Session);
    const Logout = () => {
        supabase.auth.signOut().then(() => {
            setSession(null);
            Dispatch(SignoutUser())
            navigate("/AdminLogin");
        })
    }
    return (
        <div className=" flex items-center p-4" >
            <MobileSidebar />
            <div className=" flex w-full justify-end">
                {/* Singnin */}
                {/* <button onClick={()=> navigate("/AdminLogin" )}>sddddd</button> */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2">
                            {/* <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder-user.jpg" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar> */}
                            <span className="font-medium">{Session?.user?.email}</span>
                            <ChevronDownIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={Logout} className="text-red-700 font-bold">
                            <LogOutIcon className="mr-2 h-4 w-4" />
                            Sign Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div >
    )
}

export default Navbar