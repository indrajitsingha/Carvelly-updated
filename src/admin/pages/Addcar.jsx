import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Car} from 'lucide-react';
import Headding from '../components/CustomComponents/Headding';
import useNormalFetchData from "@/hooks/useNormalFetchData"
import { useForm } from "react-hook-form"
import { BaseImgURL } from "@/constant/constantVariable"
import useAddMutation from "@/hooks/useAddMutation"
import useUploadIMG from "@/hooks/useUploadIMG"
import { useNavigate } from "react-router-dom"

const Addcar = () => {
  const Navigate = useNavigate()
  const { register, reset, handleSubmit, formState: { errors } } = useForm({})

  // custom hooks 
  const { Data: Brands } = useNormalFetchData({ tableName: "Brands" })
  const { Data: Categories } = useNormalFetchData({ tableName: "Categories" })
  const { AddMutation, isAddLoading } = useAddMutation({ tableName: "CarDetails" })
  const uploadImage = useUploadIMG({ bucketName: "carImages" });

  console.log(Brands, Categories);
  // custom hooks 

  const Submit = async (data) => {
    let imageUrl = []
    if (data.carImage1) {
      let Url = await uploadImage(data.carImage1[0]);
      if (Url) { imageUrl = [...imageUrl, BaseImgURL + Url] }
    }
    if (data.carImage2) {
      let Url = await uploadImage(data.carImage2[0]);
      if (Url) { imageUrl = [...imageUrl, BaseImgURL + Url] }
    }
    if (data.carImage3) {
      let Url = await uploadImage(data.carImage3[0]);
      if (Url) { imageUrl = [...imageUrl, BaseImgURL + Url] }
    }
    const payload = {
      Name: data.Name,
      DrivingRange: data.DrivingRange,
      Power: data.Power,
      Transmission: data.Transmission,
      BatteryCapacity: data.BatteryCapacity,
      SeatingCapacity: data.SeatingCapacity,
      MaxPower: data.MaxPower,
      MaxTorque: data.MaxTorque,
      BodyType: data.BodyType,
      Brand: data.Brand,
      Description: data.Description,
      Price: data.Price,
      carImages: imageUrl
    };
    await AddMutation(payload)
    reset()
    Navigate("/admin/showcars")
  }
  return (
    <Card className="w-full ">
      <Headding
        title="Add New Car "
        description="Add New Car Info Panel"
        Icon={Car}
        iconColor=" text-violet-500"
        bgColor=" text-violet-500/10"
      />
      <form className="grid gap-6 relative" onSubmit={handleSubmit(Submit)} >
        {isAddLoading ?
          <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
            <div className="flex items-center">
              <span className="text-2xl mr-4">Loading</span>
              <svg className="animate-spin h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
            </div>
          </div> : ""}
        <CardContent>
          <div className="grid gap-6"  >
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Car Name  <span className=" text-[12px] text-red-600">*</span></Label>
                <Input type="text" id="name" placeholder="Enter car name" {...register("Name", { required: true })} />
                {errors.Name && <span className=" text-[12px] text-red-600"> Car Name is Required</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="range">Driving Range<span className=" text-[12px] text-red-600">*</span></Label>
                <Input id="range" type="text" placeholder="Enter driving range" {...register("DrivingRange", { required: true })} />
                {errors.DrivingRange && <span className=" text-[12px] text-red-600"> DrivingRange is Required</span>}

              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="power">Power<span className=" text-[12px] text-red-600">*</span></Label>
                <Input id="power" type="text" placeholder="Enter power" {...register("Power", { required: true })} />
                {errors.Power && <span className=" text-[12px] text-red-600"> Power is Required</span>}

              </div>
              <div className="space-y-2">
                <Label htmlFor="transmission">Transmission<span className=" text-[12px] text-red-600">*</span></Label>
                <select {...register("Transmission", { required: true })}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                >

                  <option value="" className="relative  flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground ">Transmission Type</option>
                  <option className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground " value="Automatic">Automatic</option>
                  <option className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground " value="Manual">Manual</option>
                  <option className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground " value="CVT">CVT</option>

                </select>
                {errors.Transmission && <span className=" text-[12px] text-red-600"> Transmission is Required</span>}

              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="battery">Battery Capacity<span className=" text-[12px] text-red-600">*</span></Label>
                <Input id="battery" type="text" placeholder="Enter battery capacity" {...register("BatteryCapacity", { required: true })} />
                {errors.BatteryCapacity && <span className=" text-[12px] text-red-600"> Battery Capacity is Required</span>}

              </div>
              <div className="space-y-2">
                <Label htmlFor="seating">Seating Capacity<span className=" text-[12px] text-red-600">*</span></Label>
                <Input id="seating" type="number" placeholder="Enter seating capacity"  {...register("SeatingCapacity", { required: true })} />
                {errors.SeatingCapacity && <span className=" text-[12px] text-red-600"> Seating Capacity is Required</span>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="max-power">Max Power</Label>
                <Input id="max-power" type="text" placeholder="Enter max power" {...register("MaxPower")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-torque">Max Torque</Label>
                <Input id="max-torque" type="text" placeholder="Enter max torque"{...register("MaxTorque")} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category <span className=" text-[12px] text-red-600">*</span></Label>
                <select {...register("BodyType", { required: true })}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                >
                  <option value="" className="relative  flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground ">Select BodyType</option>
                  {
                    Categories?.map((category) => <option className="relative  flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground " key={category?.id} value={category?.CategoryName}>{category?.CategoryName}</option>)
                  }
                </select>
                {errors.BodyType && <span className=" text-[12px] text-red-600"> Body Type is Required</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Brand <span className=" text-[12px] text-red-600">*</span></Label>
                <select {...register("Brand", { required: true })}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                >
                  <option value="" className="relative  flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground ">Select Brand</option>
                  {
                    Brands?.map((Brand) => <option className="relative  flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground " key={Brand?.id} value={Brand?.BrandName}>{Brand?.BrandName}</option>)
                  }
                </select>
                {errors.Brand && <span className=" text-[12px] text-red-600"> Brand is Required</span>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Car Description<span className=" text-[12px] text-red-600">*</span></Label>
              <Textarea id="description" placeholder="Enter car description" {...register("Description", { required: true })} />
              {errors.Description && <span className=" text-[12px] text-red-600"> Description is Required</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price<span className=" text-[12px] text-red-600">*</span></Label>
              <Input id="price" type="number" placeholder="Enter price" {...register("Price", { required: true })} />
              {errors.Price && <span className=" text-[12px] text-red-600"> Price is Required</span>}
            </div>
            <div className="space-y-2">
              <Label>Images</Label>
              <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
                <div className="flex flex-col items-center justify-center border rounded-md p-4 h-32 cursor-pointer">
                  <span className="text-sm text-muted-foreground" >Upload Image<span className=" text-[12px] text-red-600">*</span></span>
                  <input type="file" {...register("carImage1", { required: true })} />
                  {errors.carImage1 && <span className=" text-[12px] text-red-600"> Atleast one image is Required</span>}
                </div>
                <div className="flex flex-col items-center justify-center border rounded-md p-4 h-32 cursor-pointer">
                  <span className="text-sm text-muted-foreground" >Upload Image </span>
                  <input type="file" {...register("carImage2")} />
                </div>
                <div className="flex flex-col items-center justify-center border rounded-md p-4 h-32 cursor-pointer">
                  <span className="text-sm text-muted-foreground" >Upload Image </span>
                  <input type="file" {...register("carImage3")} />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" >Cancel</Button>
          <Button type="submit" className="bg-violet-500 hover:bg-violet-700">Save Car</Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default Addcar