import { Link, useNavigate } from 'react-router-dom'
import FooterDetails from './FooterDetails'

const Footer = () => {
  const navigate = useNavigate()
  return (
    <div>
      <FooterDetails />
      <footer className=" py-6 md:py-8 w-full text-white bg-black">
        <div className="container max-w-7xl py-2 flex flex-col items-center justify-between gap-4 md:flex-row">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <svg
              className="bg-white h-8 mr-2 w-8 "
              xmlns="http://www.w3.org/2000/svg"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="1.5"
              clipRule="evenodd"
              viewBox="0 0 716 895"
            >
              <path d="M357.776 0l357.77 178.885v536.657l-357.77 178.89L0 715.542V178.885"></path>
              <path
                className="text-white fill-current"
                d="M357.776 804.982l268.32-134.16v-178.89l-89.44-44.72 89.44-44.72V223.606L357.776 89.442v626.1l-178.89-89.44V178.885l-89.443 44.721v447.216l268.333 134.16z"
              ></path>
              <path d="M447.216 670.822l89.44-44.72v-89.45l-89.44-44.72v178.89zM447.216 402.492l89.44-44.721v-89.443l-89.44-44.722"></path>
            </svg>
            <span className="sr-only">Acme Inc</span>
          </Link>
          <nav className="flex flex-wrap items-center gap-4 text-sm">
            <Link href="#" className="hover:underline" prefetch={false}>
              Home
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              About
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Products
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Contact
            </Link>
            <Link to="/AdminLogin" className="hover:underline" >
              Admin
            </Link>
          </nav>
          <p className="text-xs ">&copy; 2024 Acme Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer