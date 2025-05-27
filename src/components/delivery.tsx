import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';


import Api from '../service/api';
import type { Address, ApiError } from '../types';

const Delivery: React.FC = () => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm<{ cep: string }>();
    const [address, setAddress] = useState<Address | ApiError | null>(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: { cep: string }) => {
        setLoading(true);
        try {
            const response = await Api.getAddress(data.cep);
            if ('error' in response) {
                setAddress({ error: true, message: response.message });
            } else {
                setAddress(response);
            }
        } catch {
            setAddress({ error: true, message: 'Erro ao buscar o CEP' });
        } finally {
            setLoading(false);
            reset();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 w-full">
            <label>Consultar Frete (CEP):</label>

            <Controller
                name="cep"
                control={control}
                defaultValue=""
                rules={{
                    required: 'O CEP é obrigatório',
                    pattern: {
                        value: /^[0-9]{5}-?[0-9]{3}$/,
                        message: 'CEP inválido. Exemplo: 12345-678',
                    }
                }}
                render={({ field }) => (
                    <input
                        {...field}
                        placeholder="Digite o CEP"
                        className={`border p-1 rounded w-full ${errors.cep ? 'border-red-500' : ''}`}
                    />
                )}
            />

            {errors.cep && (
                <p className="text-red-500 text-sm">{errors.cep.message}</p>
            )}

            <button
                type="submit"
                className="cursor-pointer bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                disabled={loading}
            >
                {loading ? 'Buscando...' : 'Buscar Endereço'}
            </button>

            {address && 'error' in address ? (
                <p className="text-red-500">{address.message}</p>
            ) : address ? (
                <div className="text-sm text-white-700">
                    <p>{address.logradouro}, {address.bairro}</p>
                    <p>{address.localidade} - {address.uf}</p>
                </div>
            ) : null}
        </form>
    );
};

export default Delivery;
