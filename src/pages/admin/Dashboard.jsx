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
        totalSales: action.products.reduce((acc, curr) => acc + curr.price, 0),
      };
    case "USERS_COUNT":
      return { ...state, usersCount: action.users.length };
    default:
      return state;
  }
};

const Dashboard = ({ products, users }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (products.length > 0) {
      dispatch({ type: "TOTAL_SALES", products });
      dispatch({ type: "USERS_COUNT", users });
    }
  }, [products, users]);

  const { totalSales, usersCount } = state;

  return (
    <section className="flex flex-col h-full">
      <div className="flex items-center gap-6 mb-5 mt-2">
        <Cards
          title={"Total Sales"}
          count={`${totalSales} MMK`}
          icon={BanknotesIcon}
          note={"MMK"}
        />
        <Cards
          title={"Total Products"}
          count={products.length}
          icon={ShoppingCartIcon}
          note={"Products"}
        />
        <Cards
          title={"Active Users"}
          count={usersCount}
          icon={UserGroupIcon}
          note={"Users"}
        />
      </div>
      <div className="flex-1 min-w-[300px] min-h-[300px] h-full">
        <ArenaCharts products={products} />
      </div>
      <BarLists products={products} />
    </section>
  );
};

Dashboard.propTypes = {
  products: PropTypes.any.isRequired,
  users: PropTypes.any.isRequired,
};

export default Dashboard;
