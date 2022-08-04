import { useContext } from "react";
import CoffeShopContext from "../context/CoffeShopProvider";

export function useCoffeShop () {
    return useContext( CoffeShopContext );
}