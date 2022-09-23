import ConnectWallet from "./shared/connectwallet";

const Topbar = () => {
  return (
    <div className="w-full">
      <div className="w-[85vw] mx-auto flex justify-between">
        <div>DCENT</div>
        <div><ConnectWallet/></div>
      </div>
    </div>
  );
};

export default Topbar;
