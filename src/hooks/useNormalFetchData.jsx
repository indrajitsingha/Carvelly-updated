import supabase from "@/supabase/supabase";
import { useEffect, useState } from "react";

const useNormalFetchData = ({ tableName }) => {
    const [isDataLoading, setisDataLoading] = useState(false)

    const [Data, setData] = useState([])
    const FetchData = async () => {
        try {
            setisDataLoading(true)

            const { data, error } = await supabase
                .from(tableName)
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                throw error;
            }
            setData(data)
            setisDataLoading(false)

        } catch (error) {
            console.error('Error fetching data:', error);
            return { error };
        }
    };

    useEffect(() => {
        FetchData()
    }, [])
    return { Data: Data, isDataLoading }
}

export default useNormalFetchData