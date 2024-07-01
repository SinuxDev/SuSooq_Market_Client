import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setUser } from "../store/slices/userSlice";

import {
  UserIcon,
  BookmarkIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/solid";

const Nav = () => {
  const { user } = useSelector((state) => state.reducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    localStorage.removeItem("token");
    dispatch(setUser(null));
  };

  return (
    <nav className="min-300px:mx-12 min-400px:mx-12 mb-4 flex items-center justify-between py-4 text-blue-600 sm:mx-12 md:mx-14">
      <Link
        className="min-300px:text-sm min-400px:text-lg text-2xl font-bold"
        to={"/"}
      >
        SuSooq.IO
      </Link>
      <div className="hidden items-center gap-3 text-lg font-semibold md:flex">
        <Link to={"/about"}> About </Link>
        <Link to={"/contact"}> Contact </Link>
        <Link to={"/askQuestions"}> Ask Questions </Link>
      </div>
      {user ? (
        <div className="flex items-center gap-2">
          {user.role === "user" && (
            <Link to={"/profile"} className="flex items-end gap-1 px-2 py-1">
              {" "}
              <UserIcon width={25} />
            </Link>
          )}
          {user.role === "admin" && (
            <Link to={"/admin"} className="flex items-end gap-1 px-2 py-1">
              {" "}
              <UserIcon width={25} /> Admin Panel
            </Link>
          )}
          {
            <Link
              to={"/save-products"}
              className="flex items-end gap-1 px-2 py-1"
            >
              {" "}
              <BookmarkIcon width={25} />
            </Link>
          }
          {
            <ArrowLeftEndOnRectangleIcon
              width={25}
              onClick={logout}
              className="cursor-pointer"
            />
          }
        </div>
      ) : (
        <div className="min-300px:text-sm min-400px:text-lg flex items-center gap-3 text-base font-medium">
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
