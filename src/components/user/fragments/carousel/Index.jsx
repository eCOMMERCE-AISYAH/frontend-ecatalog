import { getAppUrl } from '../../../../../config/app';
import { useState } from 'react';
import logo from '/logo.png';

const Carousel = ({ images }) => {
	const [selectedImage, setSelectedImage] = useState(0);

	if (!images) {
		return <p>Loading...</p>;
	}

	function handleImage(index) {
		setSelectedImage(index);
	}

	return (
		<>
			<div className="w-full">
				<img
					src={
						images.length > 0
							? getAppUrl() + images[selectedImage].image
							: logo
					}
					alt=""
					className="w-full object-cover"
				/>
			</div>
			<div className="w-full inline-flex justify-center gap-3 mt-3">
				{images.length > 0 &&
					images.map((image, index) => (
						<img
							key={index}
							src={getAppUrl() + image.image}
							alt=""
							className={`w-1/4 object-cover ${
								selectedImage === index
									? 'border-2 border-green-500 opacity-100'
									: 'opacity-60'
							}`}
							onClick={() => handleImage(index)}
						/>
					))}
			</div>
		</>
	);
};

export default Carousel;
