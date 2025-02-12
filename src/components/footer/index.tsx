import { Link, useLocation } from "react-router-dom";

const Navbar = () => {

  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="w-full flex justify-center items-center gap-y-2 text-lg uppercase text-red-500 gap-x-10">
      <Link
        to={"/Cryptography/"}
        className={`inline-block cursor-pointer ${
          pathname === "/Cryptography/" ? "border-b-2 border-red-500" : ""
        }`}
      >
        Home
      </Link>
      <Link
        to={"/Cryptography/rsa"}
        className={`cursor-pointer ${
          pathname === "/Cryptography/rsa" ? "border-b-2 border-red-500" : ""
        }`}
      >
        RSA
      </Link>
    </div>
  );
};

export default Navbar;
