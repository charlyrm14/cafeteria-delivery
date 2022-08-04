import { useState, useEffect, createContext } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const CoffeShopContext  = createContext();

const CoffeShopProvider = ( { children } ) => {

    const [ categories, setCategories ]             = useState([]);
    const [ currentCategory, setCurrentCategory ]   = useState({});
    const [ product, setProduct ]                   = useState({});
    const [ modal, setModal ]                       = useState(false);
    const [ order, setOrder ]                       = useState([]);
    const [ name, setName ]                         = useState('');
    const [ total, setTotal ]                       = useState(0);

    const router = useRouter();

    const getCategories = async () => {

        const { data } = await axios('/api/categories');
        setCategories( data );

    };

    useEffect( () => {
        getCategories();
    }, []);

    // Categoría por defecto
    useEffect( () => {
        setCurrentCategory(categories[0]); // Café
    }, [ categories ]);

    useEffect( () => {
        const newTotal = order.reduce( ( total, product ) => ( product.price *  product.quantity ) + total, 0 );
        setTotal( newTotal );
    }, [ order ]);

    const handleClickCategory = ( categoryID ) => {
        // Obtiene categoría sobre la que se dio click mediante el menú lateral
        const category = categories.filter( cat => cat.id === categoryID );
        setCurrentCategory( category[0] );

        router.push('/');
    }

    const handleSetProduct = ( product ) => {
        setProduct( product );
    }

    const handleChangeModal = () => {
        setModal(!modal);
    }

    // Quita categoryId del objeto y se toma una copia de producto y crea un objeto nuevo
    const handleAddToOrder = ( { categoryId, ...product } ) => {

        // Evitar productos duplicados
        if ( order.some( prod => prod.id === product.id ) ) {
            // Si producto existe actualiza la cantidad
            const updatedOrder = order.map( prod => prod.id === product.id ? product : prod );
            
            setOrder( updatedOrder );

            toast.success('Pedido actualizado', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
            });


        }else {
            // Si producto no existe agrega el producto al objeto
            setOrder([...order, product]);
            
            toast.success('Producto añadido al pedido', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
            });
        }

        // Cerrar modal
        setModal(false);
       
    }

    const handleEditQuantities = ( productID ) => {
        const updatedProduct = order.filter( prod => prod.id === productID);
        setProduct(updatedProduct[0]);

        setModal(!modal);
    }

    const handleDeleteProduct = ( productID ) => {
        const updatedOrder = order.filter( prod => prod.id !== productID);
        setOrder(updatedOrder);
    }

    const handleFinishOrder = async ( e ) => {
        e.preventDefault();
        
        try {
            
            // Envia datos a api para almacenarnueva orden en BD
            await axios.post('/api/orders', {
                order, 
                name, 
                total,
                date: Date.now().toString()
            });


            // Restablece valores una vez creada una orden
            setCurrentCategory(categories[0]); // Restable la categoría actual a café
            setOrder([]);
            setName('');
            setTotal(0);

            // Mensaje de confirmación
            toast.success('Pedido realizado con éxito', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
            });

            // Redirige al usuario a página de inicio
            setTimeout(() => {
                router.push('/');
            }, 3000);

        } catch ( error ) {
            console.log( error );
        }
      }


    return (
        <CoffeShopContext.Provider
            value={{
                categories,
                currentCategory,
                handleClickCategory,
                product,
                handleSetProduct,
                modal,
                handleChangeModal,
                handleAddToOrder,
                order,
                handleEditQuantities,
                handleDeleteProduct,
                name,
                setName,
                handleFinishOrder,
                total
            }}>

            { children }
        </CoffeShopContext.Provider>
    )
}

export {
    CoffeShopProvider
}

export default CoffeShopContext;