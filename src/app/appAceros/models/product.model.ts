import { Category } from "./category.model";

export class Product {
    constructor(
        public id?: string,
        public name?: string,
        public price?: number,
        public category?: Category,
        public stock?: number,
        public totalPrice?: number,
        public description?: string,
        public available?: boolean,
        public size?: string
    ) {}
}
