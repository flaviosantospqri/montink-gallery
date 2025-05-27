import React from 'react';
import useProductStore, { type Tamanho } from '../store/product';

const InfoProduct: React.FC = () => {
    const {
        nome,
        preco,
        informacao,
        variantes: { tamanhos, cores },
        selectedSize,
        selectedColor,
        setSelectedSize,
        setSelectedColor,
    } = useProductStore();

    const isSizeDisabled = (size: Tamanho) => size.quantidade === 0;

    return (
        <div className="w-full md:flex-1 space-y-4">
            <h1 className="text-2xl font-bold">{nome}</h1>
            <p className="text-3xl font-bold text-green-600">R$ {preco?.toFixed(2)}</p>
            <p>{informacao}</p>

            <div className="space-y-4">
                <div>
                    <label className="block mb-1 font-semibold">Tamanho:</label>
                    <div className="flex gap-2 flex-wrap">
                        {tamanhos.map((size, index) => {
                            const disabled = isSizeDisabled(size);
                            const selected = selectedSize?.tamanho === size.tamanho;
                            return (
                                <button
                                    key={index}
                                    onClick={() => !disabled && setSelectedSize(size)}
                                    disabled={disabled}
                                    className={`border rounded px-3 py-2 text-sm ${selected ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
                                        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-500'} transition`}
                                >
                                    {size.tamanho}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Cor:</label>
                    <div className="flex gap-2 flex-wrap">
                        {cores.map((color, index) => {
                            const selected = selectedColor === color;
                            return (
                                <button
                                    key={index}
                                    onClick={() => setSelectedColor(color)}
                                    className={`border rounded px-3 py-2 text-sm ${selected ? 'border-red-500 bg-red-100' : 'border-gray-300 hover:border-red-500'} transition`}
                                >
                                    {color}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoProduct;