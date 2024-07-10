import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import Headding from "../components/CustomComponents/Headding"
import { CarFront, FilePenIcon, TrashIcon } from "lucide-react"
import { useEffect, useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import { PaginationOne } from "../components/Pagination";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import useExtractedPart from "@/hooks/useExtractedPart";
import { useForm } from "react-hook-form";
import useUpdateMutation from "@/hooks/useUpdateMutation";
import useUploadIMG from "@/hooks/useUploadIMG";
import { Label } from "@radix-ui/react-dropdown-menu";
import useNormalFetchData from "@/hooks/useNormalFetchData";
import { Textarea } from "@/components/ui/textarea"
import { BaseImgURL } from "@/constant/constantVariable";
import useDeleteMutation from "@/hooks/useDeleteMutation";

const ShowCars = () => {
  const Navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [Search, setSearch] = useState("")
  const { Data: currentCars, getDataMutation } = useFetchData({ tableName: "CarDetails", page: currentPage, setTotalPages: setTotalPages })
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    setTimeout(() => {
      getDataMutation(Search, "Name")
    }, 2000)
  }, [Search])
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <Headding
          title="Show Cars "
          description="Our most Advanced Car Info Panel"
          Icon={CarFront}
          iconColor=" text-pink-700"
          bgColor="text-pink-700/10"
        />

        <div className="ml-auto flex items-center gap-4">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchIcon className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder="Search cars..."
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg bg-background pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            />
          </div>
          <Button onClick={() => Navigate("/admin/addcar")}>ADD CAR</Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Car Name</TableHead>
              <TableHead >Car Image</TableHead>
              <TableHead className="text-center">Brand</TableHead>
              <TableHead className="text-center">BodyType</TableHead>
              <TableHead className="text-center">Transmission</TableHead>
              <TableHead className="text-center">Power</TableHead>
              <TableHead className="text-center" >Price</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentCars?.map((car) => (
              <TableRow key={car.id} >
                <TableCell className="font-medium">{car?.Name}</TableCell>
                <TableCell >
                  <img
                    src={car?.carImages[0]}
                    alt={car?.Name}
                    width={64}
                    height={64}
                    className="aspect-square rounded-lg object-contain  "
                  />
                </TableCell>
                <TableCell className="text-center"><Badge className="bg-emerald-500">{car?.Brand}</Badge></TableCell>
                <TableCell className="text-center " ><Badge className="bg-green-500">{car?.BodyType}</Badge></TableCell>
                <TableCell className="text-center">{car?.Transmission}</TableCell>
                <TableCell className="text-center">{car?.Power}</TableCell>
                <TableCell className="text-center"><Badge className="bg-red-500">{car?.Price}</Badge></TableCell>

                <TableCell >
                  <div className="flex items-center justify-center gap-2">
                    <EditPopup CarDetails={car} tableRefresh={getDataMutation} />
                    <DeletePopup CarDetails={car} tableRefresh={getDataMutation} />

                  </div>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-6 flex justify-center">
        <PaginationOne
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
};

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function EditPopup({ CarDetails, tableRefresh }) {
  const Expath = useExtractedPart()

  const { register, reset, handleSubmit, setValue, formState: { errors, } } = useForm({})
  const uploadImage = useUploadIMG({ bucketName: "carImages" });

  const { Data: Brands } = useNormalFetchData({ tableName: "Brands" })
  const { Data: Categories } = useNormalFetchData({ tableName: "Categories" })

  const { EditMutation, isUpdateLoading } = useUpdateMutation({ tableName: "CarDetails", bucketName: "carImages" })

  const Submit = async (data) => {
    console.log(data);
    let imageUrl = []
    if (data?.carImage1?.length > 0) {
      let Url = await uploadImage(data?.carImage1[0]);
      if (Url) { imageUrl = [...imageUrl, BaseImgURL + Url] }
    }
    if (data?.carImage2?.length > 0) {
      let Url = await uploadImage(data?.carImage2[0]);
      if (Url) { imageUrl = [...imageUrl, BaseImgURL + Url] }
    }
    if (data?.carImage3?.length > 0) {
      let Url = await uploadImage(data?.carImage3[0]);
      if (Url) { imageUrl = [...imageUrl, BaseImgURL + Url] }
    }
    let payload
    let imgArray
    if (imageUrl.length>0) {
      imgArray = Expath(CarDetails?.carImages)
      payload = {
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
    } else {

      payload = {
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
        carImages: CarDetails?.carImages
      };
    }
    await EditMutation(payload, CarDetails?.id, imgArray)
    tableRefresh()
    reset()
  }

  useEffect(() => {
    if (CarDetails) {
      // Set the values for all fields
      setValue("Name", CarDetails?.Name);
      setValue("DrivingRange", CarDetails?.DrivingRange);
      setValue("Power", CarDetails?.Power);
      setValue("Transmission", CarDetails?.Transmission);
      setValue("BatteryCapacity", CarDetails?.BatteryCapacity);
      setValue("SeatingCapacity", CarDetails?.SeatingCapacity);
      setValue("MaxPower", CarDetails?.MaxPower);
      setValue("MaxTorque", CarDetails?.MaxTorque);
      setValue("BodyType", CarDetails?.BodyType);
      setValue("Brand", CarDetails?.Brand);
      setValue("Description", CarDetails?.Description);
      setValue("Price", CarDetails?.Price);
    }
  }, [CarDetails]);

  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <FilePenIcon className="h-5 w-5 text-pink-600" />
          <span className="sr-only">Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-[500px] w-[500px]">

        <DialogHeader>
          <DialogTitle>Update Car Details</DialogTitle>
          <DialogDescription>Update the Details of Car.</DialogDescription>
        </DialogHeader>
        <form className="relative" onSubmit={handleSubmit(Submit)} >

          {isUpdateLoading ? <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
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
          <div className="grid gap-6 max-h-[60vh] overflow-y-auto no-scrollbar p-1"  >
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Car Name  <span className=" text-[12px] text-pink-700">*</span></Label>
                <Input type="text" id="name" placeholder="Enter car name" {...register("Name", { required: true })} />
                {errors.Name && <span className=" text-[12px] text-pink-700"> Car Name is Required</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="range">Driving Range<span className=" text-[12px] text-pink-700">*</span></Label>
                <Input id="range" type="text" placeholder="Enter driving range" {...register("DrivingRange", { required: true })} />
                {errors.DrivingRange && <span className=" text-[12px] text-pink-700"> DrivingRange is Required</span>}

              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="power">Power<span className=" text-[12px] text-pink-700">*</span></Label>
                <Input id="power" type="text" placeholder="Enter power" {...register("Power", { required: true })} />
                {errors.Power && <span className=" text-[12px] text-pink-700"> Power is Required</span>}

              </div>
              <div className="space-y-2">
                <Label htmlFor="transmission">Transmission<span className=" text-[12px] text-pink-700">*</span></Label>
                <select {...register("Transmission", { required: true })}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                >

                  <option value="" className="relative  flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground ">Transmission Type</option>
                  <option className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground " value="Automatic">Automatic</option>
                  <option className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground " value="Manual">Manual</option>
                  <option className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground " value="CVT">CVT</option>

                </select>
                {errors.Transmission && <span className=" text-[12px] text-pink-700"> Transmission is Required</span>}

              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="battery">Battery Capacity<span className=" text-[12px] text-pink-700">*</span></Label>
                <Input id="battery" type="text" placeholder="Enter battery capacity" {...register("BatteryCapacity", { required: true })} />
                {errors.BatteryCapacity && <span className=" text-[12px] text-pink-700"> Battery Capacity is Required</span>}

              </div>
              <div className="space-y-2">
                <Label htmlFor="seating">Seating Capacity<span className=" text-[12px] text-pink-700">*</span></Label>
                <Input id="seating" type="number" placeholder="Enter seating capacity"  {...register("SeatingCapacity", { required: true })} />
                {errors.SeatingCapacity && <span className=" text-[12px] text-pink-700"> Seating Capacity is Required</span>}
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
                <Label htmlFor="category">Category <span className=" text-[12px] text-pink-700">*</span></Label>
                {/* <Select id="category" {...register("BodyType")} >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      Categories?.map((category) => <SelectItem key={category?.id} value={category?.CategoryName}>{category?.CategoryName}</SelectItem>)

                    }

                    <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="hatchback">Hatchback</SelectItem>
                  <SelectItem value="coupe">Coupe</SelectItem>
                  <SelectItem value="truck">Truck</SelectItem>
                  </SelectContent>
                </Select> */}

                <select {...register("BodyType", { required: true })}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                >
                  <option value="" className="relative  flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground ">Select BodyType</option>

                  {
                    Categories?.map((category) => <option className="relative  flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground " key={category?.id} value={category?.CategoryName}>{category?.CategoryName}</option>)

                  }

                </select>
                {errors.BodyType && <span className=" text-[12px] text-pink-700"> Body Type is Required</span>}

              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Brand <span className=" text-[12px] text-pink-700">*</span></Label>
                {/* <Select id="brand" {...register("Brand")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      Brands?.map((Brand) => <SelectItem key={Brand?.id} value={Brand?.BrandName}>{Brand?.BrandName}</SelectItem>)

                    }
                    <SelectItem value="tesla">Tesla</SelectItem>
                  <SelectItem value="toyota">Toyota</SelectItem>
                  <SelectItem value="honda">Honda</SelectItem>
                  <SelectItem value="ford">Ford</SelectItem>
                  <SelectItem value="bmw">BMW</SelectItem>
                  </SelectContent>
                </Select> */}
                <select {...register("Brand", { required: true })}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                >
                  <option value="" className="relative  flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground ">Select Brand</option>

                  {
                    Brands?.map((Brand) => <option className="relative  flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground " key={Brand?.id} value={Brand?.BrandName}>{Brand?.BrandName}</option>)

                  }

                </select>
                {errors.Brand && <span className=" text-[12px] text-pink-700"> Brand is Required</span>}


              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Car Description<span className=" text-[12px] text-pink-700">*</span></Label>
              <Textarea id="description" placeholder="Enter car description" {...register("Description", { required: true })} />
              {errors.Description && <span className=" text-[12px] text-pink-700"> Description is Required</span>}

            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price<span className=" text-[12px] text-pink-700">*</span></Label>
              <Input id="price" type="number" placeholder="Enter price" {...register("Price", { required: true })} />
              {errors.Price && <span className=" text-[12px] text-pink-700"> Price is Required</span>}


            </div>
            <div className="space-y-2">
              <Label>Images</Label>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col items-center justify-center border rounded-md p-4 h-32 cursor-pointer">
                  {/* <PlusIcon className="w-6 h-6" />*/}
                  <span className="text-sm text-muted-foreground" >Upload Image</span>
                  <input type="file" {...register("carImage1")} />
                  {/* {errors.carImage1 && <span className=" text-[12px] text-pink-700"> Atleast one image is Required</span>} */}

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


          <DialogFooter className="p-2">
            {/* <DialogClose asChild></DialogClose> */}

            <Button type="submit" className="bg-pink-500 hover:bg-pink-700">Save Car</Button>


            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer"  >Cancel</Button>
            </DialogClose>

          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const DeletePopup = ({ CarDetails, tableRefresh }) => {
  const Expath = useExtractedPart()
  const { DeleteMutation } = useDeleteMutation({ tableName: "CarDetails", bucketName: "carImages" })

  const DeleteFn = async () => {
    // extract the path of old images make an array
    let imgArray = Expath(CarDetails?.carImages)
    // extract the path of old images make an array
    await DeleteMutation(CarDetails, imgArray)
    await tableRefresh()
  }
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <TrashIcon className="h-5 w-5 text-red-600" />
          <span className="sr-only">Delete</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-[500px] w-[400px]">
        <div className="">
          <div className="p-6 pt-0 text-center">
            <svg className="w-20 h-20 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="text-lg font-normal text-gray-500 mt-5 mb-6">Are you sure you want to delete this {CarDetails?.Name}?</h3>

          </div>
        </div>


        <DialogFooter className="p-2">
          <div >
            <DialogClose asChild>
              <Button type="submit" className=" bg-red-600 hover:bg-red-800" onClick={DeleteFn}> Yes, I'm sure</Button>
            </DialogClose>
          </div>
          <div >
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer" >No, cancel</Button>
            </DialogClose>
          </div>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}

export default ShowCars;
