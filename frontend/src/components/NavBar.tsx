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
      <a className="menu-item" href="../pages/Classic.tsx">
        Classic Mode
      </a>
      <a className="menu-item" href="../pages/Timed.tsx">
        Timed Mode
      </a>
      <a className="menu-item user-border user-section" href="../pages/Login.tsx">
        Log In
      </a>
      <a className="menu-item user-section" href="../pages/Signup.tsx">
        Sign Up
      </a>
    </Menu>
  );
};
