import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { relatedProducts } from '../Redux/Slice/DataSlice';

import Latest from '../components/Latest'
import PostComments from '../components/PostComments'
import Comments from '../components/Comments'

// requires a loader
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import ScrollToTop from "react-scroll-to-top";
// import '../assets/css/Comment.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import supabase from '../supabase/supabase';





const GetDetils = () => {
  const [Comment, setComment] = useState([])

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from("Comments")
        .select('*')
        .order('created_at', { ascending: false });
      if (data?.length > 0) {
        console.warn(data);
        setComment(data)
      }
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return { error };
    }
  };
  const { status, Cardetails, Realated } = useSelector((state) => state.CarData);
  const Dispatch = useDispatch()
  const { carID } = useParams()
  const [Findadata, setFinddata] = useState({})
  useEffect(() => {
    window.scroll(0, 0)
    if (Cardetails) {
      setFinddata(Cardetails.find((x) => x.id === carID))
      Dispatch(relatedProducts(Findadata?.BodyType))
      fetchComments()
    }
  }, [carID, Findadata, status])

  const { user } = useSelector((data) => data.Auth)

  return (
    <div className=' overflow-hidden  '>
      <ToastContainer />
      <section className="text-white body-font bg-[#151515] ">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium ">{Findadata?.Name}

            </h1>
            <p className="mb-8 leading-relaxed">{Findadata?.Description}</p>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-green-400 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">See More</button>
              <button className="ml-4 inline-flex  bg-themecolor border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg">See Realated Cars</button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-[full] md:w-1/2 w-5/6">
            {/* <img className="object-cover object-center rounded" alt="hero" src={imageurl}/> */}
            <Carousel autoPlay infiniteLoop   >
              {
                Findadata?.carImages?.map((img) => (
                  <div key={img}>
                    <img src={img} />
                    <p className="legend">{Findadata?.Name}</p>
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
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Highlight Specification of {Findadata?.Name}</h1>
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
                  <p className="leading-relaxed text-center text-xl font-bold">{Findadata?.BatteryCapacity}</p>

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
            <div className="w-[50%] sm:w-1/6 p-2">
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
      <div className="container px-2 lg:px-5 py-5 lg:mx-auto mt-10">
        <div className="flex flex-col text-center w-full mb-20">
          <h2 className="text-xs text-green-500 tracking-widest font-medium title-font mb-1">Specification of Cars</h2>
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Specification of {Findadata?.Name}</h1>
        </div>
      </div>
      <div className="flex sm:text-xl text-lg  w-[100%] flex-wrap  font-semibold  mb-5 justify-center flex-row items-center sm:border-separate  sm:border-spacing-2 ">
        <div className=" sm:w-[70%] bg-white compare  w-[90%]  flex justify-around items-center flex-wrap ">
          <div className=" sm:w-[40%] w-[100%] ">
            <table className='sm:w-[100%]'>
              <tbody>
                <tr className='border-b border-gray-300   ' >
                  <td className='sm:p-5 p-4 '>Name</td>
                  <td className=' font-bold'>{Findadata?.Name}</td>
                </tr>
                <tr className='sm:border-b sm:border-gray-300 ' >
                  <td className='sm:p-5 p-4'>BatteryCapacity</td>
                  <td>{Findadata?.BatteryCapacity}</td>
                </tr> <tr className='sm:border-b sm:border-gray-300 ' >
                  <td className='sm:p-5 p-4'>BodyType</td>
                  <td>{Findadata?.BodyType}</td>
                </tr> <tr className='sm:border-b sm:border-gray-300 ' >
                  <td className='sm:p-5 p-4'>DrivingRange</td>
                  <td>{Findadata?.DrivingRange}</td>
                </tr> <tr className='sm:border-b sm:border-gray-300 ' >
                  <td className='sm:p-5 p-4'>MaxPower</td>
                  <td>{Findadata?.MaxPower}</td>
                </tr>


              </tbody>
            </table>
          </div>

          <div className=" sm:w-[40%]  w-[100%]">
            <table className='sm:w-[100%]'>
              <tbody>
                <tr className='sm:border-b sm:border-gray-300 ' >
                  <td className='sm:p-5 p-4 '>Power</td>
                  <td>{Findadata?.Power}</td>
                </tr>
                <tr className='sm:border-b sm:border-gray-300 ' >
                  <td className='sm:p-5 p-4'>Price</td>
                  <td>{Findadata?.Price}</td>
                </tr> <tr className='sm:border-b sm:border-gray-300 ' >
                  <td className='sm:p-5 p-4'>Seating Capacity</td>
                  <td>{Findadata?.SeatingCapacity}</td>
                </tr> <tr className='sm:border-b sm:border-gray-300 ' >
                  <td className='sm:p-5 p-4'>Transmission</td>
                  <td>{Findadata?.Transmission}</td>
                </tr> <tr className='sm:border-b sm:border-gray-300 ' >
                  <td className='sm:p-5 p-4'>MaxTorque</td>
                  <td>{Findadata?.MaxTorque}</td>
                </tr>

              </tbody>
            </table>
          </div>

        </div>


      </div>
      <section className="text-gray-700 body-font  w-[100%] mt-10">
        <div className="container  py-24  w-[100%]">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Realted {Findadata?.BodyType} Cars</h1>
          </div>
          <div className=" flex justify-center items-start flex-col sm:flex-row  mt-3 ml-3  ">
            {Realated?.map((car, index) => <Latest car={car} key={car?.id} />)}
          </div>
          <div className="flex flex-col text-center w-full mb-20 mt-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Comments of {Findadata?.Name}</h1>
          </div>

          {/* comments section */}
          <div className=" min-h-[50vh] w-[100%] flex justify-center items-start flex-col sm:flex-row  mt-7 ml-3  ">
            <div className=" sm:w-[85%] w-[100%] min-h-[50vh]   flex justify-center items-start flex-col  ">
              <PostComments refresh={fetchComments} CarId={carID} />
              {
                Comment?.filter((val) => val.carid === carID).map((comment) => <Comments x={comment} user={user?.user?.email} key={comment.id} refresh={fetchComments} />)
              }
            </div>
          </div>
        </div>
      </section>
      <ScrollToTop smooth="true" color="white" style={{ backgroundColor: "crimson", padding: "5px" }} />
    </div>


  )
}

export default GetDetils