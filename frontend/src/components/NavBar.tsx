/*
Code modified from https://github.com/Rinasham/sidebar-TypeScript-React/tree/main/
*/

import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import "./NavBar.css";

type navBarProps = {
  pageWrapId: string;
  outerContainerId: string;
};

export const NavBar = ({ pageWrapId, outerContainerId }: navBarProps) => {
  return (
    <Menu>
      <Link className="text-black text-xl font-bold hover:text-green-600 mb-8 transition-all" to={"/"}>Classic</Link>
      <Link className="text-black text-xl font-bold hover:text-green-600 mb-8 transition-all" to={"/timed"}>Timed Mode</Link>
      <Link className="text-black text-xl font-bold hover:text-green-600 transition-all" to={"/stats"}>Player Stats</Link>

      <Link className="menu-item user-border user-section" to={"/login"}>Login</Link>
      <Link className="menu-item user-section" to={"/sign-up"}>Sign up</Link>
    </Menu>
  );
};
