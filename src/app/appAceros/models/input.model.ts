import { Product } from "./product.model";

export class Input {
    constructor(
        public id?: string,
        public product?: Product,
        public amount?: number,
        public date?: Date
    ) {}
}
