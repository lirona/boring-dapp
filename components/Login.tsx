import React from "react";
import { useAppState } from "../context/AppStateProvider";
import NavLink from "./NavLink";

const Login = () => {
  const { provider, login, logout, user } = useAppState();

  const loggedInView = (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn flex gap-1">
        <span className="w-16 md:w-32 truncate">{user?.address}</span>
        <i className="ri-arrow-down-s-line text-lg"></i>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <NavLink href={"/quests/my-quests"}>My Quests</NavLink>
        </li>
        <li>
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
    </div>
  );

  const unloggedInView = (
    <button onClick={login} className="btn flex ">
      Sign in
    </button>
  );

  return provider ? loggedInView : unloggedInView;
};

export default Login;
