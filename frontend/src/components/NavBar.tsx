/*
Code modified from https://github.com/Rinasham/sidebar-TypeScript-React/tree/main/
*/

import { slide as Menu } from "react-burger-menu";
import "./NavBar.css";

type navBarProps = {
  pageWrapId: string;
  outerContainerId: string;
};

export const NavBar = ({ pageWrapId, outerContainerId }: navBarProps) => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/">
        Classic Mode
      </a>
      <a className="menu-item" href="/">
        Timed Mode
      </a>
      <a className="menu-item user user-section" href="/">
        User
      </a>
      <a className="menu-item user-section" href="/">
        Log In
      </a>
      <a className="menu-item user-section" href="/">
        Sign Up
      </a>
    </Menu>
  );
};
