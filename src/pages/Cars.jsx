import { useState } from "react";
import CarProduct from "../components/CarProduct";
import Spinner from "../components/Spinner";
import ScrollToTop from "react-scroll-to-top";
import SearchHeader from "@/components/SearchHeader";
import { PaginationOne } from "@/admin/components/Pagination";
import useFetchData from "@/hooks/useFetchData";
import { useSelector } from "react-redux";
import BrnadCarousel from "@/components/BrandSlider/BrnadCarousel";


const Cars = () => {
  const { status, searchReasult } = useSelector((state) => state.CarData);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { Data: currentCars, getDataMutation } = useFetchData({ tableName: "CarDetails", page: currentPage, setTotalPages: setTotalPages })
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <div className="w-[100%]">
        {status === "pending" ?
          <Spinner />
          : (
            <div className="w-[100%]">
              <SearchHeader />
              <div className=" grid grid-cols-1 mx-5  ">
                {
                  searchReasult.length > 0 ? searchReasult?.map((car) => <CarProduct car={car} key={car?.id} />)
                    :
                    currentCars?.map((car) => <CarProduct car={car} key={car?.id} />)
                }
              </div>
              <div className="mt-6 flex justify-center my-5">
                <PaginationOne
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>

              <h2 className="text-2xl font-extrabold text-gray-900 text-center pt-5 w-full">
                Popular Brands
              </h2>
              <BrnadCarousel OPTIONS={{ axis: 'x', loop: true }} />
              <ScrollToTop
                smooth="true"
                color="white"
                style={{ backgroundColor: "crimson", padding: "5px" }}
              />
            </div>
          )}
      </div>
    </>
  );
};

export default Cars;
