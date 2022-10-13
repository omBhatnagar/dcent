import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { SidebarItems } from "../../utils/sidebar-items";
import SidebarItem from "./sidebar-item";

const Sidebar = ({ setIsSidebarOpen }) => {
  return (
    <div className="w-full h-screen bg-background-dark border-r border-solid border-gray-300 overflow-y-auto relative">
      <div
        className="block lg:hidden text-white absolute right-4 top-4 cursor-pointer"
        onClick={() => setIsSidebarOpen(false)}
      >
        <AiOutlineClose />
      </div>
      <div className="mx-auto my-8 max-w-max">
        {/* <img className="w-full" src={Logo} alt="logo" /> */}
        <Image
          className="mx-auto"
          src="/static/logo-rect-2.png"
          alt="dcent logo"
          width="190px"
          height="60px"
        />
      </div>
      <div className="flex flex-col h-full overflow-y">
        {SidebarItems.map(({ title, icon, path }) => (
          <SidebarItem key={title} title={title} icon={icon} path={path} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
