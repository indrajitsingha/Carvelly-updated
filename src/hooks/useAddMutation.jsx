import supabase from '@/supabase/supabase';
import { useState } from 'react';

const useAddMutation = ({ tableName }) => {
    const [isAddLoading, setisAddLoading] = useState(false)

    const AddMutation = async (payload) => {
        setisAddLoading(true)
        await supabase.from(tableName).insert(payload);
        setisAddLoading(false)
    }
    return { AddMutation, isAddLoading }
}

export default useAddMutation