import ConnectWalletModal from "../connectwalletmodal";
import { useState } from "react";
import TestConnectWallet from "../testconnectwallet";

const ConnectWallet = () => {

  const [user, setUser] = useState("");
  
  return (
    <div>
     <TestConnectWallet user={user} setUser={setUser}/>
    </div>
  )

}

// export async function getServerSideProps (context) {
//   const session = await getSession(context);

//   console.log("session", session);

//   if(!session){
//     return{
//       props: {error: "Connect Your wallet"}
//     }
//   }

//   return{
//     props: {user: session?.user}
//   }
// }

export default ConnectWallet