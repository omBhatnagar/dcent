const SidebarItem = ({ icon, title, path }) => {
  return (
    <div
      //   onClick={() => navigate(path)}
      className="text-lg flex items-center text-text hover:text-white pl-6 py-3 hover:bg-background-darker cursor-pointer"
    >
      <div className="mr-2">{icon}</div>
      <div>{title}</div>
    </div>
  );
};

export default SidebarItem;
