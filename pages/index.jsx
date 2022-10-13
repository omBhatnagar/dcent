import obiwan from "../public/static/star-wars-obi-wan-kenobi.gif";
import Image from "next/image";
export default function Home() {
  return (
    <div className="flex flex-col item-center">
      <Image
        src="/static/hero-img.gif"
        alt="obiwan"
        width="200px"
        height="720px"
      />
    </div>
  );
}
