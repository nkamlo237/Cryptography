import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [path, setPath] = useState<string>("");

  return (
    <div className="w-full flex justify-center items-center gap-y-2 text-lg uppercase text-red-500 gap-x-10">
      <Link
        to={"/Cryptography"}
        onClick={() => setPath("/Cryptography")}
        className={`inline-block cursor-pointer ${
          path === "/Cryptography" ? "border-b-2 border-red-500" : ""
        }`}
      >
        Fresneil
      </Link>
      <Link
        to={"/Cryptography/rsa"}
        onClick={() => setPath("/Cryptography/rsa")}
        className={`cursor-pointer ${
          path === "/Cryptography/rsa" ? "border-b-2 border-red-500" : ""
        }`}
      >
        RSA
      </Link>
    </div>
  );
};

export default Navbar;
