import ActivityTable from "../component/ActivityTable";
import Header from "../component/Header";
import axios from "axios";

const Dashboard = () => {
  return (
    <div className="w-full">
      <Header />
      <ActivityTable />
    </div>
  );
};

export default Dashboard;

export async function loader() {
  const UUID = localStorage.getItem("UUID");
  const activites = await axios.get(
    `${import.meta.env.VITE_BACK_BASE_URL}/activities/created_by/${UUID}`,
  );
  console.log(activites);
  return {
    activites: activites.data.data,
  };
}
