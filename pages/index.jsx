import obiwan from '../public/static/star-wars-obi-wan-kenobi.gif'
import Image from 'next/image';
export default function Home() {
  return (
    <div className='flex flex-col item-center'>
    <div className="text-cyan-700 text-6xl text-center w-full">Hello There</div>
    <Image src={obiwan} alt="obiwan" width={300} height={500}/>
    </div>
  );
}
