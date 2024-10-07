import ActivityTable from '../component/ActivityTable';
import Header from '../component/Header';
import axios from 'axios';

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
  const activites = await axios.get(`${import.meta.env.VITE_BACK_BASE_URL}/activities`);

  return {
    activites: activites.data.data,
  };
}
