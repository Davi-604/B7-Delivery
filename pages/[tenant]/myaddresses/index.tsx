import { DefaultButton } from '@/components/DefaultButton';
import { DefaultHeader } from '@/components/DefaultHeader';
import { useAppContext } from '@/context/app/hook';
import { useApi } from '@/libs/useApi';
import { Tenant } from '@/types/Tenant';
import { User } from '@/types/User';
import { getCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Address } from '@/types/Address';
import { AddressItem } from '@/components/address/AddressItem';

const MyAddresses = (data: Props) => {
    const { setTenant, setAddress, setShippingAddress } = useAppContext();

    const router = useRouter();
    const api = useApi(data.tenant.slug);

    const [menuOpened, setMenuOpened] = useState(2);

    useEffect(() => {
        setTenant(data.tenant);
        setMenuOpened(0);
    }, []);

    useEffect(() => {
        window.removeEventListener('click', handleMenuEvent);
        window.addEventListener('click', handleMenuEvent);

        return () => window.removeEventListener('click', handleMenuEvent);
    }, [menuOpened]);

    const handleSelectAddress = async (address: Address) => {
        const shipping = await api.getShippingPrice(address);
        if (shipping) {
            setAddress(address);
            setShippingAddress(shipping);
            router.push(`/${data.tenant.slug}/checkout`);
        }
    };
    const handleEditAddress = (id: number) => {
        router.push(`/${data.tenant.slug}/address/${id}`);
    };
    const handleDeleteAddress = async (id: number) => {
        const req = await api.deleteUserAddress(id);
        if (req) {
            router.reload();
        } else {
            alert('Não foi possivel deletar este endereço');
        }
    };

    const handleMenuEvent = (event: MouseEvent) => {
        const tagName = (event.target as Element).tagName;

        if (!['svg', 'path'].includes(tagName)) {
            setMenuOpened(0);
        }
    };

    return (
        <div className="">
            <Head>
                <title>Meus endereços | {data.tenant.name}</title>
            </Head>

            <div className="mt-16">
                <DefaultHeader
                    backHref={`/${data.tenant.slug}/checkout`}
                    mainColor={data.tenant.mainColor}
                    title="Meus endereços"
                />
                <div className="flex flex-col min-h-[90vh] mx-6 ">
                    <div
                        className="flex-1 border-t-2 pt-8 mt-6"
                        style={{ borderBottomColor: data.tenant.secondColor }}
                    >
                        {data.addresses.map((item, index) => (
                            <AddressItem
                                address={item}
                                mainColor={data.tenant.mainColor}
                                secondColor={data.tenant.secondColor}
                                onSelect={handleSelectAddress}
                                onEdit={handleEditAddress}
                                onDelete={handleDeleteAddress}
                                menuOpened={menuOpened}
                                setMenuOpened={setMenuOpened}
                            />
                        ))}
                    </div>
                    <div className="mb-12">
                        <DefaultButton
                            label="Novo endereço"
                            mainColor={data.tenant.mainColor}
                            onClick={() =>
                                router.push(`/${data.tenant.slug}/address/new`)
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAddresses;

type Props = {
    tenant: Tenant;
    token: string;
    user: User;
    addresses: Address[];
};
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug, id } = context.query;
    const api = useApi(tenantSlug as string);

    const tenant = await api.getTenant();
    if (!tenant) {
        return { redirect: { destination: '/', permanent: false } };
    }

    const token = getCookie('token', context);
    const user = await api.authorizeToken(token as string);
    if (!user) {
        return { redirect: { destination: `/${tenant.slug}/login`, permanent: false } };
    }

    const addresses = await api.getUserAdresses('');

    return {
        props: {
            tenant,
            token,
            user,
            addresses,
        },
    };
};
