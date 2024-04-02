import { Address } from './Address';
import { BagItem } from './BagItem';

export type Order = {
    id: number;
    userId: string;
    status: 'preparing' | 'sent' | 'delivered';
    orderDate: string;
    products: BagItem[];
    address: Address;
    shippingPrice: number;
    paymentType: 'money' | 'card';
    paymentChange?: number;
    cupom?: string;
    cupomDiscount?: number;
    subTotal: number;
    total: number;
};
