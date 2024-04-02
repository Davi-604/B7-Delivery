import { Address } from '@/types/Address';
import { BagCookie } from '@/types/BagCookie';
import { BagItem } from '@/types/BagItem';
import { Order } from '@/types/Order';
import { Product } from '@/types/Product';

const TEMPORARYoneProduct: Product = {
    id: 1,
    name: 'Texas Burger',
    description:
        '2 Blends de carne de 150g, Queijo Cheddar,Bacon Caramelizado, Salada, Molho da casa, Pão brioche artesanal. ',
    categoryName: 'Tradicional',
    price: 25.9,
    image: '/temp/burger.png',
};
const TEMPORARYoneOrder: Order = {
    id: 123,
    userId: '123',
    status: 'preparing',
    orderDate: '03/27/2024',
    products: [
        { product: { ...TEMPORARYoneProduct, id: 1 }, qt: 1 },
        { product: { ...TEMPORARYoneProduct, id: 2 }, qt: 2 },
        { product: { ...TEMPORARYoneProduct, id: 3 }, qt: 3 },
    ],
    address: {
        id: 1,
        cep: '12345678',
        city: 'São Paulo',
        neighborhood: 'Jardin das Flores',
        number: '100',
        state: 'SP',
        street: 'Rua das Flores',
    },
    shippingPrice: 9.14,
    paymentType: 'card',
    cupom: 'ABC',
    cupomDiscount: 14.3,
    subTotal: 204,
    total: 198.84,
};

type FinishOrder = {
    bag: BagItem[];
    address: Address | null;
    paymentForm: 'money' | 'card';
    paymentChange?: number;
    cupom?: string;
};

export const useApi = (tenant: string) => ({
    getTenant: async () => {
        switch (tenant) {
            case 'b7burger':
                return {
                    slug: 'b7burger',
                    name: 'B7Burger',
                    mainColor: '#FB9400',
                    secondColor: '#FFF9F2',
                };
                break;
            case 'b7pizza':
                return {
                    slug: 'b7pizza',
                    name: 'B7pizza',
                    mainColor: '#6AB70A',
                    secondColor: '#E0E0E0',
                };
                break;
            default:
                return false;
        }
    },

    getAllProducts: async () => {
        let products: Product[] = [];
        for (let q = 0; q < 10; q++) {
            products.push({
                ...TEMPORARYoneProduct,
                id: q + 1,
            });
        }
        return products;
    },
    getProduct: async (id: number) => {
        return { ...TEMPORARYoneProduct, id };
    },

    authorizeToken: async (token: string) => {
        if (!token) return false;

        return {
            name: 'Davi',
            email: 'Davimedeiroscv1001@gmail.com',
        };
    },

    getBagProducts: async (bagCookie: string) => {
        let bag: BagItem[] = [];
        if (!bagCookie) return bag;

        const bagJson: BagCookie[] = JSON.parse(bagCookie);
        for (let i in bagJson) {
            if (bagJson[i].id && bagJson[i].qt) {
                const product = {
                    ...TEMPORARYoneProduct,
                    id: bagJson[i].id,
                };
                bag.push({
                    qt: bagJson[i].qt,
                    product,
                });
            }
        }

        return bag;
    },

    getUserAdresses: async (email: string) => {
        let addresses: Address[] = [];

        for (let i = 0; i < 4; i++) {
            addresses.push({
                id: i + 1,
                cep: '12345678',
                city: 'São Paulo',
                neighborhood: 'Jardin das Flores',
                number: `${i + 1}00`,
                state: 'SP',
                street: 'Rua das Flores',
            });
        }

        return addresses;
    },
    getUserAddress: async (id: number) => {
        let address: Address = {
            id: 1,
            cep: '12345678',
            city: 'São Paulo',
            neighborhood: 'Jardin das Flores',
            number: `100`,
            state: 'SP',
            street: 'Rua das Flores',
        };

        return address;
    },
    addUserAddress: async (address: Address) => {
        return { ...address, id: 12 };
    },
    updateUserAddress: async (address: Address, id: number) => {
        return true;
    },
    deleteUserAddress: async (id: number) => {
        return true;
    },

    getShippingPrice: async (address: Address) => {
        return 10;
    },

    setOrder: async (orderInfo: FinishOrder) => {
        return TEMPORARYoneOrder;
    },
    getOrder: async (id: number) => {
        return TEMPORARYoneOrder;
    },
    getOrders: async (email: string) => {
        let orders = [];

        for (let i = 0; i < 5; i++) {
            orders.push(TEMPORARYoneOrder);
        }

        return orders;
    },
});
