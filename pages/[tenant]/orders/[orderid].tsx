import { DefaultButton } from '@/components/DefaultButton';
import { DefaultHeader } from '@/components/DefaultHeader';
import { DefaultInput } from '@/components/DefaultInput';
import { BagProductItem } from '@/components/bag/BagProductItem';
import { useAppContext } from '@/context/app/hook';
import { useApi } from '@/libs/useApi';
import { useFormatter } from '@/utils/useFormatter';
import { BagItem } from '@/types/BagItem';
import { Tenant } from '@/types/Tenant';
import { User } from '@/types/User';
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CheckoutItem } from '@/components/checkout/CheckoutItem';
import { Address } from '@/types/Address';
import { Order } from '@/types/Order';

const OrderId = (data: Props) => {
    const { setTenant } = useAppContext();
    const formatter = useFormatter();
    const router = useRouter();
    const api = useApi(data.tenant.slug);

    useEffect(() => {
        setTenant(data.tenant);

        if (data.order.status !== 'delivered') {
            setTimeout(() => {
                router.reload();
            }, 60000);
        }
    }, []);

    const statusList = {
        preparing: {
            label: 'Preparando o seu pedido...',
            stage: 'Preparando',
            longLabel: 'Aguardando mudança de status...',
            backgroundColor: '#FEFAE6',
            fontColor: '#D4BC34',
            pct: 35,
        },
        sent: {
            label: 'Enviamos o seu pedido!',
            stage: 'Enviado',
            longLabel: 'Aguardando mudança de status...',
            backgroundColor: '#F1F3F8',
            fontColor: '#758CBD',
            pct: 75,
        },
        delivered: {
            label: '',
            stage: 'Entregue',
            longLabel: '',
            backgroundColor: '#F1F8F6',
            fontColor: '#6AB70A',
            pct: 0,
        },
    };

    return (
        <div className="">
            <Head>
                <title>
                    Pedido #{data.order.id} | {data.tenant.name}
                </title>
            </Head>
            <div className="mt-16">
                <DefaultHeader
                    backHref={`/${data.tenant.slug}/orders`}
                    mainColor={data.tenant.mainColor}
                    title={`Pedido #${data.order.id}`}
                />
            </div>
            <div
                className="border-t-2 mb-10 mt-6 mx-6"
                style={{ borderColor: data.tenant.secondColor }}
            ></div>
            {data.order.status !== 'delivered' && (
                <div
                    className="px-6 py-7 rounded-md mx-6"
                    style={{
                        backgroundColor: statusList[data.order.status].backgroundColor,
                        borderTopColor: '#000',
                    }}
                >
                    <div
                        className="font-semibold text-lg"
                        style={{ color: statusList[data.order.status].fontColor }}
                    >
                        {statusList[data.order.status].label}
                    </div>
                    <div className="w-full h-3 mt-4 mb-2 rounded-lg bg-black/10">
                        <div
                            className="h-3 rounded-lg"
                            style={{
                                width: `${statusList[data.order.status].pct}%`,
                                backgroundColor: statusList[data.order.status].fontColor,
                            }}
                        ></div>
                    </div>
                    <div
                        className="text-xs font-medium opacity-8c0"
                        style={{ color: statusList[data.order.status].fontColor }}
                    >
                        {statusList[data.order.status].longLabel}
                    </div>
                </div>
            )}
            <div className="flex items-center py-5 mt-6 mx-6 mb-[14px] border-y">
                <div
                    className="text-[13px] font-bold mr-4 p-2 rounded-md"
                    style={{
                        color: statusList[data.order.status].fontColor,
                        backgroundColor: statusList[data.order.status].backgroundColor,
                    }}
                >
                    {statusList[data.order.status].stage}
                </div>
                <div
                    className="text-black/90 font-medium flex-1"
                    style={{ borderColor: data.tenant.secondColor }}
                >
                    {data.order.products.length} ite
                    {data.order.products.length > 1 ? 'ns' : 'm'}
                </div>
                <div style={{ color: '#B3B3B3' }}>
                    {formatter.formatDate(data.order.orderDate)}
                </div>
            </div>
            {data.order.products.map((item, index) => (
                <BagProductItem
                    mainColor={data.tenant.mainColor}
                    secondColor={data.tenant.secondColor}
                    product={item.product}
                    onChange={() => {}}
                    quantity={item.qt}
                    noEdit
                />
            ))}
            <div className="">
                <div className="mt-6 mx-6">
                    <div className="font-medium text-black/90 text-lg mb-2">Endereço</div>
                    <div className="">
                        <CheckoutItem
                            mainColor={data.tenant.mainColor}
                            secondColor={data.tenant.secondColor}
                            label={`${data.order.address?.street} ${data.order.address?.number} - ${data.order.address?.neighborhood}`}
                            leftIcon="location"
                            onClick={() => {}}
                        />
                    </div>
                </div>
                <div className="mt-6 mx-6">
                    <div className="font-medium text-black/90 text-lg mb-2">
                        Tipo de pagamento
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="">
                            <CheckoutItem
                                mainColor={data.tenant.mainColor}
                                secondColor={data.tenant.secondColor}
                                label="Dinheiro"
                                leftIcon="money"
                                onClick={() => {}}
                                fill={data.order.paymentType === 'money' ?? false}
                            />
                        </div>
                        <div className="">
                            <CheckoutItem
                                mainColor={data.tenant.mainColor}
                                secondColor={data.tenant.secondColor}
                                label="Cartão"
                                leftIcon="card"
                                onClick={() => {}}
                                fill={data.order.paymentType === 'card' ?? false}
                            />
                        </div>
                    </div>
                </div>
                {data.order.paymentType === 'money' && (
                    <div className="mt-6 mx-6">
                        <div className="font-medium text-black/90 text-lg mb-2">
                            Troco para:
                        </div>
                        <div className="">
                            <DefaultInput
                                mainColor={data.tenant.mainColor}
                                placeholder="Com quanto dinheiro você vai pagar?"
                                type="text"
                                onChange={() => {}}
                                value={
                                    data.order.paymentChange
                                        ? data.order.paymentChange.toString()
                                        : ''
                                }
                            />
                        </div>
                    </div>
                )}
                <div className="mt-6 mb-10 mx-6">
                    <div className="font-medium text-black/90 text-lg mb-2">
                        Cupom de desconto
                    </div>
                    {data.order.cupom && (
                        <div className="">
                            <CheckoutItem
                                mainColor={data.tenant.mainColor}
                                secondColor={data.tenant.secondColor}
                                leftIcon="cupom"
                                label={data.order.cupom.toUpperCase()}
                                rightIcon="checked"
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col mt-6">
                <div className="px-8 my-12">
                    <div className="flex justify-between items-center mb-6">
                        <div className="font-medium">Subtotal</div>
                        <div className="font-semibold">
                            {data.order.subTotal > 0
                                ? formatter.formatPrice(data.order.subTotal)
                                : '--'}
                        </div>
                    </div>
                    {data.order.cupomDiscount && (
                        <div className="flex justify-between items-center mb-6">
                            <div className="font-medium">Cupom</div>
                            <div className="font-semibold">
                                {`- ${formatter.formatPrice(data.order.cupomDiscount)}`}
                            </div>
                        </div>
                    )}
                    <div className="flex justify-between items-center pb-6 mb-7 border-b-2 border-dashed border-[#96A3AB]">
                        <div className="font-medium">Frete</div>
                        <div className="font-semibold">
                            {data.order.shippingPrice > 0
                                ? formatter.formatPrice(data.order.shippingPrice)
                                : '--'}
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="font-medium">Total</div>
                        <div
                            className="font-semibold text-2xl"
                            style={{ color: data.tenant.mainColor }}
                        >
                            {formatter.formatPrice(data.order.total)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderId;

type Props = {
    tenant: Tenant;
    token: string;
    user: User;
    order: Order;
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

    const order = await api.getOrder(parseInt(id as string));

    return {
        props: {
            tenant,
            token,
            user,
            order,
        },
    };
};
