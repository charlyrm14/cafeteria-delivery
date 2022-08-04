import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import Modal from 'react-modal';
import { Steps } from '../components/Steps';
import { useCoffeShop } from '../hooks/useCoffeShop';
import { ProductModal } from '../components/ProductModal';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px'
    },
};

Modal.setAppElement('#__next');


export default function Layout ( { children, title  } ) {

    const { modal } = useCoffeShop();

    return (
        <>
            <Head>
                <title> Grand Coffe | { title } </title>
                <meta name='description' content='Cafetería'/>
            </Head>

            <div className='md:flex'>

                <aside className='md:w-4/12 xl:w-1/4 2xl:w-1/5'>
                    <Sidebar/>
                </aside>

                <main className='md:8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll'>
                    <div className='p-10'>
                        <Steps/>
                        { children }
                    </div>    
                </main>

            </div>

            {
                modal && (
                    <Modal
                        isOpen={ modal }
                        style={ customStyles }
                    > 
                        <ProductModal/>
                    </Modal>
                )
            }

            <ToastContainer/>

        </>
    )
}
