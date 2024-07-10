import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Latest from '../components/Latest'

// requires a loader
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import ScrollToTop from "react-scroll-to-top";
import { useDispatch, useSelector } from 'react-redux';
import { relatedProducts } from '@/Redux/Slice/DataSlice';

const ComparisonDetails = () => {
  const { carID1, carID2 } = useParams()
  console.warn(carID1, carID2)
  const { Cardetails, status, Realated } = useSelector((state) => state.CarData);
  const Dispatch = useDispatch()
  const [Findadata, setFindadata] = useState()
  const [Findadata2, setFindadata2] = useState()
  console.log(Findadata, Findadata2);
  useEffect(() => {
    window.scroll(0, 0)

    if (Cardetails) {
      setFindadata(Cardetails.find((x) => x.id === carID1))
      setFindadata2(Cardetails.find((x) => x.id === carID2))
      Dispatch(relatedProducts(Findadata?.BodyType))

    }
  }, [carID1, carID2, Findadata, Findadata2, status])


  return (
    <div className=' overflow-hidden'>

      <section className="text-white body-font bg-[#151515] body-font " >
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium ">{Findadata?.Name} vs {Findadata2?.Name}
            </h1>
            <p className="mb-8 leading-relaxed"><span className=' font-semibold text-xl'>{Findadata?.Name} </span>: {Findadata?.Description}</p>
            <p className="mb-8 leading-relaxed"><span className=' font-semibold text-xl'>{Findadata2?.Name} </span>: {Findadata2?.Description}</p>

            <div className="flex justify-center">
              <button className="inline-flex text-white bg-green-400 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">See More</button>
              <button className="ml-4 inline-flex text-gray-700 bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg">See Realated Cars</button>
            </div>
          </div>

          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            {/* <img className="object-cover object-center rounded" alt="hero" src={imageurl}/> */}
            <Carousel autoPlay infiniteLoop   >
              {
                Findadata?.carImages && [...Findadata?.carImages, ...Findadata2?.carImages]?.map((img) => (
                  <div key={img}>
                    <img src={img} />
                    <p className="legend">{Findadata?.Name} vs{Findadata2?.Name}</p>
                  </div>
                ))
              }
            </Carousel>
          </div>

        </div>

      </section>

      <section className="text-gray-700 body-font w-[100%] flex justify-center items-center mt-10">
        <div className="container  w-[100%] flex justify-center items-center flex-col">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xs text-green-500 tracking-widest font-medium title-font mb-1">Highlight Specification of cars</h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Highlight Specification of <span className="bg-themecolor px-2 text-white text-center rounded-md ">{Findadata?.Name}</span></h1>
          </div>
          <div className="w-[100%] flex justify-center items-center flex-wrap  ">
            <div className="w-[50%] sm:w-1/6 p-2 ">
              <div className="flex rounded-lg h-[28vh] bg-gray-100 p-8 flex-col">
                <div className="flex flex-col justify-center items-center mb-3">
                  <div className="w-11 h-11 mr-3 inline-flex items-center justify-center text-white flex-shrink-0">

                    <img src="https://www.svgrepo.com/show/237125/engine-motor.svg" alt="" />
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">Engine</h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-center text-xl font-bold">{Findadata?.Power}</p>

                </div>
              </div>
            </div>
            <div className="w-[50%] sm:w-1/6 p-2">
              <div className="flex rounded-lg h-[28vh] bg-gray-100 p-8 flex-col">
                <div className="flex flex-col justify-center items-center mb-3">
                  <div className="w-8 h-8 mr-1 inline-flex items-center justify-center text-white flex-shrink-0">
                    <svg fill="#d72323" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#d72323"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>battery-black</title> <path d="M14.389 1c-0.89 0-3.223 0.747-3.223 1.67v1.67h-3.193c-1.78 0-3.223 1.493-3.223 3.34v19.981c0 1.847 1.442 3.34 3.223 3.34h16.055c1.78 0 3.223-1.493 3.223-3.34v-19.98c0-1.847-1.442-3.34-3.223-3.34h-3.193v-1.67c0-0.923-2.333-1.67-3.223-1.67l-3.224-0.001zM16 7.68v8.32h6.416l-6.416 11.66v-8.32h-6.416l6.416-11.66z"></path> </g></svg>
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">BHP</h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-center text-xl font-bold">86.63 - 101.64 Bhp</p>

                </div>
              </div>
            </div>
            <div className="w-[50%] sm:w-1/6 p-2">
              <div className="flex rounded-lg h-[28vh] bg-gray-100 p-8 flex-col">
                <div className="flex flex-col justify-center items-center mb-4">
                  <div className="w-11 h-11 mr-3 inline-flex items-center justify-center  text-white flex-shrink-0">
                    <img src="https://www.svgrepo.com/show/336441/baby-car-seat.svg" alt="" />
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">Seating Capacity</h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-center text-xl font-bold">{Findadata?.SeatingCapacity}</p>

                </div>
              </div>
            </div>
            <div className="w-[50%] sm:w-1/6 p-2">
              <div className="flex rounded-lg h-[28vh] bg-gray-100 p-8 flex-col">
                <div className="flex flex-col justify-center items-center mb-3">
                  <div className="w-14 h-14 mr-1 inline-flex items-center justify-center  text-white flex-shrink-0">
                    <img src="https://www.svgrepo.com/show/493482/drive.svg" alt="" />
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">Drive Type</h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-center text-xl font-bold">2WD / AWD</p>

                </div>
              </div>
            </div>
            <div className="w-[90%] sm:w-1/6 p-2">
              <div className="flex rounded-lg h-[28vh] bg-gray-100 p-8 flex-col">
                <div className="flex flex-col justify-center items-center mb-3">
                  <div className="w-10 h-10 mr-2 inline-flex items-center justify-center  text-white flex-shrink-0">
                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#f92f2f" className="bi bi-speedometer2" stroke="#f92f2f"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z"></path> <path fillRule="evenodd" d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z"></path> </g></svg>
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">Mileage</h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-center text-xl font-bold">{Findadata?.DrivingRange} kmpl</p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-gray-700 body-font w-[100%] flex justify-center items-center mt-10">
        <div className="container  w-[100%] flex justify-center items-center flex-col">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xs text-green-500 tracking-widest font-medium title-font mb-1">Highlight Specification of cars</h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Highlight Specification of <span className="bg-themecolor px-2 text-white text-center rounded-md ">{Findadata2?.Name}</span></h1>
          </div>
          <div className="w-[100%] flex justify-center items-center flex-wrap  ">
            <div className="w-[50%] sm:w-1/6 p-2 ">
              <div className="flex rounded-lg h-[28vh] bg-gray-100 p-8 flex-col">
                <div className="flex flex-col justify-center items-center mb-3">
                  <div className="w-11 h-11 mr-3 inline-flex items-center justify-center text-white flex-shrink-0">

                    <img src="https://www.svgrepo.com/show/237125/engine-motor.svg" alt="" />
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">Engine</h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-center text-xl font-bold">{Findadata2?.Power}</p>

                </div>
              </div>
            </div>
            <div className="w-[50%] sm:w-1/6 p-2">
              <div className="flex rounded-lg h-[28vh] bg-gray-100 p-8 flex-col">
                <div className="flex flex-col justify-center items-center mb-3">
                  <div className="w-8 h-8 mr-1 inline-flex items-center justify-center text-white flex-shrink-0">
                    <svg fill="#d72323" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#d72323"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>battery-black</title> <path d="M14.389 1c-0.89 0-3.223 0.747-3.223 1.67v1.67h-3.193c-1.78 0-3.223 1.493-3.223 3.34v19.981c0 1.847 1.442 3.34 3.223 3.34h16.055c1.78 0 3.223-1.493 3.223-3.34v-19.98c0-1.847-1.442-3.34-3.223-3.34h-3.193v-1.67c0-0.923-2.333-1.67-3.223-1.67l-3.224-0.001zM16 7.68v8.32h6.416l-6.416 11.66v-8.32h-6.416l6.416-11.66z"></path> </g></svg>
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">BHP</h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-center text-xl font-bold">86.63 - 101.64 Bhp</p>

                </div>
              </div>
            </div>
            <div className="w-[50%] sm:w-1/6 p-2">
              <div className="flex rounded-lg h-[28vh] bg-gray-100 p-8 flex-col">
                <div className="flex flex-col justify-center items-center mb-4">
                  <div className="w-11 h-11 mr-3 inline-flex items-center justify-center  text-white flex-shrink-0">
                    <img src="https://www.svgrepo.com/show/336441/baby-car-seat.svg" alt="" />
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">Seating Capacity</h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-center text-xl font-bold">{Findadata2?.SeatingCapacity}</p>

                </div>
              </div>
            </div>
            <div className="w-[50%] sm:w-1/6 p-2">
              <div className="flex rounded-lg h-[28vh] bg-gray-100 p-8 flex-col">
                <div className="flex flex-col justify-center items-center mb-3">
                  <div className="w-14 h-14 mr-1 inline-flex items-center justify-center  text-white flex-shrink-0">
                    <img src="https://www.svgrepo.com/show/493482/drive.svg" alt="" />
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">Drive Type</h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-center text-xl font-bold">2WD / AWD</p>

                </div>
              </div>
            </div>
            <div className="w-[90%] sm:w-1/6 p-2">
              <div className="flex rounded-lg h-[28vh] bg-gray-100 p-8 flex-col">
                <div className="flex flex-col justify-center items-center mb-3">
                  <div className="w-10 h-10 mr-2 inline-flex items-center justify-center  text-white flex-shrink-0">
                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#f92f2f" className="bi bi-speedometer2" stroke="#f92f2f"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z"></path> <path fillRule="evenodd" d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z"></path> </g></svg>
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">Mileage</h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-center text-xl font-bold">{Findadata2?.DrivingRange} kmpl</p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container px-5 py-5 mx-auto mt-10">
        <div className="flex flex-col text-center w-full mb-20">
          <h2 className="text-xl text-green-500 tracking-widest font-medium title-font mb-1">Specification of Cars</h2>
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Specification of {Findadata?.Name} <span className="bg-themecolor px-2 text-white text-center rounded-md ">VS</span> {Findadata2?.Name} </h1>
        </div>
      </div>
      <div className="flex sm:text-xl text-sm w-[100%] flex-wrap  font-semibold  mb-5 justify-center flex-row items-center border-separate border-spacing-2 ">
        <div className=" sm:w-[70%] bg-white compare  w-[100%]  flex justify-around items-center flex-wrap m-2">
          <div className=" sm:w-[40%] ">
            <table className='sm:w-[100%]'>
              <tbody>
                <tr className='border-b border-gray-300   ' >
                  <td className='sm:p-5 p-4 font-bold '>Car Name</td>
                  <td className=' font-bold pr-3 text-center text-lg'>{Findadata?.Name}</td>
                  <td className=' font-bold pr-2 text-center sm:hidden block text-lg '>{Findadata2?.Name}</td>
                </tr>
                <tr className='sm:border-b border-gray-300    ' >
                  <td className='sm:p-5 p-4 font-bold'>BatteryCapacity</td>
                  <td className='text-center'>{Findadata?.BatteryCapacity}</td>
                  <td className='text-center sm:hidden block'>{Findadata2?.BatteryCapacity}</td>
                </tr> <tr className='sm:border-b sm:border-gray-300 ' >
                  <td className='sm:p-5 p-4 font-bold'>BodyType</td>
                  <td className='text-center'>{Findadata?.BodyType}</td>
                  <td className='text-center sm:hidden block'>{Findadata2?.BodyType}</td>
                </tr> <tr className='sm:border-b sm:border-gray-300 ' >
                  <td className='sm:p-5 p-4 font-bold'>DrivingRange</td>
                  <td className='text-center'>{Findadata?.DrivingRange}</td>
                  <td className='text-center sm:hidden block'>{Findadata2?.DrivingRange}</td>
                </tr> <tr className='sm:border-b sm:border-gray-300 ' >
                  <td className='sm:p-5 p-4 font-bold'>MaxPower</td>
                  <td className='text-center'>{Findadata?.MaxPower}</td>
                  <td className='text-center sm:hidden block'>{Findadata2?.MaxPower}</td>
                </tr>
                <tr className='sm:border-b sm:border-gray-300 ' >
                  <td className='sm:p-5 p-4 font-bold'>Power</td>
                  <td className='text-center'>{Findadata?.Power}</td>
                  <td className='text-center sm:hidden block'>{Findadata2?.Power}</td>
                </tr>
                <tr className='sm:border-b sm:border-gray-300 ' >
                  <td className='sm:p-5 p-4 font-bold'>Price</td>
                  <td className='text-center'>{Findadata?.Price}</td>
                  <td className='text-center sm:hidden block'>{Findadata2?.Price}</td>
                </tr> <tr className='sm:border-b sm:border-gray-300 ' >
                  <td className='sm:p-5 p-4 font-bold '>Seating Capacity</td>
                  <td className='text-center'>{Findadata?.SeatingCapacity}</td>
                  <td className='text-center sm:hidden block'>{Findadata2?.SeatingCapacity}</td>
                </tr> <tr className='sm:border-b sm:border-gray-300 ' >
                  <td className='sm:p-5 p-4 font-bold'>Transmission</td>
                  <td className='text-center'>{Findadata?.Transmission}</td>
                  <td className='text-center sm:hidden block'>{Findadata2?.Transmission}</td>
                </tr> <tr className='sm:border-b sm:border-gray-300 ' >
                  <td className='sm:p-5 p-4 font-bold'>MaxTorque</td>
                  <td className='text-center'>{Findadata?.MaxTorque}</td>
                  <td className='text-center sm:hidden block'>{Findadata2?.MaxTorque}</td>
                </tr>


              </tbody>
            </table>
          </div>

          <div className=" sm:w-[40%]  sm:block hidden ">
            <table className='sm:w-[100%]'>
              <tbody>
                <tr className='border-b border-gray-300   ' >
                  <td className='sm:p-5 p-4 font-bold'>Car Name</td>
                  <td className=' font-bold pr-3 text-lg'>{Findadata2?.Name}</td>
                </tr>
                <tr className='sm:border-b sm:border-gray-300 ' >
                  <td className='sm:p-5 p-4 font-bold'>BatteryCapacity</td>
                  <td>{Findadata2?.BatteryCapacity}</td>
                </tr> <tr className='sm:border-b sm:border-gray-300 ' >
                  <td className='sm:p-5 p-4 font-bold'>BodyType</td>
                  <td>{Findadata2?.BodyType}</td>
                </tr> <tr className='sm:border-b sm:border-gray-300 ' >
                  <td className='sm:p-5 p-4 font-bold'>DrivingRange</td>
                  <td>{Findadata2?.DrivingRange}</td>
                </tr> <tr className='sm:border-b sm:border-gray-300 ' >
                  <td className='sm:p-5 p-4 font-bold'>MaxPower</td>
                  <td>{Findadata2?.MaxPower}</td>
                </tr>
                <tr className='sm:border-b sm:border-gray-300 ' >
                  <td className='sm:p-5 p-4 font-bold'>Power</td>
                  <td>{Findadata2?.Power}</td>
                </tr>
                <tr className='sm:border-b sm:border-gray-300 ' >
                  <td className='sm:p-5 p-4 font-bold'>Price</td>
                  <td>{Findadata2?.Price}</td>
                </tr> <tr className='sm:border-b sm:border-gray-300 ' >
                  <td className='sm:p-5 p-4 font-bold'>Seating Capacity</td>
                  <td>{Findadata2?.SeatingCapacity}</td>
                </tr> <tr className='sm:border-b sm:border-gray-300 ' >
                  <td className='sm:p-5 p-4 font-bold'>Transmission</td>
                  <td>{Findadata2?.Transmission}</td>
                </tr> <tr className='sm:border-b sm:border-gray-300 ' >
                  <td className='sm:p-5 p-4 font-bold'>MaxTorque</td>
                  <td>{Findadata2?.MaxTorque}</td>
                </tr>


              </tbody>
            </table>
          </div>

        </div>
      </div>

      <section className="text-gray-700 body-font  w-[100%] mt-10">
        <div className="container  py-24  w-[100%]">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Realted <span className="bg-themecolor px-2 text-white text-center rounded-md ">{Findadata?.BodyType}</span> Cars</h1>
          </div>


          <div className=" flex justify-center items-start flex-col sm:flex-row  mt-3 ml-3  ">


            {Realated?.map((car, index) => <Latest car={car} key={car?.id} />)}



          </div>

        </div>
      </section>

      <ScrollToTop smooth="true" color="white" style={{ backgroundColor: "crimson", padding: "5px" }} />

    </div>
  )
}

export default ComparisonDetails