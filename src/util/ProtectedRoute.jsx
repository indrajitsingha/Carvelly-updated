import useNormalFetchData from '@/hooks/useNormalFetchData';
import supabase from '../supabase/supabase';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SigninUser, SignoutUser } from '@/Redux/Slice/AutSlice';

const isAuthenticated = () => {
    return localStorage.getItem('access_token') !== null;
};

const ProtectedRoute = ({ children }) => {
    const { Data: Admins, isDataLoading } = useNormalFetchData({ tableName: "Admin" });
    console.log(Admins);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [session, setSession] = useState(null);
const getauth=async()=>{
    await supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
    });
}

    useEffect(() => {
        getauth()
        console.log("First useEffect called");
    }, []);

    // useEffect(() => {
    //     if (session && Admins && !isDataLoading) {
    //         const isAdmin = Admins.find(admin => admin?.Email === session?.user?.email);
    //         console.log("second  useEffect called");
    //         console.log(session, isAdmin, Admins);
    //         if (isAdmin) {
    //             dispatch(SigninUser({ ...isAdmin, ...session }));
    //             navigate("/admin/");
    //             console.log("Admin authenticated, redirecting to /admin/");
    //             console.log(isAdmin);
    //         } else {
    //             supabase.auth.signOut();
    //             dispatch(SignoutUser());
    //             alert("You are not authorized to access this page.");
    //             console.log("You are not authorized to access this page.");
    //             navigate("/AdminLogin");
    //         }
    //     }
    // }, [Admins,isDataLoading, session]);

    return isAuthenticated() ? children : navigate("/AdminLogin");
};

export default ProtectedRoute;
