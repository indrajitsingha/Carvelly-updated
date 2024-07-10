import supabase from "@/supabase/supabase";
import { useEffect, useState } from "react";

const useFetchData = ({ tableName, page, setTotalPages }) => {
    const ITEMS_PER_PAGE = 10
    const [Data, setData] = useState()
    const [isDataLoading, setisDataLoading] = useState(false)

    const getData = async (searchTerm = "", Rowname = "") => {
        const Range = (page - 1) * ITEMS_PER_PAGE;
        if (searchTerm && Rowname) {
            setisDataLoading(true)

            const { data, error, count } = await supabase.from(tableName)
                .select('*', { count: 'exact' })
                .ilike(Rowname, `%${searchTerm}%`)
                .range(Range, Range + ITEMS_PER_PAGE - 1)
                .order('created_at', { ascending: false })
            console.log(data);
            if (data?.length > 0) {
                setData(data);
            }

            if (error) {
                console.error('Error fetching data:', error);
            } else {
                setData(data);
                setTotalPages(Math.ceil(count / ITEMS_PER_PAGE));
            }
            setisDataLoading(false)

        } else {
            setisDataLoading(true)

            const { data, error, count } = await supabase.from(tableName)
                .select('*', { count: 'exact' })
                .range(Range, Range + ITEMS_PER_PAGE - 1)
                .order('created_at', { ascending: false })
            console.log(data);
            if (data?.length > 0) {
                setData(data);
            }
            if (error) {
                console.error('Error fetching data:', error);
            } else {
                setData(data);
                setTotalPages(Math.ceil(count / ITEMS_PER_PAGE));
            }
            setisDataLoading(false)

        }

    }
    useEffect(() => {
        getData();
    }, [page]);

    return { Data: Data, getDataMutation: getData, isDataLoading };
}

export default useFetchData