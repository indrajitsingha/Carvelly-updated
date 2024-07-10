import { GetSearchData } from "@/Redux/Slice/DataSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const CategoryCard = ({ category }) => {
  const Dispatch = useDispatch()
  const Navigate = useNavigate()
  const NavigateCategory = () => {
    Navigate("/cars")
    Dispatch(GetSearchData({ Category: category?.CategoryName }))
  }
  return (
    <div className="mt-6 h-65 sm:w-[28%] w-[90%] mx-5 relative " onClick={NavigateCategory}>
      <div className="h-[100%] w-[100%] relative rounded-lg ">
        <img src={category?.CategoryLogo} alt="" className=' rounded-lg   h-64 w-[100%]' />
      </div>
      <article className=" absolute top-0 h-64 w-[100%]   group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl  transition duration-300 ease-in-out " >
        <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:opacity-75 transition duration-300 ease-in-out"></div>
        <div className="relative w-[100%]  h-64  px-4 sm:px-6 lg:px-4 flex justify-center items-center">
          <h3 className="text-center">
            <div className="text-white text-2xl font-bold text-center" >
              <span className="absolute inset-0"></span>
              Top 10 {category?.CategoryName}  cars 2023
            </div>
          </h3>
        </div>
      </article>
    </div>
  )
}

export default CategoryCard