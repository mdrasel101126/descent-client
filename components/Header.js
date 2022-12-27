import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AuthContext } from "./UserContext/UserContext";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const router = useRouter();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        router.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const items = (
    <>
      <li>
        <Link className="font-bold" href="/">
          Home
        </Link>
      </li>
      {
        <li>
          <Link className="font-bold" href="/">
            Dashboard
          </Link>
        </li>
      }
      <li>
        <Link className="font-bold" href="/">
          Blog
        </Link>
      </li>
      <>
        {user?.uid ? (
          <>
            <li>
              <button
                onClick={handleLogOut}
                className="btn btn-info  rounded-3xl"
              >
                Log out
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link className="font-bold" href="/login">
              Login
            </Link>
          </li>
        )}
      </>
    </>
  );
  return (
    <div className="navbar flex justify-between bg-primary text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
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
            tabIndex={1}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-primary rounded-box w-52"
          >
            {items}
          </ul>
        </div>
        <>
          <Link href="/">
            <img
              className="w-16 h-16 hidden sm:block rounded-full"
              src="/Images/logo.png"
              alt=""
            />
          </Link>
          <Link href="/" className="text-xl font-bold ml-2 text-white  ">
            DESCENT
          </Link>
        </>
      </div>
      <div className="navbar-center ml-0 hidden lg:flex px-5">
        <ul className="menu menu-horizontal">{items}</ul>
      </div>
    </div>
  );
};

export default Header;
