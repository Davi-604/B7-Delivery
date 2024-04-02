import { useAuthContext } from '@/context/auth/hook';
import { DefaultButton } from '../DefaultButton';
import { MenuIcons } from './MenuIcons';
import { useRouter } from 'next/router';
import { useAppContext } from '@/context/app/hook';
import { Tenant } from '@/types/Tenant';

type Props = {
    tenant: Tenant;
    open: boolean;
    onClose: () => void;
};
export const MenuArea = ({ tenant, open, onClose }: Props) => {
    const { user, setToken } = useAuthContext();
    const router = useRouter();

    return (
        <div
            className="pt-20 fixed w-0 top-0 bottom-0 right-0 bg-white z-[9999] overflow-x-hidden
            transition-all ease-out"
            style={open ? { width: '100vw' } : { width: '0' }}
        >
            <div className="flex flex-col">
                <div className="flex justify-between">
                    {user && (
                        <div
                            style={{ borderColor: tenant.mainColor }}
                            className="flex flex-col border-b pb-12 ml-6 relative w-fit"
                        >
                            <h1 className="font-medium text-2xl mb-2 text-black/90">
                                {user.name}
                            </h1>
                            <p className="text-black/50">Último pedido á X semanas</p>
                        </div>
                    )}
                    {!user && (
                        <div
                            className="w-[234px] relative pb-12 ml-6 border-b"
                            style={{ borderColor: tenant.mainColor }}
                        >
                            <DefaultButton
                                label="Fazer Login"
                                mainColor={tenant.mainColor}
                                onClick={() => router.push(`/${tenant.slug}/login`)}
                            />
                        </div>
                    )}
                    <div
                        onClick={onClose}
                        className="w-6 h-6 mr-6 font-semibold text-2xl flex justify-center items-center"
                        style={{ color: tenant.mainColor }}
                    >
                        X
                    </div>
                </div>
                <div className="border-t border-gray-200 mx-6 mt-[-1.5px] mb-12"></div>

                <div className="px-6">
                    <div className="mb-12">
                        <MenuIcons
                            icon="menu"
                            label="Cardápio"
                            mainColor={tenant.mainColor}
                            onClick={() => router.reload()}
                        />
                    </div>
                    <div className="mb-12">
                        <MenuIcons
                            icon="bag"
                            label="Sacola"
                            mainColor={tenant.mainColor}
                            onClick={() => router.push(`/${tenant.slug}/bag`)}
                        />
                    </div>
                    <div className="mb-12">
                        <MenuIcons
                            icon="order"
                            label="Meus pedidos"
                            mainColor={tenant.mainColor}
                            onClick={() => router.push(`/${tenant.slug}/orders`)}
                        />
                    </div>

                    {user && (
                        <div className="mt-[100px] mb-12">
                            <MenuIcons
                                icon="exit"
                                label="Sair"
                                mainColor={tenant.mainColor}
                                onClick={() => {
                                    setToken(''), onClose();
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
