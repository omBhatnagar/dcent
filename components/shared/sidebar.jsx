import { SidebarItems } from "../../utils/sidebar-items";
import SidebarItem from "./sidebar-item";

const Sidebar = () => {
	return (
		<div className='w-full h-screen bg-background-dark border-r border-solid border-gray-300 overflow-y-auto'>
			<div className='mx-auto my-8 w-20'>
				{/* <img className="w-full" src={Logo} alt="logo" /> */}
				<p>DCent</p>
			</div>
			<div className='flex flex-col h-full overflow-y'>
				{SidebarItems.map(({ title, icon, path }) => (
					<SidebarItem key={title} title={title} icon={icon} path={path} />
				))}
			</div>
		</div>
	);
};

export default Sidebar;
