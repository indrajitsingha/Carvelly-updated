
import { ArrowRightLeft, CarFront, Ribbon, TicketPercent } from 'lucide-react'

const FooterDetails = () => {
  return (
    <div className=" sm:h-[200px] h-auto  flex flex-col py-2 sm:flex-row justify-center items-center sm:gap-[100px] gap-5 ">
    <div className=" shadow-md sm:shadow-none hover:shadow-lg transition delay-150 duration-300 ease-in-out  rounded-md sm:w-[15%] w-[80%] h-[150px] gap-3  flex justify-center items-center">
      <Ribbon size={"50px"} className=' text-violet-500' />
      <div className=" flex gap-2 flex-col justify-start items-start">
        <div className=" font-bold text-2xl">India’s #1</div>
        <div className="  text-sm font-semibold"> Largest Auto portal</div>

      </div>

    </div>
    <div className="shadow-md sm:shadow-none hover:shadow-lg transition delay-150 duration-300 ease-in-out rounded-md sm:w-[15%] w-[80%] h-[150px] gap-3  flex justify-center items-center">
      <CarFront size={"50px"} className='text-green-500' />
      <div className=" flex gap-2 flex-col justify-start items-start">
        <div className=" font-bold text-2xl">Car Sold</div>
        <div className="  text-sm font-semibold">Every 4 minute</div>

      </div>

    </div>
    <div className="shadow-md sm:shadow-none hover:shadow-lg transition delay-150 duration-300 ease-in-out  rounded-md sm:w-[15%] w-[80%] h-[150px] gap-3  flex justify-center items-center">
      <TicketPercent size={"50px"} className=' text-emerald-700' />
      <div className=" flex gap-2 flex-col justify-start items-start">
        <div className=" font-bold text-2xl">Offers</div>
        <div className="  text-sm font-semibold"> Stay updated pay less</div>

      </div>

    </div>
    <div className=" shadow-md sm:shadow-none hover:shadow-lg transition delay-150 duration-300 ease-in-out rounded-md sm:w-[15%] w-[80%] h-[150px] gap-3  flex justify-center items-center">
      <ArrowRightLeft size={"50px"} className='text-[crimson]' />
      <div className=" flex gap-2 flex-col justify-start items-start">
        <div className=" font-bold text-2xl">Compare</div>
        <div className="  text-sm font-semibold"> Decode the right car</div>

      </div>

    </div>
  </div>
  )
}

export default FooterDetails