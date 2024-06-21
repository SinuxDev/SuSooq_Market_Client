import PropTypes from "prop-types";
import Cards from "../../components/Dashboard/Cards";
import {
  BanknotesIcon,
  UserGroupIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import ArenaCharts from "../../components/Dashboard/ArenaCharts";

const Dashboard = ({ products }) => {
  return (
    <section>
      <div className="flex items-center gap-6 mb-5">
        <Cards
          title={"Total Sales"}
          count={"35000 MMK"}
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
          count={"200"}
          icon={UserGroupIcon}
          note={"Users"}
        />
      </div>
      <ArenaCharts />
    </section>
  );
};

Dashboard.propTypes = {
  products: PropTypes.array.isRequired,
};

export default Dashboard;
