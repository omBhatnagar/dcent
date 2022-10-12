import { useState } from 'react';

const NftCard = ({ name, description, image }) => {

	const [imgSrc, setImgSrc] = useState(image);

	

	return (
		<div className='max-w-sm rounded-lg border shadow-md bg-gray-800 border-gray-700'>
			<img className='rounded-t-lg w-full h-full' src={imgSrc} alt='nft-image' onError={() => {
                setImgSrc('/gigachad.jpg');
            }} />
			<div className='p-5'>
				<h5 className='mb-2 text-2xl font-bold tracking-tight text-white'>
					{name}
				</h5>
				<p className='mb-3 font-normal text-gray-400'>{description}</p>
				<a
					href='javascript:void(0)'
					className='inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none  bg-blue-700 focus:ring-blue-800'
				>
					Read more
					<svg
						aria-hidden='true'
						className='ml-2 -mr-1 w-4 h-4'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							fillRule='evenodd'
							d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
							clipRule='evenodd'
						></path>
					</svg>
				</a>
			</div>
		</div>
	);
};

export default NftCard;
