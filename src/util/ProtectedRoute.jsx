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

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            console.log("Session fetched:", session);
        }).catch(error => {
            console.error("Error fetching session:", error);
        });
    }, []);

    useEffect(() => {
        if (session && Admins && !isDataLoading) {
            const isAdmin = Admins.find(admin => admin?.Email === session?.user?.email);
            console.log("Second useEffect called");
            console.log("Session:", session);
            console.log("Admin found:", isAdmin);
            console.log("Admins list:", Admins);
            if (isAdmin) {
                dispatch(SigninUser({ ...isAdmin, ...session }));
                navigate("/admin/");
                console.log("Admin authenticated, redirecting to /admin/");
            } else {
                supabase.auth.signOut().then(() => {
                    dispatch(SignoutUser());
                    alert("You are not authorized to access this page.");
                    console.log("User is not authorized, signing out and redirecting to /AdminLogin");
                    navigate("/AdminLogin");
                }).catch(error => {
                    console.error("Error signing out:", error);
                });
            }
        }
    }, [Admins, isDataLoading, session, dispatch, navigate]);

    return isAuthenticated() ? children : navigate("/AdminLogin");
};

export default ProtectedRoute;
