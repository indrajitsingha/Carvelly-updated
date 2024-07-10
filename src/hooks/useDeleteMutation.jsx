import supabase from '@/supabase/supabase';
import { useState } from 'react';

function useDeleteMutation({ tableName, bucketName }) {
    const [isDeleteLoading, setisDeleteLoading] = useState(false)

    const DeleteMutation = async (payload, imageArray) => {
        setisDeleteLoading(true)
        await supabase.storage.from(bucketName).remove(imageArray);
        await supabase.from(tableName).delete().eq("id", payload?.id);
        setisDeleteLoading(false)

    };

    return { DeleteMutation, isDeleteLoading }
}

export default useDeleteMutation