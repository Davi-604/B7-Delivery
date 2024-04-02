import { useContext } from 'react';
import { Tenant } from '@/types/Tenant';
import { AuthContext } from './AuthContext';
import { User } from '@/types/User';
import { setCookie } from 'cookies-next';

export const useAuthContext = () => {
    const { state, dispatch } = useContext(AuthContext);

    return {
        ...state,
        setToken: (token: string) => {
            setCookie('token', token);
            dispatch({
                type: 'setTokenAction',
                payload: { token },
            });
        },
        setUser: (user: User | null) => {
            dispatch({
                type: 'setUserAction',
                payload: { user },
            });
        },
    };
};
