
const CompareCard = ({ compareData }) => {
    return (
        <div className="grid gap-6 mx-5 sm:w-[50%] w-[90%]" >
            <div className="flex items-center gap-4">
                <div className="text-4xl font-bold">{compareData?.Name}</div>
                <div className="inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium">{compareData?.BodyType}</div>
            </div>
            <img
                src={compareData?.carImages && compareData?.carImages[0]}
                alt="Honda Accord"
                className="rounded-lg  w-full h-[400px]  sm:object-fill object-contain"
            />
            <div className="grid gap-4">
                <p>
                    {compareData?.Description}
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="grid gap-1">
                        <div className="text-sm font-medium">Horsepower</div>
                        <div>{compareData?.MaxPower}</div>
                    </div>
                    <div className="grid gap-1">
                        <div className="text-sm font-medium">Transmission</div>
                        <div className=" font-bold">{compareData?.Transmission}</div>
                    </div>
                    <div className="grid gap-1">
                        <div className="text-sm font-medium">Price</div>
                        <div className=" font-bold"> ₹  {compareData?.Price}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompareCard