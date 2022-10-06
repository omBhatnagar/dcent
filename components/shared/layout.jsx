import Sidebar from "./sidebar";
import Topbar from "./topbar";

const Layout = ({ children }) => {
  return (
    <div className="flex w-full">
      <div className="fixed w-0 lg:w-1/5">
        <Sidebar />
      </div>
      <div className="w-full lg:w-4/5 lg:ml-1/5 h-full min-h-screen bg-background-light">
        <Topbar />
        <div className="w-full mx-auto">
          <div className="mx-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
