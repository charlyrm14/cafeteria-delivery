import Head from 'next/head';
import Image from 'next/image';
import Layout from '../layouts/Layout';
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useEffect, useCallback } from 'react';
import { useCoffeShop } from '../hooks/useCoffeShop';
import { CurrencyFormat } from '../helpers/index';



export default function Total ( ) {

  const { order, name, setName, handleFinishOrder, total } = useCoffeShop();

  const checkOrder = useCallback( () => {
    return order.length === 0 || name === '' || name.length < 4;
  }, [ order, name ])

  useEffect( () => {
    checkOrder();
  }, [order, checkOrder]);


  return (
    <Layout title='Total'>
        <h1 className='text-4xl mt-10'> Total </h1>
        <p className='text-2xl my-9'> Confirma tu pedido añadiendo tu nombre</p>

        <div className=''>

          <form onSubmit={ handleFinishOrder }>
            <div>
              <label className='block uppercase text-xl'> Nombre </label>
              <input
                name='name' 
                type='text'
                className='bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-lg'
                placeholder='Nombre completo'
                value={ name }
                onChange={ e => setName( e. target.value ) }
              />
            </div>

            <div className='mt-10'>
              <p className='mt-3 text-xl'>
                Total a pagar: 
                  <span className='text-[#00704a] font-bold'> { CurrencyFormat(total) } </span>
              </p>
            </div>

            <div className='mt-5'>
              <button className={`${ checkOrder() ? 'bg-gray-200' : 'bg-[#00704a]' } w-full lg:w-auto px-5 py-2 rounded uppercase text-white`}
                      type='submit'
                      disabled={ checkOrder() }>
                Confirmar pedido  <span className='inline-block'> <AiOutlineCheckCircle/> </span>
              </button>
            </div>

          </form>

        </div>


    </Layout>
  )
}
