import React from "react";
import NavLink from "./NavLink";
import Login from "./Login";
import Image from "next/image";

function Header() {
  return (
    <header className="navbar container">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <NavLink href="/quests">Explore Quests</NavLink>
            </li>
            <li tabIndex={0}>
              <NavLink href={"/quests/new"}>Create A Quest</NavLink>
            </li>
            <li>
              <NavLink href={"/about"}>About</NavLink>
            </li>
          </ul>
        </div>
        <NavLink
          className="btn btn-ghost hover:bg-transparent normal-case text-xl"
          href="/"
        >
          <Image
            src="/logo.png"
            alt="Seends On Earth Logo"
            width={50}
            height={50}
          />
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <NavLink href="/quests">Explore Quests</NavLink>
          </li>
          <li>
            <NavLink href="/quests/new">Create A Quest</NavLink>
          </li>
          <li tabIndex={0}>
            <NavLink href={"/about"}>About</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Login />
      </div>
    </header>
  );
}

export default Header;
