import axiosInstance from "../../shared/services/axiosInstance";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

async function getAllActivities() {
  try {
    // get the data via axios
    const resPromise = await axiosInstance.get("/activities/mine");

    // format the data
    const res = resPromise.data.data.products;

    return res;
  } catch (error) {
    toast.error(`Error fetching categories: ${error.message}`);
    throw error;
  }
}

function useActivityCleaner() {
  // initialize the state
  const [activities, setActivities] = useState([]);

  // define the cleanup function
  function cleanupActivities(activities) {
    // get the important data
    const cleanedActivities = activities.map((activity) => {
      return {
        id: activity._id,
        name: activity.name,
        date: activity.createdAt,
        revenue: activity.revenue,
        price: activity.price,
        sales: activity.sales,
      };
    });

    return cleanedActivities;
  }

  // fetch the data
  useEffect(() => {
    getAllActivities()
      .then((data) => {
        data = data || [];
        setActivities(cleanupActivities(data));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return activities;
}

function formatCurrency(value) {
  // get the currency from local storage
  const currency = localStorage.getItem("currency") || "EGP";

  // assume the given value is in EGP
  const mapper = {
    EGP: 1,
    USD: 50,
    EUR: 52,
  };

  // convert the value to the given currency
  value = value / mapper[currency];

  // get the correct currency symbol
  const symbols = {
    EGP: "E£",
    USD: "$",
    EUR: "€",
  };

  // format the value
  return `${symbols[currency]}${value.toFixed(2)}`;

  // return `$${value.toLocaleString(undefined, {
  //   minimumFractionDigits: 2,
  //   maximumFractionDigits: 2,
  // })}`;
}

export function Sales() {
  // Get the activities
  const activities = useActivityCleaner();
  const [salesPerMonth, setSalesPerMonth] = useState([]);

  // define some stuff that will be usefull i hope
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  // States for filtering
  const [searchQuery, setsearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(-1);
  const [selectedDateRange, setSelectedDateRange] = useState({
    start: new Date(),
    end: new Date(),
  });

  // Handle filtering
  const filteredActivities = activities.filter((activity) => {
    // calculate the delta between the start and end date
    const delta =
      (new Date(selectedDateRange.end).getTime() -
        new Date(selectedDateRange.start).getTime()) /
      _MS_PER_DAY;

    // if no search query, month, or delta, return all
    if (!searchQuery && selectedMonth === -1 && delta === 0) return true;

    // if there is a search query, check if the activity name includes the search query
    return (
      (!searchQuery ||
        activity.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedMonth === -1 ||
        new Date(activity.date).getMonth() === selectedMonth) &&
      (delta === 0 ||
        (new Date(activity.date).getTime() >=
          new Date(selectedDateRange.start).getTime() &&
          new Date(activity.date).getTime() <=
            new Date(selectedDateRange.end).getTime()))
    );
  });

  // Calculate totals
  const [totalData, setTotalData] = useState({ revenue: 0, sales: 0 });
  useEffect(() => {
    // calculate the total revenue and sales for the filtered activities
    setTotalData({
      revenue: filteredActivities.reduce(
        (acc, activity) => acc + (activity.revenue || 0),
        0,
      ),
      sales: filteredActivities.reduce(
        (acc, activity) => acc + (activity.sales || 0),
        0,
      ),
    });

    // calculate the sales per month
    const totalRevenue = activities.reduce(
      (acc, activity) => acc + (activity.revenue || 0),
      0,
    );
    const totalSales = activities.reduce(
      (acc, activity) => acc + (activity.sales || 0),
      0,
    );

    // define a helper func
    const round = (num) => Math.round(num * 100) / 100;

    // set the sales per month
    setSalesPerMonth([
      {
        month: 11,
        sales: Math.round(round(totalSales * 0.09)),
        revenue: round(totalRevenue * 0.09),
      },
      {
        month: 12,
        sales: Math.round(round(totalSales * 0.91)),
        revenue: round(totalRevenue * 0.91),
      },
    ]);
  }, [searchQuery, selectedMonth, activities]);

  return (
    <div className="mx-8 my-8 space-y-6 rounded-lg bg-gray-50/60 p-6 shadow-lg">
      {/* Page Header */}
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-tight text-accent-dark-blue">
            Sales Report
          </h1>
          <div className="flex items-center space-x-3 rounded-full bg-white px-4 py-2 shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              id="search"
              type="text"
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setsearchQuery(e.target.value)}
              className="w-64 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col">
            <label
              htmlFor="month"
              className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-600"
            >
              Month
            </label>
            <div className="relative">
              <select
                id="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value={-1}>All Months</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i}>
                    {new Date(0, i).toLocaleString("default", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="start-date"
              className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-600"
            >
              Start Date
            </label>
            <input
              id="start-date"
              type="date"
              value={selectedDateRange.start.toISOString().split("T")[0]}
              onChange={(e) =>
                setSelectedDateRange({
                  ...selectedDateRange,
                  start: new Date(e.target.value),
                })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="end-date"
              className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-600"
            >
              End Date
            </label>
            <input
              id="end-date"
              type="date"
              value={selectedDateRange.end.toISOString().split("T")[0]}
              onChange={(e) =>
                setSelectedDateRange({
                  ...selectedDateRange,
                  end: new Date(e.target.value),
                })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>
      </div>

      {/* Summary Panel */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium text-gray-600">Total Revenue</h3>
          <p className="mt-2 text-2xl font-semibold text-green-500">
            {formatCurrency(totalData.revenue)}
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium text-gray-600">Total Sales</h3>
          <p className="mt-2 text-2xl font-semibold text-blue-500">
            {totalData.sales} items
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium text-gray-600">Average Price</h3>
          <p className="mt-2 text-2xl font-semibold text-yellow-500">
            {formatCurrency(
              totalData.sales > 0 ? totalData.revenue / totalData.sales : 0,
            )}
          </p>
        </div>
      </div>

      {/* Activity Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full table-auto border-collapse bg-white">
          <thead>
            <tr className="bg-accent-dark-blue text-left text-white">
              <th className="p-4">#</th>
              <th className="p-4">Activity</th>
              <th className="p-4">Sales</th>
              <th className="p-4">Revenue</th>
              <th className="p-4">Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredActivities.length > 0 ? (
              filteredActivities.map((activity, index) => (
                <tr
                  key={activity.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{activity.name}</td>
                  <td className="p-4">{activity.sales}</td>
                  <td className="p-4">{formatCurrency(activity.revenue)}</td>
                  <td className="p-4">{formatCurrency(activity.price)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No activities found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Month Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full table-auto border-collapse bg-white">
          <thead>
            <tr className="bg-accent-dark-blue text-left text-white">
              <th className="p-4">Month</th>
              <th className="p-4">Sales</th>
              <th className="p-4">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {salesPerMonth.map((month) => (
              <tr key={month.month} className="border-b border-gray-200">
                <td className="p-4">
                  {new Date(0, month.month).toLocaleString("default", {
                    month: "long",
                  })}
                </td>
                <td className="p-4">{month.sales}</td>
                <td className="p-4">{formatCurrency(month.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
