
import { Link } from "react-router-dom";


const Latest = ({ car}) => {
  console.log(car);


  return (<>


    <div className=" max-w-md overflow-hidden rounded-lg bg-black text-white shadow sm:w-[25%] mx-3 mt-2 ">
      <Link to={`/cars/${car?.id}`}>
        <img
          src={car?.carImages[0]}
          className="aspect-video w-full object-cover "
          alt=""
        />
        <div className="p-4">
          {/* <p className="mb-1 text-sm text-primary-500">Andrea Felsted • <time>18 Nov 2022</time></p> */}
          <h3 className="text-xl font-medium ">{car && car?.Name} </h3>
          <h3 className="text-xl font-medium ">Price : {car && car.Price} </h3>
          <p className="mt-1 ">{car && car?.Description?.slice(0, 80) + "......."}</p>
          <div className="mt-4 flex gap-2">
            <span
              className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
            >
              {car && car.BodyType}
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600"
            >
              {car && car.Brand}
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600"
            >
              See More
            </span>
          </div>
        </div>
      </Link>
    </div>

  </>
  );
};

export default Latest;
