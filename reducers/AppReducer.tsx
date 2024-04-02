import { Address } from '@/types/Address';
import { Tenant } from '@/types/Tenant';

type setTenantAction = {
    type: 'setTenantAction';
    payload: {
        tenant: Tenant | null;
    };
};
type setAddressAction = {
    type: 'setAddressAction';
    payload: {
        address: Address | null;
    };
};
type setShippingAddressAction = {
    type: 'setShippingAddressAction';
    payload: {
        shippingAddress: number;
    };
};

export type ActionsType = setTenantAction | setAddressAction | setShippingAddressAction;

export type AppDataType = {
    tenant: Tenant | null;
    address: Address | null;
    shippingAddress: number;
};

export const AppReducer = (state: AppDataType, actions: ActionsType) => {
    switch (actions.type) {
        case 'setTenantAction':
            return { ...state, tenant: actions.payload.tenant };
        case 'setAddressAction':
            return { ...state, address: actions.payload.address };
        case 'setShippingAddressAction':
            return { ...state, shippingAddress: actions.payload.shippingAddress };
        default:
            return state;
    }
};
