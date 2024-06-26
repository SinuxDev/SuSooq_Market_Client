import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { UserIcon, BookmarkIcon } from "@heroicons/react/24/solid";

const Nav = () => {
  const { user } = useSelector((state) => state.reducer.user);
  return (
    <nav className=" flex items-center justify-between text-blue-600 py-4 mb-4">
      <Link className="font-bold text-2xl" to={"/"}>
        SuSooq.IO
      </Link>
      <div className="flex items-center gap-3 font-semibold text-lg">
        <Link to={"/about"}> About </Link>
        <Link to={"/contact"}> Contact </Link>
        <Link to={"/askQuestions"}> Ask Questions </Link>
      </div>
      {user ? (
        <div className="flex items-center gap-2">
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
          {
            <Link
              to={"/save-products"}
              className=" px-2 py-1 flex items-end gap-1"
            >
              {" "}
              <BookmarkIcon width={25} />
            </Link>
          }
        </div>
      ) : (
        <div className=" flex items-center gap-3 text-base font-medium">
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
