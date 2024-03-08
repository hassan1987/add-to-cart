import { Rate } from "./rate";

export interface Product {
    id: number;
    title: string
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rate;
}
