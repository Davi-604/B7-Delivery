import { DefaultButton } from '@/components/DefaultButton';
import { DefaultHeader } from '@/components/DefaultHeader';
import { DefaultInput } from '@/components/DefaultInput';
import { BagProductItem } from '@/components/bag/BagProductItem';
import { useAppContext } from '@/context/app/hook';
import { useApi } from '@/libs/useApi';
import { useFormatter } from '@/utils/useFormatter';
import { BagCookie } from '@/types/BagCookie';
import { BagItem } from '@/types/BagItem';
import { Tenant } from '@/types/Tenant';
import { User } from '@/types/User';
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NoResults from '@/public/svgs/noResults.svg';
import { string, z } from 'zod';
import { ErrorItem, getErrorsFromZod } from '@/utils/getErrorsFromZod';

const Bag = (data: Props) => {
    const { setTenant } = useAppContext();
    const formatter = useFormatter();
    const router = useRouter();

    const [bag, setBag] = useState<BagItem[]>(data.bag);
    const [shippingField, setShippingField] = useState('');
    const [shipping, setShipping] = useState(0);
    const [shippingTime, setShippingTime] = useState(0);
    const [shippingAddress, setShippingAddress] = useState('');
    const [subTotal, setSubTotal] = useState(0);
    const [showEmpty, setShowEmpty] = useState(false);
    const [errors, setErrors] = useState<ErrorItem[]>([]);

    useEffect(() => {
        setTenant(data.tenant);
    }, []);

    useEffect(() => {
        let sub = 0;

        for (let i in bag) {
            sub += bag[i].product.price * bag[i].qt;
        }

        if (bag.length === 0) {
            setShowEmpty(true);
        }

        setSubTotal(sub);
    }, [bag]);

    const handleSetShipping = (e: string) => {
        setShippingField(e);
        setShippingAddress('');
        setShipping(0);
        setShippingTime(0);
    };

    const shippingSchema = z.object({
        shippingField: string()
            .min(8, 'Preencha o campo de CEP corretamente')
            .max(8, 'Preencha o campo de CEP corretamente'),
    });

    const handleSetAddress = () => {
        const formData = shippingSchema.safeParse({ shippingField });
        if (!formData.success) return setErrors(getErrorsFromZod(formData.error));

        setErrors([]);
        setShipping(10);
        setShippingTime(10);
        setShippingAddress('Rua das Flores - Jardins da Serra - Campina Pequena');
    };

    const handleResumeBtn = () => {
        if (shipping === 0) return;

        router.push(`/${data.tenant.slug}/checkout`);
    };

    const handleSetQuanity = (newCount: number, id: number) => {
        const tempBag: BagItem[] = [...bag];
        const bagIndex = tempBag.findIndex((item) => item.product.id === id);
        if (newCount > 0) {
            tempBag[bagIndex].qt = newCount;
        } else {
            delete tempBag[bagIndex];
        }

        let newBag: BagItem[] = tempBag.filter((item) => item);
        setBag(newBag);

        let newBagCookie: BagCookie[] = [];
        for (let i in newBag) {
            newBagCookie.push({
                id: newBag[i].product.id,
                qt: newBag[i].qt,
            });
        }
        setCookie('bag', JSON.stringify(newBagCookie));
    };
    return (
        <div className="">
            <Head>
                <title>Sacola | {data.tenant.name}</title>
            </Head>
            <div className="mt-16">
                <DefaultHeader
                    backHref={`/${data.tenant.slug}`}
                    mainColor={data.tenant.mainColor}
                    title="Sacola"
                />
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
                    onChange={handleSetQuanity}
                    quantity={item.qt}
                />
            ))}

            {!showEmpty && (
                <div className="flex flex-col mt-8">
                    <div className="mx-6">
                        <div className="text-[#6A7D8B] font-medium mb-2">
                            Calcular frete e prazo
                        </div>
                        <div className="flex items-center">
                            <div
                                className="w-full"
                                style={errors.length > 0 ? { marginTop: '22px' } : {}}
                            >
                                <DefaultInput
                                    mainColor={data.tenant.mainColor}
                                    placeholder="Coloque o seu CEP"
                                    type="text"
                                    value={shippingField.replaceAll(/\D/g, '')}
                                    onChange={(e) => handleSetShipping(e)}
                                    errorMessage={
                                        errors.find(
                                            (item) => item.field === 'shippingField'
                                        )?.message
                                    }
                                />
                            </div>
                            <div className="ml-3">
                                <DefaultButton
                                    label="OK"
                                    mainColor={data.tenant.mainColor}
                                    onClick={handleSetAddress}
                                    fill
                                />
                            </div>
                        </div>
                    </div>
                    {shippingAddress.trim() !== '' && (
                        <div className="flex flex-col py-6 px-8 mb-4">
                            <div className="text-[10px] text-[#6A7D8B] font-medium">
                                {shippingAddress}
                            </div>
                            <div className="flex justify-between mt-4">
                                <div className="font-medium ">
                                    Receba em até {shippingTime} minutos
                                </div>
                                <div
                                    className="font-semibold"
                                    style={{ color: data.tenant.mainColor }}
                                >
                                    {shipping > 0
                                        ? formatter.formatPrice(shipping)
                                        : '--'}
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="px-8 my-12">
                        <div className="flex justify-between items-center mb-6">
                            <div className="font-medium">Subtotal</div>
                            <div className="font-semibold">
                                {subTotal > 0 ? formatter.formatPrice(subTotal) : '--'}
                            </div>
                        </div>
                        <div className="flex justify-between items-center pb-6 mb-7 border-b-2 border-dashed border-[#96A3AB]">
                            <div className="font-medium">Frete</div>
                            <div className="font-semibold">
                                {shipping > 0 ? formatter.formatPrice(shipping) : '--'}
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="font-medium">Total</div>
                            <div
                                className="font-semibold text-2xl"
                                style={{ color: data.tenant.mainColor }}
                            >
                                {formatter.formatPrice(subTotal + shipping)}
                            </div>
                        </div>
                        <div className="mt-10">
                            <DefaultButton
                                mainColor={data.tenant.mainColor}
                                label="Continuar"
                                onClick={handleResumeBtn}
                                disabled={!shipping}
                            />
                        </div>
                    </div>
                </div>
            )}
            {showEmpty && (
                <div className="flex flex-col items-center mt-12">
                    <NoResults color="#CDCDCD" width={235} />
                    <p className="text-2xl text-gray-400 font-medium mt-8 text-center">
                        Ops! Não há itens <br /> na sua sacola
                    </p>
                </div>
            )}
        </div>
    );
};

export default Bag;

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
