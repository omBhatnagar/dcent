import cx from "classnames";
import { useState } from "react";
import Sidebar from "./sidebar";
import Topbar from "./topbar";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex w-full">
      <div
        className={cx(
          {
            "translate-x-0 w-3/5 lg:w-1/5": isSidebarOpen === true,
            "-translate-x-full w-0": isSidebarOpen === false,
          },
          "fixed h-full z-10"
        )}
      >
        <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
      </div>
      <div
        className={cx(
          {
            "w-4/5 ml-1/5": isSidebarOpen === true,
            "w-full ml-0": isSidebarOpen === false,
          },
          "h-full min-h-screen bg-background-light"
        )}
      >
        <Topbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className="w-full mx-auto">
          <div className="mx-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
