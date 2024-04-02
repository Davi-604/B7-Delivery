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

const Checkout = (data: Props) => {
    const { setTenant, address, shippingAddress } = useAppContext();
    const formatter = useFormatter();
    const router = useRouter();
    const api = useApi(data.tenant.slug);

    const [bag, setBag] = useState<BagItem[]>(data.bag);
    const [changeField, setChangeField] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [paymentForm, setPaymentForm] = useState<'money' | 'card'>('money');
    const [cupom, setCupom] = useState('');
    const [cupomField, setCupomField] = useState('');
    const [cupomDiscount, setCupomDiscount] = useState(0);

    useEffect(() => {
        setTenant(data.tenant);
        if (bag.length === 0) {
            router.push(`/${data.tenant.slug}`);
        }
    }, []);

    useEffect(() => {
        let sub = 0;

        for (let i in bag) {
            sub += bag[i].product.price * bag[i].qt;
        }

        setSubTotal(sub);
    }, [bag]);

    const handleVerifyCupom = () => {
        if (cupomField.trim() === '') return;

        setCupom(cupomField);
        setCupomDiscount(subTotal * 0.1);
    };

    const handleResumeBtn = async () => {
        const order = await api.setOrder({
            address: address,
            bag,
            paymentForm,
            cupom,
            paymentChange: changeField,
        });
        if (order) {
            router.push(`/${data.tenant.slug}/orders/${order.id}`);
        } else {
            alert('Ocorreu um erro, tente mais tarde');
        }
    };

    return (
        <div className="">
            <Head>
                <title>Checkout | {data.tenant.name}</title>
            </Head>

            <div className="mt-16">
                <DefaultHeader
                    backHref={`/${data.tenant.slug}/bag`}
                    mainColor={data.tenant.mainColor}
                    title="Checkout"
                />
            </div>
            <div className="">
                <div
                    className="pt-6 mt-6 mx-6 border-t-2"
                    style={{ borderColor: data.tenant.secondColor }}
                >
                    <div className="font-medium text-black/90 text-lg mb-2">Endereço</div>
                    <div className="">
                        <CheckoutItem
                            mainColor={data.tenant.mainColor}
                            secondColor={data.tenant.secondColor}
                            label={
                                shippingAddress
                                    ? `${address?.street} ${address?.number} - ${address?.neighborhood}`
                                    : 'Selecione o seu endereço'
                            }
                            leftIcon="location"
                            rightIcon="arrowRight"
                            onClick={() =>
                                router.push(`/${data.tenant.slug}/myaddresses`)
                            }
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
                                onClick={() => setPaymentForm('money')}
                                fill={paymentForm === 'money' ?? false}
                            />
                        </div>
                        <div className="">
                            <CheckoutItem
                                mainColor={data.tenant.mainColor}
                                secondColor={data.tenant.secondColor}
                                label="Cartão"
                                leftIcon="card"
                                onClick={() => setPaymentForm('card')}
                                fill={paymentForm === 'card' ?? false}
                            />
                        </div>
                    </div>
                </div>
                {paymentForm === 'money' && (
                    <div className="mt-6 mx-6">
                        <div className="font-medium text-black/90 text-lg mb-2">
                            Troco para:
                        </div>
                        <div className="">
                            <DefaultInput
                                mainColor={data.tenant.mainColor}
                                placeholder="Com quanto dinheiro você vai pagar?"
                                type="text"
                                onChange={(e) => setChangeField(parseInt(e))}
                                value={changeField ? changeField.toString() : ''}
                            />
                        </div>
                    </div>
                )}
                <div className="mt-6 mb-10 mx-6">
                    <div className="font-medium text-black/90 text-lg mb-2">
                        Cupom de desconto
                    </div>
                    {cupom && (
                        <div className="">
                            <CheckoutItem
                                mainColor={data.tenant.mainColor}
                                secondColor={data.tenant.secondColor}
                                leftIcon="cupom"
                                label={cupom.toUpperCase()}
                                rightIcon="checked"
                            />
                        </div>
                    )}
                    {!cupom && (
                        <div className="flex">
                            <DefaultInput
                                mainColor={data.tenant.mainColor}
                                placeholder="Digite o seu cupom"
                                type="text"
                                onChange={(e) => setCupomField(e)}
                                value={cupomField}
                            />
                            <div className="w-14 h-14 ml-3">
                                <DefaultButton
                                    label="OK"
                                    mainColor={data.tenant.mainColor}
                                    onClick={handleVerifyCupom}
                                    fill
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div
                className="text-black/90 font-medium py-5 mt-6 mx-6 mb-[14px] border-y"
                style={{ borderColor: data.tenant.secondColor }}
            >
                {bag.length} ite{bag.length > 1 ? 'ns' : 'm'}
            </div>

            {bag.map((item, index) => (
                <BagProductItem
                    mainColor={data.tenant.mainColor}
                    secondColor={data.tenant.secondColor}
                    product={item.product}
                    onChange={() => {}}
                    quantity={item.qt}
                    noEdit
                />
            ))}
            <div className="flex flex-col mt-8">
                <div className="px-8 my-12">
                    <div className="flex justify-between items-center mb-6">
                        <div className="font-medium">Subtotal</div>
                        <div className="font-semibold">
                            {subTotal > 0 ? formatter.formatPrice(subTotal) : '--'}
                        </div>
                    </div>
                    <div className="flex justify-between items-center mb-6">
                        <div className="font-medium">Cupom</div>
                        <div className="font-semibold">
                            {cupomDiscount > 0
                                ? `- ${formatter.formatPrice(cupomDiscount)}`
                                : '--'}
                        </div>
                    </div>
                    <div className="flex justify-between items-center pb-6 mb-7 border-b-2 border-dashed border-[#96A3AB]">
                        <div className="font-medium">Frete</div>
                        <div className="font-semibold">
                            {shippingAddress > 0
                                ? formatter.formatPrice(shippingAddress)
                                : '--'}
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="font-medium">Total</div>
                        <div
                            className="font-semibold text-2xl"
                            style={{ color: data.tenant.mainColor }}
                        >
                            {formatter.formatPrice(
                                subTotal - cupomDiscount + shippingAddress
                            )}
                        </div>
                    </div>
                    <div className="mt-10">
                        <DefaultButton
                            mainColor={data.tenant.mainColor}
                            label="Finalizar pedido"
                            onClick={handleResumeBtn}
                            disabled={!address}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

type Props = {
    tenant: Tenant;
    token: string;
    user: User;
    bag: BagItem[];
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

    const bagCookie = getCookie('bag', context);
    const bag = await api.getBagProducts(bagCookie as string);

    return {
        props: {
            tenant,
            token,
            user,
            bag,
        },
    };
};
