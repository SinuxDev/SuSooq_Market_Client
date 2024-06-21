import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

const General = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, name, role } = useSelector((state) => state.reducer.user.user);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));

    navigate("/login");
  };

  return (
    <section>
      <h1 className="text-2xl font-bold my-2">
        {" "}
        {role === "user" ? "User Profile" : "Admin Profile"}{" "}
      </h1>
      <p className="text-lg font-medium my-2"> Name - {name} </p>
      <p className="text-lg font-medium my-2"> Email - {email} </p>
      <p className="text-lg font-medium my-2"> Role - {role} </p>
      <button
        type="button"
        className="text-white bg-red-500 font-medium px-3 py-2 rounded-md"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </section>
  );
};

export default General;
