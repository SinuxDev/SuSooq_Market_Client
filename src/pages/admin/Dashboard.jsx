import PropTypes from "prop-types";
import Cards from "../../components/Dashboard/Cards";
import {
  BanknotesIcon,
  UserGroupIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import ArenaCharts from "../../components/Dashboard/ArenaCharts";
import BarLists from "../../components/Dashboard/BarLists";
import { useEffect, useReducer } from "react";

// Intitial State
const initialState = {
  totalSales: 0,
  usersCount: 0,
};

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "TOTAL_SALES":
      return {
        ...state,
        totalSales: action.totalPrice,
      };
    case "USERS_COUNT":
      return { ...state, usersCount: action.users.length };
    default:
      return state;
  }
};

const Dashboard = ({
  totalProducts,
  users,
  products,
  totalPrice,
  totalPending,
  setActiveTabKey,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (totalPrice > 0) {
      dispatch({ type: "TOTAL_SALES", totalPrice });
    }
    dispatch({ type: "USERS_COUNT", users });
  }, [products, users, totalPrice]);

  const { totalSales, usersCount } = state;

  return (
    <section className="flex flex-col h-full">
      <div className="flex items-center gap-4 mb-5 mt-3 flex-wrap">
        <div className="w-1/2">
          <Cards
            title={"Total Sales"}
            count={`${totalSales} MMK`}
            icon={BanknotesIcon}
            note={"MMK"}
          />
        </div>
        <div
          onClick={() => setActiveTabKey("1")}
          className="cursor-pointer w-1/3"
        >
          <Cards
            title={"Total Products"}
            count={totalProducts}
            icon={ShoppingCartIcon}
            note={"Products"}
          />
        </div>
        <div
          onClick={() => setActiveTabKey("2")}
          className="cursor-pointer w-1/3"
        >
          <Cards
            title={"Active Users"}
            count={usersCount}
            icon={UserGroupIcon}
            note={"Users"}
          />
        </div>
        <div
          onClick={() => setActiveTabKey("1")}
          className="cursor-pointer w-1/2"
        >
          <Cards
            title={"Pending Products"}
            count={totalPending > 0 ? totalPending : "No Pending Products"}
            icon={ShoppingCartIcon}
            note={"Products"}
          />
        </div>
      </div>
      <div className="flex-1 min-w-[300px] min-h-[300px] h-full">
        <ArenaCharts products={products} />
      </div>
      <BarLists products={products} />
    </section>
  );
};

Dashboard.propTypes = {
  totalProducts: PropTypes.number.isRequired,
  products: PropTypes.any.isRequired,
  users: PropTypes.any.isRequired,
  totalPrice: PropTypes.number.isRequired,
  totalPending: PropTypes.number.isRequired,
  setActiveTabKey: PropTypes.func.isRequired,
};

export default Dashboard;
