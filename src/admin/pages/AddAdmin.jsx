import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import Headding from "../components/CustomComponents/Headding"
import { FilePenLine, Users } from "lucide-react"

import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import useFetchData from "@/hooks/useFetchData"
import useUploadIMG from "@/hooks/useUploadIMG"
import useAddMutation from "@/hooks/useAddMutation"
import useDeleteMutation from "@/hooks/useDeleteMutation"
import useUpdateMutation from "@/hooks/useUpdateMutation"
import useExtractedPart from "@/hooks/useExtractedPart"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { BaseImgURL } from "@/constant/constantVariable"
import { PaginationOne } from "../components/Pagination"

const AddAdmin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const { register, reset, handleSubmit } = useForm({})

  // custom hooks 
  const { Data: Admins, getDataMutation } = useFetchData({ tableName: "Admin", page: currentPage, setTotalPages: setTotalPages })
  const uploadImage = useUploadIMG({ bucketName: "adminImg" });
  const { AddMutation } = useAddMutation({ tableName: "Admin" })
  // custom hooks 

  const Submit = async (data) => {
    let imageUrl = null
    if (data?.Avatar[0]) {
      imageUrl = await uploadImage(data.Avatar[0]);
    }
    let payload = { Name: data.Name, Email: data.Email, Avatar: BaseImgURL + imageUrl }
    await AddMutation(payload)
    await getDataMutation()
    reset()
  }

  // custom hooks 

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="flex flex-col gap-8">
      <div className="bg-background rounded-lg shadow-sm">
        <Headding
          title="Add Admin  "
          description="Our most Advanced Car Info Panel"
          Icon={Users}
          iconColor="text-orange-700"
          bgColor=" text-orange-700/10"
        />
        <form className="p-6 space-y-4" onSubmit={handleSubmit(Submit)}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter name" {...register("Name")} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter email" {...register("Email")} />
            </div>
          </div>
          <div>
            <Label htmlFor="role">Profile Image</Label>
            <Input id="file" type="file" placeholder="Enter email" {...register("Avatar")} />

          </div>
          <Button type="submit" className="w-full bg-orange-700" >
            Add Admin
          </Button>
        </form>
      </div>
      <div className="bg-background rounded-lg shadow-sm">
        <div className="px-6 py-5 border-b">
          <h2 className="text-lg font-semibold">Existing Admins</h2>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Avatar</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Email</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                Admins?.map((admin) => {
                  return (
                    <TableRow key={admin?.id}>
                      <TableCell className="flex justify-center">

                        <img src={admin?.Avatar} alt={admin?.Name} width={50} height={50} className="   rounded-md" />
                      </TableCell>
                      <TableCell className="text-center">{admin?.Name}</TableCell>
                      <TableCell className="text-center">{admin?.Email}</TableCell>

                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <EditPopup AdminDeatils={admin} tableRefresh={getDataMutation} />
                          <DeletePopup AdminDeatils={admin} tableRefresh={getDataMutation} />

                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              }

            </TableBody>
          </Table>
        </div>
        <div className="m-4 flex justify-center ">
          <PaginationOne
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

        </div>
      </div>
    </div>
  )
}

function EditPopup({ AdminDeatils, tableRefresh }) {
  const Expath = useExtractedPart()

  const { register, reset, handleSubmit, setValue } = useForm({})
  const uploadImage = useUploadIMG({ bucketName: "adminImg" });

  const { EditMutation } = useUpdateMutation({ tableName: "Admin", bucketName: "adminImg" })

  const Submit = async (data) => {
    console.log(data);
    let imageUrl = null
    if (data?.Avatar?.length > 0) {
      imageUrl = await uploadImage(data.Avatar[0]);
    }
    let payload
    let imgArray
    if (imageUrl) {
      imgArray = Expath([AdminDeatils?.Avatar])
      payload = { Name: data.Name, Email: data.Email, Avatar: BaseImgURL + imageUrl }
    } else {
      payload = { Name: data.Name, Email: data.Email, Avatar: AdminDeatils?.Avatar }
    }
    await EditMutation(payload, AdminDeatils?.id, imgArray)

    tableRefresh()
    reset()
  }
  useEffect(() => {
    if (AdminDeatils) {
      setValue("Name", AdminDeatils?.Name)
      setValue("Email", AdminDeatils?.Email)
    }
  }, [AdminDeatils])

  return (
    <Dialog >
      <DialogTrigger asChild>
        <FilePenLine />
      </DialogTrigger>
      <DialogContent className="sm:w-[500px] w-[500px]">

        <DialogHeader>
          <DialogTitle>Edit Brand</DialogTitle>
          <DialogDescription>Update the Brand name and LOGO.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(Submit)}>
          <div className="grid gap-4 py-4 ">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" className="col-span-3" {...register("Name")} />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" className="col-span-3" {...register("Email")} />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <img src={AdminDeatils?.Avatar} alt="Brand Image" width={64} height={64} className="rounded-md" />
                <Input id="image" type="file" {...register("Avatar")} />
              </div>
            </div>

          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" className="bg-orange-700 hover:bg-orange-800 cursor-pointer">Save</Button>
            </DialogClose>
            <div>
              <DialogClose asChild>
                <Button type="submit" variant="outline" className="cursor-pointer"  >Cancel</Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


const DeletePopup = ({ AdminDeatils, tableRefresh }) => {
  const Expath = useExtractedPart()
  const { DeleteMutation } = useDeleteMutation({ tableName: "Admin", bucketName: "adminImg" })

  const DeleteFn = async () => {
    // extract the path of old images make an array
    let imgArray = Expath([AdminDeatils?.Avatar])
    // extract the path of old images make an array
    await DeleteMutation(AdminDeatils, imgArray)
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
            <h3 className="text-lg font-normal text-gray-500 mt-5 mb-6">Are you sure you want to delete this <br /> {AdminDeatils?.Name}?</h3>

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

function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}
export default AddAdmin;
