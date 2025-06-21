import HeaderImg from "./../assets/logo.svg";
import classes from "./Header.module.css";
export default function Header() {
  return <img className={classes.header} src={HeaderImg} alt="Main Logo" />;
}
