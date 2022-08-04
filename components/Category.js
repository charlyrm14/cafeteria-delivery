import Image from 'next/image';
import { useCoffeShop } from '../hooks/useCoffeShop';


export default function Category ( { category } ) {

    const { currentCategory, handleClickCategory } = useCoffeShop();

    const { id, name, icon } = category;

    return (
        <div className={`${ currentCategory?.id === category.id ? 'bg-gray-300' : '' } 
                        flex items-center gap-3 w-full border-2 border-transparent border-b-[#eff0f3] p-5 
                        hover:bg-[#eff0f3] hover:cursor-pointer`}>   
            <Image  src={`/assets/img/icon_${icon}.png`}
                    alt={ name }
                    width={60}
                    height={60}
                    priority='true'/>
            
            <button type='button'
                    className='text-2xl font-bold'
                    onClick={ () => handleClickCategory( category.id ) }>
                { name }
            </button>
        </div>
    )
}
