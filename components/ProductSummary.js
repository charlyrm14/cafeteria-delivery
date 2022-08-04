import Image from 'next/image';
import { CurrencyFormat } from '../helpers/index';
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useCoffeShop } from '../hooks/useCoffeShop';
 
export function ProductSummary ( { product } ) {

    const { handleEditQuantities, handleDeleteProduct } = useCoffeShop();

    const { id, name, price, image, quantity } = product;

    return (
        <div className="shadow-lg p-5 mb-3 flex gap-10 items-center rounded-2xl">
            <div className="md:w-1/6">
                <Image
                    src={`/assets/img/${image}.jpg`}
                    width={150}
                    height={200}
                    alt={ name }
                    className='rounded-2xl'
                />
                
            </div>
            <div className="md:w-3/6">
                <p className='text-2xl mt-2'> { name } </p>
                <p className='text-base mt-2'> Cantidad: { quantity } </p>
                <p className='mt-3 text-base'> Precio: { CurrencyFormat( price ) } </p>
                <p className='mt-3 text-2xl text-[#00704a] font-black'>
                    Subtotal: { CurrencyFormat( quantity * price ) } 
                </p>
            </div>

            <div className='flex gap-4 justify-between'>
                <button type='button'
                        className='flex px-5 py-2 rounded-lg shadow-md w-full text-xl bg-sky-600 text-white hover:bg-sky-800'
                        onClick={ () => handleEditQuantities( id ) }> 
                    <AiOutlineEdit/> 
                </button>
                <button type='button'
                        className='flex p-2 rounded-lg shadow-md w-full text-xl border border-red-500 hover:bg-red-500 hover:text-white'
                        onClick={ () => handleDeleteProduct( id ) }> 
                    <AiOutlineDelete/> 
                </button>
            </div>

        </div>
    )
}