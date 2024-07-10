import supabase from "@/supabase/supabase";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SigninUser, SignoutUser } from "@/Redux/Slice/AutSlice";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDownIcon, LogIn, LogOutIcon } from "lucide-react";
import { useDispatch } from "react-redux";

const AuthNavbar = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [Session, setSession] = useState(null);

    useEffect(() => {
        console.log("user navbar");
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                setSession(session);
                dispatch(SigninUser(session))
            } else {
                setSession(null);
                console.log(" user navbar");
            }
            console.log(session);
        })
    }, []);
    console.log(Session);
    const Logout = () => {
        supabase.auth.signOut().then(() => {
            setSession(null);
            dispatch(SignoutUser())
            navigate("/");
        })
    }
    if (Session?.user) {
        return (
            <DropdownMenu >
                <DropdownMenuTrigger asChild className=" bg-black">
                    <Button variant="outline" className="flex items-center gap-2">
                        <span className="font-medium">{Session?.user?.email}</span>
                        <ChevronDownIcon className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className=" z-40 ">
                    <DropdownMenuItem onClick={Logout} className="text-white font-bold flex items-center gap-2 outline-none">
                        <Button variant="destructive" className="flex items-center gap-2 outline-none mt-1">

                            <LogOutIcon className="mr-2 h-4 w-4" />
                            Sign Out
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    } else {
        return (
            <Link
                type="button"
                to="userlogin"
                className="rounded-md flex gap-3 bg-main px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
                Login <LogIn />
            </Link>
        )
    }

}

export default AuthNavbar

