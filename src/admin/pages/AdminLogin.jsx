import { useEffect, useState } from "react";
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import supabase from '@/supabase/supabase';
import { useNavigate } from "react-router-dom";
import { CarFront } from "lucide-react";
import { useDispatch } from "react-redux";
import useNormalFetchData from "@/hooks/useNormalFetchData";
import { SigninUser, SignoutUser } from "@/Redux/Slice/AutSlice";

const AdminLogin = () => {
  const { Data: Admins, isDataLoading } = useNormalFetchData({ tableName: "Admin" });
  console.log(Admins);
  const dispatch = useDispatch();
  const [session, setSession] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()

  }, [session])




  useEffect(() => {
    if (session && Admins && !isDataLoading) {
      const isAdmin = Admins.find(admin => admin?.Email === session?.user?.email);
      console.log("second  useEffect called");
      console.log(session, isAdmin, Admins);
      if (isAdmin) {
        dispatch(SigninUser({ ...isAdmin, ...session }));
        navigate("/admin/");
        console.log("Admin authenticated, redirecting to /admin/");
        console.log(isAdmin);
      } else {
        supabase.auth.signOut();
        dispatch(SignoutUser());
        alert("You are not authorized to access this page.");
        console.log("You are not authorized to access this page.");
        navigate("/AdminLogin");
      }
    }
  }, [Admins, isDataLoading, session]);
  
  if (!session) {
    return (
      <div className="flex items-center justify-center h-[100vh] bg-[#1A1A1A]  px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className=" w-[400px] sm:w-[500px]  bg-[#1E1E1E] p-3 rounded-md ">
          <div className=" flex gap-3 justify-start items-center">
            <CarFront className=" text-green-500 text-2xl" />
            <h2 className="text-2xl font-bold leading-tight text-white sm:text-2xl">Sign in for Admin</h2>
          </div>
          {/* "button", "container", "anchor", "divider", "label", "input", "loader", "message".*/}
          <Auth supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              style: {
                button: { background: '#282828', color: 'white', border: "none", },
                anchor: { color: '#39C882' },
                divider: { background: "#282828" },
                message: { background: "none", border: "none" },
                input: { color: "white", fontWeight: "bold" }
              },
            }}
            providers={['google', 'facebook', 'twitter']}
          />
        </div>
      </div>
    )
  }
  else {
    navigate("/admin/");
  }
};

export default AdminLogin;
