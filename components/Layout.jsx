import Sidebar from "./shared/sidebar";
import Topbar from "./Topbar";

const Layout = ({ children }) => {
  return (
    <div className="flex w-full">
      <div className="fixed w-1/5">
        <Sidebar />
      </div>
      <div className="w-4/5 ml-1/5 h-full min-h-screen bg-background-light">
        <Topbar />
        <div className="w-full mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
