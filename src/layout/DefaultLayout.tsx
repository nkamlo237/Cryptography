import { Outlet } from "react-router-dom";
import Navbar from "../components/footer";
import Header from "../components/header";

const DefaultLayout = () => {
  return (
    <div className="bg-black h-screen flex flex-col w-full items-center">
      <Header />
      <main className="w-full h-full text-lg mt-20 flex flex-col items-center justify-center">
        <Outlet />
      </main>
      <div className="fixed bottom-2 lg:bottom-20">
        <Navbar />
      </div>
    </div>
  );
};

export default DefaultLayout;
