import { Link } from "react-router-dom";

const CarProduct = ({ car }) => {
  return (
    <Link to={`/cars/${car.id}`}>
      <div className="sm:h-[35vh] h-auto overflow-hidden  rounded-lg bg-white backdrop-blur-sm shadow-lg sm:w-[100%] w-[100%] mt-5 flex justify-between sm:flex-row flex-col items-center">
        <div className="sm:w-[40%] w-[100%]  sm:h-[100%] h-[100%] ">
          <img
            src={car?.carImages[0]}
            className="aspect-video sm:w-[100%] w-[100%] h-[100%] object-cover   "
            alt=""
          />
        </div>
        <div className="p-4 h-[100%] sm:w-[60%] w-[100%] ">
          {/* <p className="mb-1 text-sm text-primary-500">Andrea Felsted • <time>18 Nov 2022</time></p> */}
          <h3 className="text-xl font-medium text-gray-900"> {car?.Name}</h3>
          <h3 className="text-xl font-medium text-gray-900">Price : {car?.Price}</h3>
          <p className="mt-1 text-gray-500 sm:block hidden ">{car?.Description?.slice(0, 80) + "......."}</p>
          <h4 className="sm:text-l font-sm text-gray-900 ">Transmission : {car?.Transmission}</h4>
          <h4 className="sm:text-l font-sm  text-gray-900 ">Power : {car?.DrivingRange}</h4>
          <h4 className="sm:text-l font-medium text-gray-900  sm:block hidden">SeatingCapacity : {car?.SeatingCapacity}</h4>
          <div className="mt-1 flex gap-2">
            <span
              className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
            >
              {car?.BodyType}
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600"
            >
              {car?.Brand}
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600"
            >
              See More
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CarProduct