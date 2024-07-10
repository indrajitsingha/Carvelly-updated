import { useDispatch, useSelector } from "react-redux";
import { comparisonSearchData } from "../Redux/Slice/DataSlice";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";

const ComparisonSearch = () => {
  const Dispatch = useDispatch()
  const { register, reset, handleSubmit } = useForm({})
  const { Cardetails } = useSelector((state) => state.CarData);
  const SearchButton = (data) => {
    console.log(data);
    Dispatch(comparisonSearchData(data));
  };

  return (
    <div className="mt-2">
      <h2 className="text-2xl font-bold mb-4">Compare Cars</h2>
      <form className="grid gap-4" onSubmit={handleSubmit(SearchButton)}>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="car1">Car 1</Label>
            <Input id="car1" list="Cars" {...register("searchData1")} placeholder="Enter car name" />
            <datalist id="Cars">
              {
                Cardetails && Cardetails.map((x) => {
                  return (
                    <option value={x.Name} key={x.Name}>{x.Name}</option>
                  )
                })
              }

            </datalist>
          </div>
          <div>
            <Label htmlFor="car2">Car 2</Label>
            <Input id="car2" list="Cars2" {...register("searchData2")} placeholder="Enter car name" />
            <datalist id="Cars2">
              {
                Cardetails && Cardetails.map((x) => {
                  return (
                    <option value={x.Name} key={x.Name}>{x.Name}</option>
                  )
                })
              }
            </datalist>
          </div>
        </div>
        <Button type="submit">Compare</Button>
        <Button variant="outline" onclick={()=>reset()}>Reset</Button>
      </form>
    </div>
  );
};

export default ComparisonSearch;
