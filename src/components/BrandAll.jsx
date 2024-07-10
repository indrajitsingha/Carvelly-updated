import { useNavigate } from "react-router-dom"
import { Card } from "./ui/card"
import { useDispatch } from "react-redux"
import { GetSearchData } from "@/Redux/Slice/DataSlice"

const BrandAll = ({ Brand }) => {
  const Dispatch = useDispatch()

  const Navigate = useNavigate()
  const NavigateCategory = () => {
    Navigate("/cars")
    Dispatch(GetSearchData({ Brand: Brand?.BrandName }))
  }

  return (
    <Card className="w-full max-w-sm sm:p-6 p-1 bg-card text-card-foreground shadow-sm" onClick={NavigateCategory}>
      <div className="flex items-center justify-center">
        <img
          src={Brand?.BarndLogo}
          width="120"
          height="120"
          alt="Brand Logo"
          className="aspect-square object-contain"
        />
      </div>
    </Card>
  )
}

export default BrandAll



