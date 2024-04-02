import { useContext } from 'react';
import { Tenant } from '@/types/Tenant';
import { AppContext } from './AppContext';
import { Address } from '@/types/Address';

export const useAppContext = () => {
    const { state, dispatch } = useContext(AppContext);

    return {
        ...state,
        setTenant: (tenant: Tenant) => {
            dispatch({
                type: 'setTenantAction',
                payload: { tenant },
            });
        },
        setAddress: (address: Address) => {
            dispatch({
                type: 'setAddressAction',
                payload: { address },
            });
        },
        setShippingAddress: (shippingAddress: number) => {
            dispatch({
                type: 'setShippingAddressAction',
                payload: { shippingAddress },
            });
        },
    };
};
