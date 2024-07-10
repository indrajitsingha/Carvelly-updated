import "../assets/css/Homestyle.css";
// All components  import 
import CategoryCard from "../components/CategoryCard";
import Latest from "../components/Latest";
import Spinner from "../components/Spinner";
import { useSelector } from "react-redux";
import BrnadCarousel from "@/components/BrandSlider/BrnadCarousel";
import Carousel from "../components/CarouselSlider/Carousel";

const Home = () => {
  const { latestCar, Categories, status } = useSelector((state) => state.CarData);

  return (
    <>
      {status === "pending" ?
        <Spinner />
        : (
          <div className="w-[100%]">
            <div className="w-[100%]">
              {/* search bar component */}
              {/* <CarouselSlider /> */}
              <Carousel />
              <h2 className="text-2xl font-extrabold text-gray-900 text-center p-5 w-full mt-5 ">
                Categories of Cars
              </h2>
              {/* Categories component  calling  categories Data form Redux  */}
              <div className="w-[100%] flex justify-center items-center">
                <div className="w-[100%] flex justify-center items-center flex-wrap sm:flex-row flex-col">
                  {Categories.map((category, index) => index < 3 ? <CategoryCard category={category} key={category?.id} /> : "")}
                </div>
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 text-center p-5 w-full">
                Latest Cars
              </h2>
              {/* Leatest car component calling  latestCar Data form Redux  */}
              <div className=" flex justify-center items-start flex-col sm:flex-row  mt-3 ml-3  ">
                {latestCar.map((car, index) => index < 4 ? <Latest car={car} key={car?.id} /> : "")}
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 text-center pt-5 w-full">
                Popular Brands
              </h2>
              <BrnadCarousel OPTIONS={{ axis: 'x', loop: true }} />
            </div>
          </div>)}
    </>
  );
};

export default Home;
