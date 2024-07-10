import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { usePrevNextButtons } from './EmblaCarouselArrowButtons'
import style from "./css/Carousel.module.css"
import BrandAll from "../BrandAll";
import {useSelectedSnapDisplay} from './EmblaCarouselSelectedSnapDisplay'
const BrnadCarousel = ({OPTIONS}) => {
    const { Brands } = useSelector((state) => state.CarData);
    const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [Autoplay()])

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)
    const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi)


    return (
        <div className=" w-[100%] flex justify-center items-center gap-2 flex-col sm:flex-row p-5  mt-10 mb-10">
            <div className={style.embla} >
                <div className={style.embla} ref={emblaRef}>
                    <div className={style.embla__container}>
                        {
                            Brands?.map((Brand) => (
                                <div className={style.embla__slide} key={Brand?.id}>

                                    <BrandAll Brand={Brand} />
                                </div>))

                        }

                    </div>
                </div>


                <button onClick={onPrevButtonClick} disabled={prevBtnDisabled} className="absolute top-1/2 -translate-y-1/2 left-4 z-10 text-white bg-black rounded-full  hover:text-primary transition-colors">
                    <ChevronLeftIcon className="w-8 h-8" />
                    <span className="sr-only">Previous</span>
                </button>
                <button onClick={onNextButtonClick} disabled={nextBtnDisabled} className="absolute top-1/2 -translate-y-1/2 right-4 z-10 text-white bg-black rounded-full   hover:text-primary transition-colors">
                    <ChevronRightIcon className="w-8 h-8" />
                    <span className="sr-only">Next</span>
                </button>
           
            </div>
        </div >
    )
}

export default BrnadCarousel