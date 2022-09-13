import Topbar from "./Topbar";

const Layout = ({ children }) => {
  return (
    <div className="w-full">
      <Topbar />
      <div className="w-[85vw] mx-auto">{children}</div>
    </div>
  );
};

export default Layout;
