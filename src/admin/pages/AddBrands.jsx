import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import Headding from "../components/CustomComponents/Headding"
import { FilePenLine,  TagIcon, Trash2 } from "lucide-react"
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



const AddBrands = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const { register, reset, handleSubmit } = useForm({})
    // custom hooks 
    const { Data: Brands, getDataMutation } = useFetchData({ tableName: "Brands", page: currentPage, setTotalPages: setTotalPages })
    const uploadImage = useUploadIMG({ bucketName: "brands" });
    const {AddMutation} = useAddMutation({ tableName: "Brands" })
    const {DeleteMutation} = useDeleteMutation({ tableName: "Brands", bucketName: "brands" })
    const Expath = useExtractedPart()
    // custom hooks 

    const Submit = async (data) => {
        let imageUrl = null
        if (data.BarndLogo[0]) {
            imageUrl = await uploadImage(data.BarndLogo[0]);
        }

        let payload = { BrandName: data.BrandName, BarndLogo: BaseImgURL + imageUrl }
        await AddMutation(payload)

        await getDataMutation()
        reset()
    }
    const DeleteFn = async (data) => {
        // extract the path of old images make an array
        let imgArray = Expath([data.BarndLogo])
        // extract the path of old images make an array
        await DeleteMutation(data, imgArray)
        await getDataMutation()
    }
    // custom hooks 

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Headding
                title="Add Brands"
                description="Our most Advanced Car Info Panel"
                Icon={TagIcon}
                iconColor=" text-emerald-500"
                bgColor="text-emerald-500/10"
            />
            <form className="mb-8" onSubmit={handleSubmit(Submit)}>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" >
                    <div>
                        <Label htmlFor="logo">Brand Logo</Label>
                        <Input id="logo" type="file" accept="image/*"  {...register("BarndLogo")} />
                    </div>
                    <div>
                        <Label htmlFor="name">Brand Name</Label>
                        <Input id="name" type="text" {...register("BrandName")} />
                    </div>
                </div>
                <Button type="submit" className=" w-[100%] mt-5 bg-emerald-500 hover:bg-green-700 cursor-pointer"   >Add Brand</Button>

            </form>
            <div className="border rounded-lg overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="cursor-pointer" >
                                Brand Logo{" "}
                            </TableHead>
                            <TableHead className="cursor-pointer" >
                                Brand Name{" "}
                            </TableHead>
                            <TableHead className="cursor-pointer" >
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Brands?.map((Brands, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <img src={Brands?.BarndLogo} alt={Brands.name} width={64} height={64} className="rounded-md" />
                                </TableCell>
                                <TableCell>{Brands?.BrandName}</TableCell>
                                <TableCell className=" flex gap-5">
                                    <Trash2 onClick={() => DeleteFn(Brands)} />
                                    {/* <FilePenLine onClick={() => EditFn(brand)} /> */}
                                    <EditPopup BrandDeatils={Brands} tableRefresh={getDataMutation} />

                                </TableCell>
                            </TableRow>
                        ))}
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
    )
}


export function EditPopup({ BrandDeatils, tableRefresh }) {
    const Expath = useExtractedPart()

    const { register, reset, handleSubmit, setValue } = useForm({})
    const uploadImage = useUploadIMG({ bucketName: "brands" });

    const {EditMutation} = useUpdateMutation({ tableName: "Brands", bucketName: "brands" })

    const Submit = async (data) => {
        console.log(data);
        let imageUrl = null
        if (data.BarndLogo[0]) {
            imageUrl = await uploadImage(data.BarndLogo[0]);
        }
        let payload
        let imgArray
        if (imageUrl) {
            imgArray = Expath([BrandDeatils.BarndLogo])
            payload = { BrandName: data.BrandName, BarndLogo: BaseImgURL + imageUrl }
        } else {
            payload = { BrandName: data.BrandName, BarndLogo: BrandDeatils?.BarndLogo }
        }
        await EditMutation(payload, BrandDeatils?.id, imgArray)

        tableRefresh()
        reset()
    }
    useEffect(() => {
        if (BrandDeatils) {
            setValue("BrandName", BrandDeatils?.BrandName)
        }
    }, [BrandDeatils])

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
                            <Input id="name" className="col-span-3" {...register("BrandName")} />
                        </div>
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="image" className="text-right">
                                Image
                            </Label>
                            <div className="col-span-3 flex items-center gap-2">
                                <img src={BrandDeatils?.BarndLogo} alt="Brand Image" width={100} height={100} className="rounded-md" />
                                <Input id="image" type="file" {...register("BarndLogo")} />
                            </div>
                        </div>

                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="submit" className="bg-emerald-500 hover:bg-green-700 cursor-pointer">Save</Button>
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

export default AddBrands