import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { usePrevNextButtons } from './EmblaCarouselArrowButtons'
import "./css/Carousel.css"


const Carousel = () => {
    const { Cardetails } = useSelector((state) => state.CarData);
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    return (
        <div className="w-[100%]    mx-auto">
            <div className=" shadow-lg embla relative" ref={emblaRef}>
                <div className="embla__container bg-black">
                    {
                        Cardetails?.map((val, index) => (
                            <div className="embla__slide" key={val?.id} >
                                <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden ">
                                    <img
                                        loading="eager"
                                        src={val?.carImages && val?.carImages[0]}
                                        alt="Car Model 1"
                                        width={800}
                                        height={800}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 lg:p-10">
                                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">{val?.Name && val?.Name} <span className=" bg-themecolor rounded-full px-2">₹{val?.Price}</span></h3>
                                        <p className="text-base md:text-lg lg:text-xl text-white/80 mb-4">
                                            {val?.Description && val?.Description}
                                        </p>
                                        <Link to={`/cars/${val?.id}`} size="lg" className="w-full md:w-auto bg-main hover:bg-hover p-3 px-5 text-white rounded-md font-bold">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>)
                        )
                    }

                </div>


                <button onClick={onPrevButtonClick} disabled={prevBtnDisabled} className="absolute top-1/2 -translate-y-1/2 left-4 z-10 text-white  hover:text-primary transition-colors">
                    <ChevronLeftIcon className="w-8 h-8" />
                    <span className="sr-only">Previous</span>
                </button>
                <button onClick={onNextButtonClick} disabled={nextBtnDisabled} className="absolute top-1/2 -translate-y-1/2 right-4 z-10 text-white  hover:text-primary transition-colors">
                    <ChevronRightIcon className="w-8 h-8" />
                    <span className="sr-only">Next</span>
                </button>

            </div>
        </div >
    )
}

export default Carousel