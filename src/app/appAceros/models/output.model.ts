import { Product } from "./product.model";

export class Output {
    constructor(
        public product: Product,
        public amount: number,
        public date: Date
    ) {}
}
