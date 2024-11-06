import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../shared/store/user-context";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <header className="flex h-fit items-center justify-between p-4">
      <div className="flex flex-col justify-end p-14 text-primary-blue">
        <div className="w-full divide-y-2 divide-primary-green">
          <h1 className="py-4 text-4xl font-bold">Welcome {user.username}</h1>
          <h3 className="py-4 text-2xl font-bold">Activities</h3>
        </div>
      </div>
      <Link
        to="add"
        className="rounded bg-accent-dark-blue px-4 py-2 text-white transition-all hover:scale-105 hover:bg-accent-dark-blue/80 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-opacity-50"
      >
        Add Activity
      </Link>
    </header>
  );
};

export default Header;
