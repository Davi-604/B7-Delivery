import { ActionsType, AppDataType, AppReducer } from '@/reducers/AppReducer';
import { Tenant } from '@/types/Tenant';
import { Dispatch, ReactNode, createContext, useContext, useReducer } from 'react';

type AppContextType = {
    state: AppDataType;
    dispatch: Dispatch<ActionsType>;
};
const initialState: AppDataType = {
    tenant: null,
    address: null,
    shippingAddress: 0,
};
export const AppContext = createContext<AppContextType>({
    state: initialState,
    dispatch: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
    );
};
