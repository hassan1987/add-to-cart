import { Product } from "./product";

export interface ProductState {
    productItems: Product[];
}

export const initialState = { productItems: [] };