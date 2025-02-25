import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="header-navigation">
      <Link to="/">Products page</Link>
      <Link to="/addNewProduct">Add new product</Link>
    </nav>
  );
};

export default Header;
