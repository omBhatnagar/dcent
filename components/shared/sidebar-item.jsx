import Link from "next/link";

const SidebarItem = ({ icon, title, path }) => {
  return (
    <Link href={path}>
      <div className="text-lg flex items-center text-text hover:text-white pl-6 py-3 hover:bg-background-darker cursor-pointer">
        <div className="mr-2">{icon}</div>
        <div>{title}</div>
      </div>
    </Link>
  );
};

export default SidebarItem;
