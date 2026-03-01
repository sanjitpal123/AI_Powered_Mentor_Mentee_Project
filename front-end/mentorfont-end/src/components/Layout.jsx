import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
  const location = useLocation();
  const hiddenpaths = ["/login", "/register"];
  const HeaderLoad = hiddenpaths.includes(location.pathname);
  return (
    <>
      {!HeaderLoad && <Header />}
      <Outlet />
      {!HeaderLoad && <Footer />}
    </>
  );
}
