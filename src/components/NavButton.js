import { Link } from "react-router-dom";
import Button from "./styledComponents/Button";

const NavButton = ({ link, children }) => (
  <Link to={link}>
    <Button>{children}</Button>
  </Link>
);

export default NavButton;
