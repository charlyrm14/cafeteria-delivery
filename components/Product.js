import Image from 'next/image';
import { CurrencyFormat } from '../helpers/index';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCoffeShop } from '../hooks/useCoffeShop';


export function Product ( { product } ) {

    const { handleSetProduct, handleChangeModal }   = useCoffeShop();

    const { id, name, price, image } = product;
    
    return (
        <div className="p-3">
            <Image  src={`/assets/img/${image}.jpg`}
                    alt={ name }
                    width={300}
                    height={400}
                    className='rounded-2xl'
            />

            <div className='p-2'>
                <h3 className='text-base'> { name } </h3>
                <p className='mt-3 text-2xl text-[#00704a] font-black'> { CurrencyFormat( price ) } </p>
                <button type='button'
                        className='bg-[#001e1d] text-[#e8e4e6] w-full mt-5 p-2 uppercase font-bold rounded-lg cursor-default hover:bg-[#00704a]'
                        onClick={ () => {
                            handleSetProduct( product );
                            handleChangeModal();
                        }}>
                    Añadir <span className='inline-block'> <AiOutlineShoppingCart/> </span>
                </button>
            </div>
        </div>
    )
}