import useNormalFetchData from "@/hooks/useNormalFetchData";
import supabase from "@/supabase/supabase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import {app} from '../../Firebase/Firebaseapp'
// import {getAuth } from 'firebase/auth'
// import { getFirestore, collection,getDocs } from "firebase/firestore";

// const auth =getAuth(app)
// const fireStoreDb = getFirestore(app);

const DataSlice = createSlice({
  name: "CarData",
  initialState: {
    Cardetails: [],
    latestCar: [],
    Brands: [],
    Categories: [],
    searchReasult: [],
    Realated: [],
    SearchQuery: {},
    PaginationData: [],
    PaginationNumber: 0,
    status: "",
    No_Cars: 2,
    commentsData: [],
    compareData1: {},
    compareData2: {},

  },
  reducers: {
    getlatestCar(state, action) {
      let arr = []
      state.Cardetails.map((x, index) => {
        if (index < 4) {
          arr = [...arr, x]
        }
      })
      state.latestCar = arr
    },
    GetSearchData(state, action) {

      const { carName, Category, Brand, Price } = action.payload

      state.SearchQuery = action.payload

      let search = state.Cardetails.filter((x) => {
        if (x.Name === carName || x.BodyType === Category || x.Brand === Brand) {

          return x
        }
      })
      state.searchReasult = search
    },
    relatedProducts(state, action) {
      let filterdata = state.Cardetails.filter((x) => x.BodyType == action.payload)
      state.Realated = filterdata
    },
    getPaginationData(state, action) {
      const page = Math.ceil(state.Cardetails.length / state.No_Cars)
      // 1=1-4
      // 2=4-8
      state.PaginationNumber = page
    },
    nextPaginationData(state, action) {
      const { Upper, Lower } = action.payload
      const cutData = state.Cardetails.slice(Lower, Upper)
      console.log(cutData);
      state.PaginationData = cutData
    },
    paginationByNumber(state, action) {
      console.log(action.payload);
      if (action.payload == 1) {
        const Upper = state.No_Cars
        const Lower = 0
        console.log(Upper, Lower)
        const cutData = state.Cardetails.slice(Lower, Upper)
        console.log(cutData);
        state.PaginationData = cutData
      } else {
        const Upper = action.payload * state.No_Cars
        const Lower = Upper - state.No_Cars
        console.log(Upper, Lower)
        const cutData = state.Cardetails.slice(Lower, Upper)
        console.log(cutData);
        state.PaginationData = cutData
      }

    },
    comparisonSearchData(state, action) {
      const { searchData1, searchData2 } = action.payload

      let carData1 = state.Cardetails.find((x) => x.Name == searchData1)
      let carData2 = state.Cardetails.find((x) => x.Name == searchData2)
      state.compareData1 = carData1
      state.compareData2 = carData2

    }


  }, extraReducers: (builder) => {
    builder.addCase(featchCarData.pending, (state) => {
      console.log("pending");
      state.status = "pending"
    })
      .addCase(featchCarData.fulfilled, (state, action) => {
        console.log(action.payload);
        state.Cardetails = action.payload.CarDetails
        state.Brands = action.payload.Brands
        state.Categories = action.payload.Categories
        // state.commentsData = action.payload.Comments
        console.log("Success");
        state.status = "Success"
      })
      .addCase(featchCarData.rejected, (state, actions) => {
        console.log("rejected");
        state.status = "rejected"
      })

  }

})


export const featchCarData = createAsyncThunk("carinfo/cardata", async () => {
  const { data: Categories } = await supabase.from("Categories").select('*').order('created_at', { ascending: false });
  const { data: CarDetails } = await supabase.from("CarDetails").select('*').order('created_at', { ascending: false });
  const { data: Brands } = await supabase.from("Brands").select('*').order('created_at', { ascending: false });

  console.log({ CarDetails: CarDetails, Brands: Brands, Categories: Categories });
  return { CarDetails: CarDetails, Brands: Brands, Categories: Categories }
})

export default DataSlice.reducer

export const { getlatestCar, GetSearchData, relatedProducts, getPaginationData, nextPaginationData, paginationByNumber, comparisonSearchData } = DataSlice.actions