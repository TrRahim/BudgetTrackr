// rrd imports
import { Outlet, useLoaderData } from "react-router-dom";

// helper function
import { fetchData } from "../helper";

// assets
import wave from "../assets/wave.svg";
import Nav from "../components/Nav";

// loader
export function mainLoader() {
  const userName = fetchData("userName");
  return { userName };
}

export default function Main() {
  const { userName } = useLoaderData();
  return (
    <div className="layout">
      <Nav userName={userName} />
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="" />
    </div>
  );
}
