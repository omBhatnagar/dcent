import ConnectButton from "./shared/connectbutton";

const Topbar = () => {
  return (
    <div className="w-full">
      <div className="w-[85vw] mx-auto flex justify-between">
        <div>DCENT</div>
        <div><ConnectButton/></div>
      </div>
    </div>
  );
};

export default Topbar;
