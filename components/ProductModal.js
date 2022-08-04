import Image from 'next/image';
import { useCoffeShop } from '../hooks/useCoffeShop';
import { Product } from './Product';
import { CurrencyFormat } from '../helpers/index';
import { AiOutlineCloseCircle, AiOutlineMinusCircle, AiOutlinePlusCircle, AiOutlineShoppingCart } from "react-icons/ai";
import { useState, useEffect } from 'react';


export function ProductModal () {

    const { product, handleChangeModal, handleAddToOrder, order } = useCoffeShop();
    const { name, price, image } = product;


    const [ quantity, setQuantity ] = useState(1);
    const [ edition, setEdition ]   = useState(false);

    useEffect( () => {
        // Comprueba si el modal con el product actual ya esta en el pedido
        if ( order.some( ord => ord.id === product.id ) ) {

            const editionProduct = order.find( ord => ord.id === product.id );

            setEdition(true);
            setQuantity( editionProduct.quantity );
        }

    }, [product, order]);
    
    return (
        <div className="md:flex gap-10">

            <div className="md:w-1/3">
                <Image  src={`/assets/img/${image}.jpg`}
                        width={300}
                        height={400}
                        alt={ name }
                        className='rounded-2xl'/>
            </div>

            <div className="md:w-2/3">

                <div className='flex justify-end'>
                    <button className='text-2xl hover:text-red-600'
                            onClick={ handleChangeModal }>
                        <AiOutlineCloseCircle/>
                    </button>
                </div>

                <div>
                    <h1 className='text-2xl font-bold mt-5'> { name } </h1>
                    <p className='mt-5 text-[#00704a] font-black text-4xl'> { CurrencyFormat(price) } </p>
                </div>

                <div className='mt-10 flex gap-4'>
                    <button className='text-2xl'
                            type='button'
                            onClick={ () => {
                                if (quantity <= 1) return;
                                setQuantity( quantity - 1)
                            }}>
                        <AiOutlineMinusCircle/>
                    </button>

                    <p className='text-3xl'> { quantity } </p>

                    <button className='text-2xl'
                            type='button'
                            onClick={ () => {
                                if (quantity >= 10) return;
                                setQuantity( quantity + 1)
                            }}>
                        <AiOutlinePlusCircle/>
                    </button>
                </div>

                <button type='button'
                        className='bg-[#001e1d] text-white px-5 py-2 mt-5 font-bold uppercase rounded-lg'
                        onClick={ () => handleAddToOrder({ ...product, quantity }) }>
                    { edition ? 'Actualizar pedido' : 'Añadir al pedido'} 
                        <span className='inline-block'> <AiOutlineShoppingCart/> </span>
                </button>

            </div>

        </div>
    )
}