import supabase from "@/supabase/supabase";
import { useState } from "react";


const useUpdateMutation = ({ tableName, bucketName }) => {
    const [isUpdateLoading, setisUpdateLoading] = useState(false)

    const EditMutation = async (newData, ID, imgArray) => {
        setisUpdateLoading(true)

        if (imgArray) {
            console.log(imgArray);
            await supabase.storage.from(bucketName).remove(imgArray);
        }
        await supabase.from(tableName).update(newData).eq("id", ID);
        setisUpdateLoading(false)

    }

    return {EditMutation,isUpdateLoading}
}

export default useUpdateMutation