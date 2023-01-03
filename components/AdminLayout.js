import Link from "next/link";
import { useContext } from "react";
import Layout from "./Layout";
import { AuthContext } from "./UserContext/UserContext";

const AdminLayout = ({ children }) => {
  const { user } = useContext(AuthContext);
  return (
    <Layout>
      <div>
        <div className="drawer h-auto  drawer-mobile">
          <input
            id="dashboard-drawer"
            type="checkbox"
            className="drawer-toggle"
          />
          <div className="drawer-content">
            <div className="text-end lg:hidden">
              <label
                htmlFor="dashboard-drawer"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            {children}
          </div>
          <div className="drawer-side">
            <label
              htmlFor="dashboard-drawer"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 bg-base-100 text-base-content">
              {
                <>
                  <li className="mb-4">
                    <Link
                      href="/admin/admin-role/allusers"
                      className="btn btn-primary bg-gradient-to-r from-primary  to-secondary w-full text-white"
                    >
                      All Users
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      href="/admin/admin-role/addproduct"
                      className="btn btn-primary bg-gradient-to-r from-primary to-secondary w-full text-white"
                    >
                      Add Products
                    </Link>
                  </li>

                  <li className="mb-4">
                    <Link
                      href=""
                      className="btn btn-primary bg-gradient-to-r from-primary  to-secondary w-full text-white"
                    >
                      Reported Itmes
                    </Link>
                  </li>
                </>
              }
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminLayout;
