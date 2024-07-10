import supabase from "../supabase/supabase";

const useUploadIMG = ({ bucketName }) => {

    const UploadIMG = async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        let { data, error } = await supabase.storage.from(bucketName).upload(filePath, file);

        if (error) {
            return null;
        }
        else {
            return data?.fullPath;
        }
    }

    return UploadIMG

}

export default useUploadIMG