import { Car} from "lucide-react"
import { Button } from "@/components/ui/button"
import {Sheet,SheetContent,SheetTrigger} from "@/components/ui/sheet"
import { useEffect, useState } from "react"
import Sidebar from "./Sidebar"

const MobileSidebar = () => {
    //  Hydration error solve
    const [isMounted, setisMounted] = useState(false)
    useEffect(() => {
        setisMounted(true)
    }, [])
    if (!isMounted) {
        return null
    }
    //  Hydration error solve
    return (
        <Sheet>
            <SheetTrigger>
                <Button variant="ghost" size="icon" className=" md:hidden">
                    <Car/>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}

export default MobileSidebar