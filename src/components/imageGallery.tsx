import React from 'react';
import useProductStore from '../store/product';

const ImageGallery: React.FC = () => {
    const { listImage, mainImage, setMainImage } = useProductStore();

    if (!listImage || listImage.length === 0) {
        return <div>Nenhuma imagem disponível</div>;
    }

    return (
        <div className="flex flex-col gap-4 items-center">
            {mainImage ? (
                <div className="border rounded w-full md:w-[35vw] max-w-md h-[400px] overflow-hidden bg-white flex justify-center items-center">
                    <img
                        src={mainImage}
                        alt="Imagem principal do produto"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/400?text=No+Image';
                        }}
                    />
                </div>
            ) : (
                <div className="flex items-center justify-center border rounded w-full md:w-[35vw] max-w-md h-[400px] bg-gray-100 text-gray-400">
                    Sem imagem principal
                </div>
            )}

            <div className="flex gap-2 overflow-x-auto w-full max-w-md">
                {listImage.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => setMainImage(img)}
                        className={`border rounded overflow-hidden focus:outline-none ${img === mainImage ? 'border-blue-500' : 'border-gray-300 hover:border-blue-300'
                            }`}
                        aria-label={`Selecionar imagem ${index + 1}`}
                    >
                        <img
                            src={img || undefined}
                            alt={`Imagem ${index + 1}`}
                            className="h-16 w-16 object-cover"
                            onError={(e) => {
                                e.currentTarget.src = 'https://via.placeholder.com/64?text=No+Img';
                            }}
                        />
                    </button>
                ))}
            </div>
        </div>
    );


};

export default ImageGallery;