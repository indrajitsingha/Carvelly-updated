import { GetSearchData } from '@/Redux/Slice/DataSlice';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const SearchHeader = () => {
  const Dispatch = useDispatch()
  const { register, reset, handleSubmit } = useForm({})

  const { Brands, Categories, status, Cardetails } = useSelector((state) => state.CarData);

  const Submit = (data) => {
    Dispatch(GetSearchData(data))
  }

  return (
    <section className=" h-[70vh] w-[100%]  carslider   ">
      <div className="flex h-full w-[100%] z-10 items-center justify-center container mx-auto px-8 ">
        <form onSubmit={handleSubmit(Submit)} className=" w-[100%] text-center">
          <h1 className="text-3xl sm:text-5xl capitalize tracking-widest text-white lg:text-4xl">Search Your Dream <span className=' bg-themecolor px-5 rounded-md font-bold '>CAR</span></h1>

          <div className="mt-8 flex justify-center items-center  w-[100%] ">
            <div className="mt-8 flex flex-col sm:gap-5 gap-3 space-y-3 sm:-mx-2  sm:justify-center sm:space-y-0  sm:w-[500px] w-[100%] ">
              <input id="email" name='carName' list="Cars" {...register("carName")} type="search" className="rounded-md border border-transparent bg-white/20 px-4 py-2 text-white placeholder-white backdrop-blur-sm focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40  " placeholder="Search Cars" />

              <datalist id="Cars">

                {
                  Cardetails && Cardetails.map((x) => {
                    return (
                      <option value={x.Name} key={x.Name}>{x.Name}</option>
                    )
                  })
                }

              </datalist>

              <div className=" w-[100%]  ">
                <select name='Category'{...register("Category")} className="rounded-md  w-[100%] border border-transparent bg-white/20 px-4 py-2 text-white placeholder-white backdrop-blur-sm focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ">
                  <option value="" className='p-1 bg-black'>Select Category</option>
                  {
                    Categories?.map((category) => <option key={category?.id} value={category?.CategoryName} className='bg-black  text-white'>{category?.CategoryName}</option>
                    )
                  }
                </select>
              </div>


              <div className=" w-[100%] ">
                <select name='Brand' {...register("Brand")} className="  w-[100%] rounded-md border border-transparent bg-white/20 px-4 py-2 text-white placeholder-white backdrop-blur-sm focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ">
                  <option value="" className='p-1 bg-black'>Select Brand</option>
                  {
                    Brands?.map((brand) => <option key={brand?.id} value={brand?.BrandName} className='bg-black  text-white'>{brand?.BrandName}</option>
                    )
                  }
                </select>
              </div>

              <button className=" transform rounded-md bg-main px-8 py-2 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-200 hover:bg-hover focus:bg-hover focus:outline-none sm:mx-2 mx-2" type='submit'>Search</button>
              <button className=" transform rounded-md bg-themecolor px-8 py-2 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-200  focus:outline-none sm:mx-2 mx-2" onClick={() => reset()}>Cnacel</button>

            </div>
          </div>
        </form>
      </div>


    </section>
  )
}

export default SearchHeader