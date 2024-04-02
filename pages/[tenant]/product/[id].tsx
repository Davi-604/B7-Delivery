import { DefaultButton } from '@/components/DefaultButton';
import { DefaultHeader } from '@/components/DefaultHeader';
import { QuantityBtn } from '@/components/QuantityBtn';
import { useAppContext } from '@/context/app/hook';
import { useApi } from '@/libs/useApi';
import { useFormatter } from '@/utils/useFormatter';
import { BagCookie } from '@/types/BagCookie';
import { Product } from '@/types/Product';
import { Tenant } from '@/types/Tenant';
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Home = (data: Props) => {
    const { tenant, setTenant } = useAppContext();
    const formatter = useFormatter();
    const router = useRouter();

    const [qntCount, setQntCount] = useState(1);

    useEffect(() => {
        setTenant(data.tenant);
    }, []);

    const handleAddToBag = () => {
        let bag: BagCookie[] = [];

        if (hasCookie('bag')) {
            const cookie = getCookie('bag');
            const cookieJson: BagCookie[] = JSON.parse(cookie as string);

            for (let i in cookieJson) {
                if (cookieJson[i].id && cookieJson[i].qt) {
                    bag.push(cookieJson[i]);
                }
            }
        }

        const bagIndex = bag.findIndex((item) => item.id === data.product.id);
        if (bagIndex > -1) {
            bag[bagIndex].qt += qntCount;
        } else {
            bag.push({ id: data.product.id, qt: qntCount });
        }

        setCookie('bag', JSON.stringify(bag));

        router.push(`/${data.tenant.slug}/bag`);
    };

    return (
        <div className="">
            <Head>
                <title>
                    {data.product.name} | {data.tenant.name}
                </title>
            </Head>

            <div className="absolute top-16 left-6 right-6">
                <DefaultHeader
                    mainColor={data.tenant.mainColor}
                    backHref={`/${data.tenant.slug}`}
                    title="Produto"
                    invert
                />
            </div>
            <div
                className="h-[350px] bg-center"
                style={{
                    backgroundImage: 'url("/imgs/bg.png")',
                    backgroundColor: data.tenant.mainColor,
                }}
            ></div>

            <div className="flex justify-center items-center mt-[-220px]">
                <img className="h-[320px]" src={data.product.image} />
            </div>

            <div className="px-6 text-black/90">
                <div className="font-semibold ">{data.product.categoryName}</div>
                <div
                    className="border-b pb-6 relative w-fit text-[40px] font-semibold"
                    style={{ borderColor: data.tenant.mainColor }}
                >
                    {data.product.name}
                </div>
                <div className="border-t border-gray-200 mt-[-1.5px] mb-6"></div>

                <div className="mb-8 text-black/50 font-semibold">
                    {data.product.description}
                </div>

                <div className="font-semibold mb-4">Quantidade</div>
                <div className="flex items-center justify-between mb-12">
                    <div className="">
                        <QuantityBtn
                            mainColor={data.tenant.mainColor}
                            count={qntCount}
                            onUpdateCount={(newCount: number) => setQntCount(newCount)}
                            min={1}
                        />
                    </div>
                    <div
                        className="text-3xl font-semibold"
                        style={{ color: data.tenant.mainColor }}
                    >
                        {formatter.formatPrice(data.product.price)}
                    </div>
                </div>

                <div className="mb-10">
                    <DefaultButton
                        label="Adicionar à sacola"
                        mainColor={data.tenant.mainColor}
                        onClick={handleAddToBag}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;

type Props = {
    tenant: Tenant;
    product: Product;
};
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug, id } = context.query;
    const api = useApi(tenantSlug as string);

    const tenant = await api.getTenant();
    if (!tenant) {
        return { redirect: { destination: '/', permanent: false } };
    }

    const product = await api.getProduct(parseInt(id as string));

    return {
        props: {
            tenant,
            product,
        },
    };
};
