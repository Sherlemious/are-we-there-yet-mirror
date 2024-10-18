import axiosInstance from "../../shared/services/axiosInstance";
import { ActivityType } from "../../shared/types/Activity.types";
import { ApiResponse } from "../../shared/types/Response.types";
import ActivityTable from "../component/ActivityTable";
import Header from "../component/Header";

const Dashboard = () => {
  return (
    <div className="w-full">
      <Header />
      <ActivityTable />
    </div>
  );
};

export default Dashboard;

export interface LoaderDataType {
  activites: ActivityType[];
}
export async function loader(): Promise<LoaderDataType> {
  const activites =
    await axiosInstance.get<ApiResponse<ActivityType[]>>(`/activities/mine`);
  return {
    activites: activites.data.data,
  };
}
