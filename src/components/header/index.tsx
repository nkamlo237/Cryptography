import logo from "../../assets/logo-removebg-preview.png";

const Header = () => {
  return (
    <div className="w-full flex justify-center items-center fixed text-red-600 font-bold">
      <img src={logo} alt="Logo" className="w-30 h-auto md:w-auto md:h-auto" />
    </div>
  );
};

export default Header;
