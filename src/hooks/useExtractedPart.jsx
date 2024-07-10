
const useExtractedPart = () => {
    const ExtractPathFn = (url) => {
        let extractedPartArray = []
        for (let i = 0; i < url.length; i++) {
            extractedPartArray = [...extractedPartArray, url[i].substring(url[i].lastIndexOf('/') + 1)];
        }
        if (extractedPartArray.length > 0) {
            return extractedPartArray
        }
        else {
            return null;
        }

    }
    return ExtractPathFn
}

export default useExtractedPart