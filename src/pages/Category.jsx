import { useSelector } from 'react-redux';
import CategoryCard from '../components/CategoryCard'
import Spinner from "@/components/Spinner";
import BrnadCarousel from '@/components/BrandSlider/BrnadCarousel';



const Category = () => {
  const {Categories, status } = useSelector((state) => state.CarData);


  return (
    <div className="w-[100%]">
      {
        status === "pending" ?
          <Spinner />
          :

          <div className="w-[100%]">
            <div className="w-[100%] flex justify-center items-center">
              <div className="w-[100%] flex justify-center items-center flex-wrap sm:flex-row flex-col ">
                {Categories.map((category) => <CategoryCard category={category} key={category?.id} />)}
              </div>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 text-center my-10 w-full">
                Popular Brands
              </h2>
            <BrnadCarousel  OPTIONS={{ axis: 'x', loop: true }} />
          </div>
      }
    </div>
  )
}

export default Category