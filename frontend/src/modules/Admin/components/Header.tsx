import { AddUserPopup, OpenPopupButton } from "./popup";
import axiosInstance from "../../shared/services/axiosInstance";

const Header = ({
  isTourismGovernorPopupOpen,
  setIsTourismGovernorPopupOpen,
  isAdminPopupOpen,
  setIsAdminPopupOpen,
  setUsers,
  setRefresh,
}: {
  isTourismGovernorPopupOpen: boolean;
  isAdminPopupOpen: boolean;
  isProfilePopupOpen: boolean;
  setIsProfilePopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTourismGovernorPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAdminPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUsers: React.Dispatch<React.SetStateAction<any[]>>;
  setRefresh: React.Dispatch<React.SetStateAction<number>>;
}) => {
  // Function to add an Tag
  const addUser = async (
    username: string,
    password: string,
    email: string,
    accountType: string,
  ) => {
    try {
      const response = await axiosInstance.post("/auth/register", {
        username,
        password,
        email,
        account_type: accountType,
      });

      if (response.statusText !== "OK") {
        throw new Error("Failed to add user");
      }

      localStorage.setItem(`${accountType}Token`, response.data.data.jwt);
      const newUser = await response.data;
      // Optionally, you can trigger a state update or callback to refresh the user list
      const userId = newUser.data.user._id;
      const user = await getUser(userId);
      setUsers((prevUsers) => [
        ...prevUsers,
        {
          _id: user._id,
          username: user.username,
          email: user.email,
          account_type: user.account_type,
        },
      ]);
      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  async function getUser(id: string) {
    return fetch(`https://are-we-there-yet-mirror.onrender.com/api/users/${id}`)
      .then((response) => response.json())
      .then((data) => data.data.user);
  }

  const handleAddTourismGovernor = (
    username: string,
    password: string,
    email: string,
  ) => {
    addUser(username, password, email, "TourismGovernor");
    setIsTourismGovernorPopupOpen(false); // Close the popup after adding
  };

  const handleAddAdmin = (
    username: string,
    password: string,
    email: string,
  ) => {
    addUser(username, password, email, "Admin");
    setIsAdminPopupOpen(false); // Close the popup after adding
  };

  return (
    <header className="flex items-center justify-between bg-gray-100 p-4">
      <div className="flex flex-col justify-end p-14 text-text-primary">
        <div className="w-full max-w-[50vw] divide-y-2 divide-borders-bottomBorder">
          <h1 className="py-4 text-4xl font-bold">Welcome Sawy</h1>
          <h3 className="py-4 text-2xl font-bold">Profiles</h3>
        </div>
      </div>
      <div className="h-1/2 max-w-fit border-2 border-gray-300 p-14">
        <h3 className="mb-4 w-fit border-b border-borders-bottomBorder text-lg font-bold text-gray-800">
          Add a User
        </h3>
        <div className="flex space-x-4">
          <OpenPopupButton onClick={() => setIsTourismGovernorPopupOpen(true)}>
            Add Tourism Governor
          </OpenPopupButton>
          <OpenPopupButton onClick={() => setIsAdminPopupOpen(true)}>
            Add Admin
          </OpenPopupButton>

          <AddUserPopup
            isOpen={isTourismGovernorPopupOpen}
            onClose={() => setIsTourismGovernorPopupOpen(false)}
            onAdd={handleAddTourismGovernor}
            title="Add a Tourism Governor"
          />
          <AddUserPopup
            isOpen={isAdminPopupOpen}
            onClose={() => setIsAdminPopupOpen(false)}
            onAdd={handleAddAdmin}
            title="Add an Admin"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
