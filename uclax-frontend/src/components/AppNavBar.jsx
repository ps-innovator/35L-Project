import { useState, useContext } from "react";
import "../App.css";
import { AuthContext, TabContext } from "../App.jsx";

const NavBarButton = ({ title, buttonId, ...props }) => {
  const { tab, setTab } = useContext(TabContext);

  let buttonStyle =
    "block py-2 px-3 bg-gray-100 dark:bg-slate-800 rounded md:bg-gray-100 text-blue-700 dark:text-neutral-400 md:p-0";
  if (tab == buttonId) {
    buttonStyle =
      "block py-2 px-3 bg-gray-200 dark:bg-slate-800 rounded md:bg-gray-100 text-purple-700 dark:text-neutral-50 md:p-0";
  }

  return (
    <li>
      <button className={buttonStyle} aria-current="page" {...props}>
        {title}
      </button>
    </li>
  );
};

const AppNavBar = () => {
  /*
    Nav bar documentation for Tailwind: https://flowbite.com/docs/components/navbar/
    */
  const { auth, setAuth } = useContext(AuthContext);
  const { tab, setTab } = useContext(TabContext);

  const handleTabSwitch = (tabNo, title) => {
    return async () => {
      if (title == "Logout") {
        const res = await fetch('http://localhost:3000/auth/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({})
        });
        setAuth(null);
        setTab(0);
        //TODO: Log out
      } else {
        setTab(tabNo);
      }
    };
  };

  let navbartitles = ["Log in", "Sign up", "About us"];

  if (auth) {
    navbartitles = ["Find a ride", "Post a ride", "Account info", "Logout"];
  }

  return (
    <nav className="flex flex-wrap items-center justify-between mx-auto p-4 bg-gray-100 dark:bg-slate-800 rounded-lg">
      <button
        className="flex items-center space-x-3 rtl:space-x-reverse md:bg-transparent"
        onClick={handleTabSwitch(0, "UCLAX")}
      >
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          UCLAX
        </span>
      </button>
      {/*small screens*/}
      <div
        className="w-full md:hidden mt-4 rounded-lg bg-gray-0"
        id="navbar-default"
      >
        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg bg-gray-0 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-gray-100 dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700">
          {navbartitles.map((title, index) => (
            <NavBarButton
              title={title}
              key={index + 1}
              buttonId={index + 1}
              onClick={handleTabSwitch(index + 1, title)}
            />
          ))}
        </ul>
      </div>

      {/* medium/large screens */}
      <div className="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-0 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-gray-100 dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700">
          {navbartitles.map((title, index) => (
            <NavBarButton
              title={title}
              key={index + 1}
              buttonId={index + 1}
              onClick={handleTabSwitch(index + 1, title)}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default AppNavBar;
