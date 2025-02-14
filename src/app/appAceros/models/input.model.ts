import { Product } from "./product.model";

export class Input {
    constructor(
        public product: Product,
        public amount: number,
        public date: Date
    ) {}
}
