import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="m-14 flex h-fit items-center justify-center">
      <Link
        to="add"
        className="w-96 rounded bg-accent-dark-blue px-4 py-2 text-center text-white transition-all hover:scale-105 hover:bg-accent-dark-blue/80 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-opacity-50"
      >
        Add Activity
      </Link>
    </div>
  );
};

export default Header;
