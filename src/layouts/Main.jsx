import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <section className="max-w-7xl mx-auto h-screen">
      <Nav />
      <Outlet />
    </section>
  );
};

export default Main;
