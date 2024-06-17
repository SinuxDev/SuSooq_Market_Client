import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { UserIcon } from "@heroicons/react/24/solid";

const Nav = () => {
  const { user } = useSelector((state) => state.reducer.user);
  return (
    <nav className="bg-blue-500 flex items-center justify-between text-white p-4">
      <Link className="font-bold text-2xl" to={"/"}>
        SuSooq.IO
      </Link>
      {user ? (
        <>
          {user.role === "user" && (
            <Link to={"/profile"} className=" px-2 py-1 flex items-end gap-1">
              {" "}
              <UserIcon width={25} /> Profile
            </Link>
          )}
          {user.role === "admin" && (
            <Link to={"/admin"} className=" px-2 py-1 flex items-end gap-1">
              {" "}
              <UserIcon width={25} /> Admin Panel
            </Link>
          )}
        </>
      ) : (
        <div className="text-white flex items-center gap-3 text-base font-medium">
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
