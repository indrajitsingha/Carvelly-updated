import { lazy, Suspense } from 'react'
import './App.css'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Spinner from './components/Spinner'
import Navbar from './components/Navbar'
import store from './Redux/Store/Store'
import AdminNavbar from './admin/components/AdminNavbar'
import ProtectedRoute from './util/ProtectedRoute'
import Home from "./pages/Home"
import AdminDashboard from './admin/pages/AdminDashboard'
import { ProtectedRouteUser } from './util/ProtectedRouteUser'
import Error from './pages/Error'


// const Home = lazy(() => import("./pages/Home"));
const Cars = lazy(() => import("./pages/Cars"));
const Category = lazy(() => import("./pages/Category"));
const Comparison = lazy(() => import("./pages/Comparison"))
const EmiCalculator = lazy(() => import('./pages/EmiCalculator'))
const UserLogin = lazy(() => import('./pages/UserLogin'))
const GetDetils = lazy(() => import('./pages/GetDetils'))
const ComparisonDetails = lazy(() => import('./pages/ComparisonDetails'))
// const AdminDashboard=lazy(()=>import('./admin/pages/AdminDashboard'))
const Addcar = lazy(() => import('./admin/pages/Addcar'))
const ShowCars = lazy(() => import('./admin/pages/ShowCars'))
const AddBrands = lazy(() => import('./admin/pages/AddBrands'))
const AddCategories = lazy(() => import('./admin/pages/AddCategories'))
const AddAdmin = lazy(() => import("./admin/pages/AddAdmin"))
const AdminLogin = lazy(() => import("./admin/pages/AdminLogin"))


const carRoute = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRouteUser><Navbar /></ProtectedRouteUser>,
    // element: <Navbar />,
    children: [
      { index: true, element: <Home /> },
      { path: "cars", element: <Cars /> },
      { path: "cars/:carID", element: <GetDetils /> },
      { path: "category", element: <Category /> },
      { path: "Comparison", element: <Comparison /> },
      { path: "Comparison/:carID1?/:carID2", element: <ComparisonDetails /> },
      { path: "calculator", element: <EmiCalculator /> },
      { path: "userlogin", element: <UserLogin /> },
      { path: "*", element: <Error /> },

    ]
  },
  { path: "/AdminLogin", element: <AdminLogin /> },
  {
    path: "/admin/",
    element: <ProtectedRoute> <AdminNavbar /></ProtectedRoute>,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "addcar", element: <Addcar /> },
      { path: "showcars", element: <ShowCars /> },
      { path: "AddBrand", element: <AddBrands /> },
      { path: "AddCategories", element: <AddCategories /> },
      { path: "AddAdmin", element: <AddAdmin /> },
      { path: "*", element: <Error /> },
    ]
  }
]);


function App() {

  return (

    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <RouterProvider router={carRoute} />
      </Suspense>
    </Provider>
  )
}

export default App
