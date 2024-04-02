import { Tenant } from '@/types/Tenant';
import { User } from '@/types/User';

type setUserAction = {
    type: 'setUserAction';
    payload: {
        user: User | null;
    };
};
type setTokenAction = {
    type: 'setTokenAction';
    payload: {
        token: string;
    };
};

export type AuthActionsType = setUserAction | setTokenAction;

export type AuthDataType = {
    token: string;
    user: User | null;
};

export const AuthReducer = (state: AuthDataType, actions: AuthActionsType) => {
    switch (actions.type) {
        case 'setUserAction':
            return { ...state, user: actions.payload.user };
        case 'setTokenAction':
            if (!actions.payload.token) return { ...state, token: '', user: null };
            return { ...state, token: actions.payload.token };
        default:
            return state;
    }
};
