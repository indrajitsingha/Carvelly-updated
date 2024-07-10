import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";

import PieChartBrand from "../components/PieChartBrand";
import { ToastContainer } from 'react-toastify';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Car, CarFront, CarIcon, LayersIcon, LayoutDashboard, TagIcon, Users, UsersIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Headding from "../components/CustomComponents/Headding";
import useNormalFetchData from "@/hooks/useNormalFetchData";

const AdminDashboard = () => {
  const { Data: Admins } = useNormalFetchData({ tableName: "Admin" })
  const { Data: TotalBrands } = useNormalFetchData({ tableName: "Brands" })
  const { Data: Totalcar } = useNormalFetchData({ tableName: "CarDetails" })
  const { Data: TotalCategories } = useNormalFetchData({ tableName: "Categories" })

  return (
    <div className="grid min-h-[77vh] w-full mb-4 pb-10 px-8 ">
      <ToastContainer />
      <Headding
        title="Carvelly DASHBOARD "
        description="Our most Advanced Car Info Panel"
        Icon={LayoutDashboard}
        iconColor="text-sky-500"
        bgColor="text-sky-500/10"
      />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="" >
            <CardHeader className="flex flex-col items-center justify-center gap-2 py-6">
              <Users className="w-8 h-8 text-[crimson]" />
              <div className="text-4xl font-bold text-[crimson]">
                <span>{Admins?.length}</span>
              </div>
              <div className="text-sm text-muted-foreground font-bold">Total Admins</div>
            </CardHeader>
            <CardContent>
              <Progress value={Admins?.length} aria-label="20% of total admins " />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-col items-center justify-center gap-2 py-6">
              <TagIcon className="w-8 h-8  text-emerald-500" />
              <div className="text-4xl font-bold text-emerald-500">
                <span>{TotalBrands?.length}</span>
              </div>
              <div className="text-sm text-muted-foreground font-bold">Total Brands</div>
            </CardHeader>
            <CardContent>
              <Progress value={TotalBrands?.length} aria-label="80% of total brands" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-col items-center justify-center gap-2 py-6">
              <CarFront className="w-8 h-8 text-pink-700 " />
              <div className="text-4xl font-bold text-pink-700">
                <span>{Totalcar?.length}</span>
              </div>
              <div className="text-sm text-muted-foreground font-bold">Total Cars</div>
            </CardHeader>
            <CardContent>
              <Progress value={Totalcar?.length} aria-label="90% of total cars" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-col items-center justify-center gap-2 py-6">
              <LayersIcon className="w-8 h-8 text-green-500" />
              <div className="text-4xl font-bold text-green-500">
                <span>{TotalCategories?.length}</span>
              </div>
              <div className="text-sm text-muted-foreground font-bold">Total Categories</div>
            </CardHeader>
            <CardContent>
              <Progress value={TotalCategories?.length} aria-label="85% of total categories" />
            </CardContent>
          </Card>
        </div>
      </main>
      <div className="flex justify-between items-center gap-5 w-[100%] mt-10 flex-col lg:flex-row">
        <section className="bg-background w-[100%] rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">All Categories and Number of Cars</h2>
          <PieChart Cars={Totalcar} />
        </section>
        <section className="bg-background w-[100%] rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">All Brands and Number of Cars</h2>
          <PieChartBrand Cars={Totalcar} />

        </section>
        <section className="bg-background w-[100%] rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">All items and Total summary</h2>
          <LineChart Admin={Admins.length} Car={Totalcar.length} Brands={TotalBrands.length} Category={TotalCategories.length} /> */}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
