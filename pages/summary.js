import { ProductSummary } from '../components/ProductSummary';
import { useCoffeShop } from '../hooks/useCoffeShop';
import Layout from '../layouts/Layout';
import Link from 'next/link';  
import { AiOutlineCheckCircle } from "react-icons/ai";


export default function Summary ( ) {

  const { order } = useCoffeShop();

  return (
    <Layout title='Resumen'>
        <h1 className='text-4xl mt-10'> Resumen </h1>
        <p className='text-2xl my-9'> Revisa tu pedido </p>

        {
            order.length === 0 ? (
              <p className='text-center'> No hay elementos en tu pedido </p>
            ) : (
              order.map( product => (
                <ProductSummary
                  key={ product.id }
                  product={ product }
                />
              ))
            )
        }

        {
          order.length >= 1 ? (
            <div className='flex justify-end mt-10 '>
              <Link href='/total'> 
                <a className='px-5 py-2 rounded-lg shadow-md text-xl bg-[#00704a] text-white'>
                  Confirmar pedido  
                  <span className='inline-block'> <AiOutlineCheckCircle/> </span>
                </a> 
              </Link>
            </div>
          ) : null
        }

        

    </Layout>
  )
}
