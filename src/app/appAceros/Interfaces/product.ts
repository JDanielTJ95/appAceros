interface InventoryStatus {
    label: string;
    value: string;
}
export interface Product {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: InventoryStatus;
    category?: string;
    image?: string;
    rating?: number;
}

export interface IProduct{
    id?: string,
    name?: string,
    price?: number,
    category?: string,
    stock?: number,
    totalPrice?: number,
    description?: string,
    available?: boolean,
    size?: string

}
