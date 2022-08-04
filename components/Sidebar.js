import Image from 'next/image';
import { useCoffeShop } from '../hooks/useCoffeShop';
import Category from './Category';


export default function Sidebar ( ) {

    const { categories } = useCoffeShop();

  return (
    <>
        <div className='flex justify-center'>
            <Image  src='/assets/img/coffe_logo.png' 
                    alt='Logo' 
                    width={150} 
                    height={150} 
                    className='m-0' 
                    layout='fixed'/>
        </div>

        <nav className='mt-7'>
            {
                categories.map( category => (
                    <Category   key={ category.id }
                                category={ category }/>
                ))
            }
        </nav>
    </>
  )
}
