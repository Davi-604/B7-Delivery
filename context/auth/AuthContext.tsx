import { AuthActionsType, AuthDataType, AuthReducer } from '@/reducers/AuthReducer';
import { Dispatch, ReactNode, createContext, useReducer } from 'react';

type AuthContextType = {
    state: AuthDataType;
    dispatch: Dispatch<AuthActionsType>;
};
const initialState: AuthDataType = {
    user: null,
    token: '',
};
export const AuthContext = createContext<AuthContextType>({
    state: initialState,
    dispatch: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
