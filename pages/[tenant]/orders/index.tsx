import { DefaultHeader } from '@/components/DefaultHeader';
import { useAppContext } from '@/context/app/hook';
import { useApi } from '@/libs/useApi';
import { useFormatter } from '@/utils/useFormatter';
import { Tenant } from '@/types/Tenant';
import { User } from '@/types/User';
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Order } from '@/types/Order';
import { OrderItem } from '@/components/order/OrderItem';

const MyOrderes = (data: Props) => {
    const { setTenant } = useAppContext();
    const formatter = useFormatter();
    const router = useRouter();
    const api = useApi(data.tenant.slug);

    useEffect(() => {
        setTenant(data.tenant);
    }, []);

    const statusList = {
        preparing: {
            stage: 'Preparando',
            backgroundColor: '#FEFAE6',
            fontColor: '#D4BC34',
        },
        sent: {
            stage: 'Enviado',
            backgroundColor: '#F1F3F8',
            fontColor: '#758CBD',
        },
        delivered: {
            stage: 'Entregue',
            backgroundColor: '#F1F8F6',
            fontColor: '#6AB70A',
        },
    };

    return (
        <div className="">
            <Head>
                <title>Meus Pedidos | {data.tenant.name}</title>
            </Head>
            <div className="mt-16">
                <DefaultHeader
                    backHref={`/${data.tenant.slug}/`}
                    mainColor={data.tenant.mainColor}
                    title="Meus Pedidos"
                />
            </div>
            <div
                className="border-t-2 mb-10 mt-6 mx-6"
                style={{ borderColor: data.tenant.secondColor }}
            ></div>
            <div className="mx-6">
                {data.orders.map((item, index) => (
                    <div className="mb-6">
                        <OrderItem
                            order={item}
                            mainColor={data.tenant.mainColor}
                            stage={statusList[item.status].stage}
                            stageBg={statusList[item.status].backgroundColor}
                            stageFontColor={statusList[item.status].fontColor}
                            onClick={() => {}}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrderes;

type Props = {
    tenant: Tenant;
    token: string;
    user: User;
    orders: Order[];
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
    if (!token) {
        return { redirect: { destination: `/${tenantSlug}/login`, permanent: false } };
    }

    const orders = await api.getOrders('');

    return {
        props: {
            tenant,
            token,
            user,
            orders,
        },
    };
};
