import Head from 'next/head';
import Image from 'next/image';
import Layout from '../layouts/Layout';
import { Product } from '../components/Product';
import { useCoffeShop } from '../hooks/useCoffeShop';
import { AiOutlineShopping } from "react-icons/ai";

export default function Home ( ) {

  const { currentCategory } = useCoffeShop();

  return (
    <Layout title={`Menú ${ currentCategory?.name }`}>

        <h1 className='text-4xl mt-10'> { currentCategory?.name } </h1>

        <p className='text-xl my-9'>
        <span className='inline-block'> <AiOutlineShopping/> </span> Agrega productos a tu pedido 
        </p>

        <div className='grid gap-4 grid-cols-2 xl:grid-cols-3 md:grid-cols-2 2xl:grid-cols-4'>

          { 
            currentCategory?.products?.map( product => (
                <Product key={ product.id } product={ product }/>
            )) 
          }

        </div>

    </Layout>
  )
}
