import { useEffect, useState } from "react";
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import supabase from '@/supabase/supabase';
import { useNavigate } from "react-router-dom";
import { CarFront } from "lucide-react";
import { carvellyFeatures } from "@/constant/constantVariable";

const AdminLogin = () => {
  const [session, setSession] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    console.log("userLogin");
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


  if (!session) {
    return (
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-[60%,40%] w-[100%]">
          <div className="relative hidden sm:flex w-[100%] items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
            <div className="absolute inset-0">
              <img
                className="h-full w-full  object-cover object-top"
                src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt=""
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <div className="relative">
              <div className="w-full  xl:pr-24">
                <h3 className="text-4xl font-bold text-white">
                  Welcome to Carvelly
                </h3>
                <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                  {carvellyFeatures?.map((value) => (
                    <li key={value.title} className="flex items-center space-x-3">
                      <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                        <svg
                          className="h-3.5 w-3.5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <span className="text-lg font-medium text-white">
                        {value.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center h-[100vh] bg-[#1A1A1A]  px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className=" w-[400px] sm:w-[500px]  bg-[#1E1E1E] p-3 rounded-md ">
              <div className=" flex gap-3 justify-start items-center">
                <CarFront className=" text-green-500 text-2xl" />
                <h2 className="text-2xl font-bold leading-tight text-white sm:text-2xl">Sign in for Users</h2>
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
        </div>
      </section>

    )
  }
  else {
    navigate("/");
  }
};

export default AdminLogin;
