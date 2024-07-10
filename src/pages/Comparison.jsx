import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ComparisonSearch from "../components/ComparisonSearch";
import { comparisonSearchData } from "../Redux/Slice/DataSlice";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import CompareCard from "@/components/CompareCard";

const Comparison = () => {
  const { compareData1, compareData2, status } = useSelector((state) => state.CarData);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(comparisonSearchData({ searchData1: "Porsche Taycan", searchData2: "BMW X7" }))
  }, [status])


  return (
    <div className="w-full  mx-auto py-12 px-4 md:px-6">
      {status === "pending" ?
        <Spinner />
        : (<>
          <ComparisonSearch />
          <Link to={`/Comparison/${compareData1?.id}/${compareData2?.id}`} className=" w-[100%] flex flex-col sm:flex-row ">
            <div className="w-[100%] flex flex-col sm:flex-row  mt-12">
              <CompareCard compareData={compareData1} />
              <div className=" sm:w-[10%] w-[100%]  flex flex-col justify-center items-center m-2 ">
                <div className="vs bg-red-500 shadow-lg shadow- shadow-red-600 text-white text-[30px] px-5 rounded-full">
                  vs
                </div>
              </div>
              <CompareCard compareData={compareData2} />
            </div>
          </Link>
        </>)}
    </div>
  )
};

export default Comparison;
