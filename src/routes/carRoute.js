import Navbar from "@/components/Navbar";
import Spinner from "@/components/Spinner";
import Cars from "../pages/Cars";
import Home from "../pages/Home";
import { Suspense } from "react";
import { createBrowserRouter } from 'react-router-dom';

/*
 <Routes>
        <Route path ="/" element={<Navbar/>}> 
        <Route index element={<Home/>}/>
        <Route path ="/cars" element={<Cars/>}/>
        <Route path ="cars/:carID" element={<GetDetils/>}/>
        <Route path ="/category" element={<Category/>}/>
        <Route path ="/userlogin" element={<UserLogin/>}/>
        <Route path ="/Comparison" element={<Comparison/>}/>
        <Route path ="/Comparison/:carID1?/:carID2" element={<ComparisonDetails/>}/>
        <Route path ="/calculator" element={<EmiCalculator/>}/>
        <Route path ="/Aboutus" element={<About/>}/>
        </Route>
*/
const carRoute = createBrowserRouter([
    {
        path: "/",
        element: <Navbar />,
        children: [
            { index: true, element: <Home /> },
            {
                path: "cars",
                element: <Cars />
            }
        ]
    }
]);
export default carRoute